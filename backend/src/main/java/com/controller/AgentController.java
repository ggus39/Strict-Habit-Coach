package com.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.domain.DailyCheckIn;
import com.domain.entity.GitHubConnection;
import com.service.GitHubOAuthService;
import com.service.GitHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Agent 控制器
 * 负责 GitHub OAuth 授权和打卡检测
 */
@RestController
@RequestMapping("/agent")
@CrossOrigin(origins = "*")
public class AgentController {

    @Autowired
    private GitHubService gitHubService;

    @Autowired
    private GitHubOAuthService gitHubOAuthService;

    @Autowired
    private com.service.BlockchainService blockchainService;

    @Value("${frontend.url:http://localhost:3000}")
    private String frontendUrl;

    // ==================== GitHub OAuth 相关 ====================

    /**
     * 发起 GitHub 授权
     * 前端调用此接口，后端重定向到 GitHub 授权页面
     * @param walletAddress 用户钱包地址
     */
    @GetMapping("/github/auth")
    public void auth(@RequestParam String walletAddress, HttpServletResponse response) throws IOException {
        String authUrl = gitHubOAuthService.getAuthorizationUrl(walletAddress);
        response.sendRedirect(authUrl);
    }

    /**
     * GitHub OAuth 回调
     * GitHub 授权成功后回调此接口
     * @param code 授权码
     * @param state 钱包地址 (之前传入的 state)
     */
    @GetMapping("/github/callback")
    public void callback(@RequestParam String code, 
                         @RequestParam String state,
                         HttpServletResponse response) throws IOException {
        String walletAddress = state;
        
        // 1. 用 code 换 token
        Map<String, Object> tokenResponse = gitHubOAuthService.exchangeCodeForToken(code);
        String accessToken = (String) tokenResponse.get("access_token");
        String tokenType = (String) tokenResponse.get("token_type");
        String scope = (String) tokenResponse.get("scope");

        // 2. 获取 GitHub 用户信息
        Map<String, Object> githubUser = gitHubOAuthService.getGitHubUser(accessToken);

        // 3. 保存到数据库
        gitHubOAuthService.saveOrUpdateConnection(walletAddress, accessToken, tokenType, scope, githubUser);

        // 4. 重定向回前端 (带上成功标记)
        String redirectUrl = frontendUrl + "/dashboard?github_connected=true&github_user=" + githubUser.get("login");
        response.sendRedirect(redirectUrl);
    }

    /**
     * 获取用户的 GitHub 绑定状态
     * @param walletAddress 钱包地址
     * @return 绑定信息
     */
    @GetMapping("/github/status")
    public Map<String, Object> getStatus(@RequestParam String walletAddress) {
        Map<String, Object> result = new HashMap<>();
        
        GitHubConnection connection = gitHubOAuthService.getConnectionByWallet(walletAddress);
        if (connection != null) {
            result.put("connected", true);
            result.put("githubUsername", connection.getGithubUsername());
            result.put("githubAvatarUrl", connection.getGithubAvatarUrl());
        } else {
            result.put("connected", false);
        }
        
        return result;
    }

    // ==================== GitHub 打卡检测 ====================

    @Autowired
    private com.mapper.DailyCheckInMapper dailyCheckInMapper;

    /**
     * 检查用户今日 GitHub 打卡状态
     * @param walletAddress 用户钱包地址
     * @param challengeId   挑战ID (前端传入)
     * @return 打卡结果
     */
    @GetMapping("/github/check")
    public Map<String, Object> checkGitHub(
            @RequestParam String walletAddress,
            @RequestParam(required = false) Long challengeId) {
        
        Map<String, Object> result = new HashMap<>();
        
        // 1. 获取用户的 GitHub 连接
        GitHubConnection connection = gitHubOAuthService.getConnectionByWallet(walletAddress);
        if (connection == null) {
            result.put("success", false);
            result.put("message", "请先绑定 GitHub 账号");
            return result;
        }

        // 2. 检查今日提交
        String username = connection.getGithubUsername();
        String token = connection.getAccessToken();
        
        // 不再检查特定仓库，而是检查用户今日是否有 Push 事件
        boolean hasCommits = gitHubService.hasCommitsToday(username, token);
        
        if (hasCommits) {
            result.put("success", true);
            result.put("clockedIn", true);
            result.put("message", "今日已打卡 ✅");
            
            // 3. 如果从前端传入了 challengeId，则尝试记录上链
            if (challengeId != null) {
                // Check idempotency
                java.time.LocalDate today = java.time.LocalDate.now(java.time.ZoneId.of("Asia/Shanghai"));
                LambdaQueryWrapper<DailyCheckIn> query = new LambdaQueryWrapper<>();
                query.eq(DailyCheckIn::getWalletAddress, walletAddress)
                     .eq(DailyCheckIn::getChallengeId, challengeId)
                     .eq(DailyCheckIn::getCheckInDate, today);
                
                if (dailyCheckInMapper.exists(query)) {
                    result.put("message", "今日已打卡 ✅ (无需重复上链)");
                } else {
                    try {
                        String txHash = blockchainService.recordDayComplete(walletAddress, java.math.BigInteger.valueOf(challengeId));
                        
                        // Record success in DB
                        com.domain.DailyCheckIn checkIn = new com.domain.DailyCheckIn();
                        checkIn.setWalletAddress(walletAddress);
                        checkIn.setChallengeId(challengeId);
                        checkIn.setCheckInDate(today);
                        checkIn.setCreatedAt(java.time.LocalDateTime.now());
                        dailyCheckInMapper.insert(checkIn);

                        result.put("txHash", txHash);
                        result.put("message", "今日已打卡 ✅ (链上记录成功: " + txHash + ")");
                    } catch (Exception e) {
                        e.printStackTrace();
                        result.put("message", "今日已打卡 ✅ (但链上记录失败: " + e.getMessage() + ")");
                    }
                }
            }
        } else {
            result.put("success", true);
            result.put("clockedIn", false);
            result.put("message", "今日未打卡 ❌");
        }
        return result;
    }

    @Autowired
    private com.service.StravaService stravaService;

    /**
     * 检查用户 Strava 跑步打卡状态
     */
    @GetMapping("/strava/check")
    public Map<String, Object> checkStrava(
            @RequestParam String walletAddress,
            @RequestParam(required = false) Long challengeId) {
        
        Map<String, Object> result = new HashMap<>();
        
        // 1. 检查连接状态
        if (stravaService.getConnection(walletAddress) == null) {
             result.put("success", false);
             result.put("message", "请先连接 Strava");
             return result;
        }
        
        // 2. 检查跑步活动
        boolean hasRun = stravaService.checkRunningToday(walletAddress);
        
        if (hasRun) {
            result.put("success", true);
            result.put("clockedIn", true);
            result.put("message", "今日跑步已达标 ✅");
            
            // 3. 挑战打卡记录 (幂等性检查)
            if (challengeId != null) {
                java.time.LocalDate today = java.time.LocalDate.now(java.time.ZoneId.of("Asia/Shanghai"));
                LambdaQueryWrapper<DailyCheckIn> query = new LambdaQueryWrapper<>();
                query.eq(DailyCheckIn::getWalletAddress, walletAddress)
                     .eq(DailyCheckIn::getChallengeId, challengeId)
                     .eq(DailyCheckIn::getCheckInDate, today);

                if (dailyCheckInMapper.exists(query)) {
                    result.put("message", "今日跑步已达标 ✅ (无需重复上链)");
                } else {
                    try {
                        String txHash = blockchainService.recordDayComplete(walletAddress, java.math.BigInteger.valueOf(challengeId));
                         // 在数据库记录成功状态
                        DailyCheckIn checkIn = new DailyCheckIn();
                        checkIn.setWalletAddress(walletAddress);
                        checkIn.setChallengeId(challengeId);
                        checkIn.setCheckInDate(today);
                        checkIn.setCreatedAt(java.time.LocalDateTime.now());
                        dailyCheckInMapper.insert(checkIn);
                        
                        result.put("txHash", txHash);
                        result.put("message", "今日跑步已达标 ✅ (链上记录成功: " + txHash + ")");
                    } catch (Exception e) {
                        e.printStackTrace();
                        result.put("message", "今日跑步已达标 ✅ (但链上记录失败: " + e.getMessage() + ")");
                    }
                }
            }
        } else {
             result.put("success", true);
             result.put("clockedIn", false);
             result.put("message", "今日尚未检测到有效的跑步记录 ❌");
        }
        return result;
    }

    @Autowired
    private com.service.DeepSeekService deepSeekService;

    /**
     * 阅读打卡 (上传笔记)
     */
    @PostMapping("/reading/check")
    public Map<String, Object> checkReading(
            @RequestParam String walletAddress,
            @RequestParam Long challengeId,
            @RequestParam String content) {
        
        Map<String, Object> result = new HashMap<>();
        
        if (content == null || content.trim().isEmpty()) {
            result.put("success", false);
            result.put("message", "请填写阅读笔记");
            return result;
        }

        // 0. AI 审核
        com.service.DeepSeekService.ValidationResult validation = deepSeekService.validateReadingNote(content);
        if (!validation.pass) {
            result.put("success", false);
            result.put("message", "打卡失败: " + validation.reason);
            return result;
        }

        // 1. 幂等性检查
        java.time.LocalDate today = java.time.LocalDate.now(java.time.ZoneId.of("Asia/Shanghai"));
        LambdaQueryWrapper<DailyCheckIn> query = new LambdaQueryWrapper<>();
        query.eq(DailyCheckIn::getWalletAddress, walletAddress)
             .eq(DailyCheckIn::getChallengeId, challengeId)
             .eq(DailyCheckIn::getCheckInDate, today);

        if (dailyCheckInMapper.exists(query)) {
            result.put("success", true);
            result.put("clockedIn", true);
            result.put("message", "今日阅读任务已完成 ✅ (无需重复上链)");
            return result;
        }

        // 2. 记录上链
        try {
            String txHash = blockchainService.recordDayComplete(walletAddress, java.math.BigInteger.valueOf(challengeId));
            
            // 3. 记录数据库
            DailyCheckIn checkIn = new DailyCheckIn();
            checkIn.setWalletAddress(walletAddress);
            checkIn.setChallengeId(challengeId);
            checkIn.setCheckInDate(today);
            checkIn.setCreatedAt(java.time.LocalDateTime.now());
            checkIn.setProofContent(content); // 保存笔记
            dailyCheckInMapper.insert(checkIn);

            result.put("success", true);
            result.put("clockedIn", true);
            result.put("txHash", txHash);
            // 将 AI 的评语也返回给前端
            result.put("message", "打卡成功 ✅ " + validation.reason);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("success", false);
            result.put("message", "上链失败: " + e.getMessage());
        }
        
        return result;
    }
    /**
     * 检查阅读打卡状态 (用于前端查询是否已完成)
     */
    @GetMapping("/reading/check")
    public Map<String, Object> checkReadingStatus(
            @RequestParam String walletAddress,
            @RequestParam Long challengeId) {
        
        Map<String, Object> result = new HashMap<>();
        
        java.time.LocalDate today = java.time.LocalDate.now(java.time.ZoneId.of("Asia/Shanghai"));
        LambdaQueryWrapper<DailyCheckIn> query = new LambdaQueryWrapper<>();
        query.eq(DailyCheckIn::getWalletAddress, walletAddress)
             .eq(DailyCheckIn::getChallengeId, challengeId)
             .eq(DailyCheckIn::getCheckInDate, today);

        if (dailyCheckInMapper.exists(query)) {
            result.put("success", true);
            result.put("clockedIn", true);
            result.put("message", "今日阅读任务已完成 ✅");
        } else {
            result.put("success", true);
            result.put("clockedIn", false);
            result.put("message", "今日尚未打卡");
        }
        
        return result;
    }
}
