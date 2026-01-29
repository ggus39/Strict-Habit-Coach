package com.controller;

import com.domain.entity.StravaConnection;
import com.service.StravaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/agent/strava")
@CrossOrigin(origins = "*")
public class StravaController {

    @Autowired
    private StravaService stravaService;

    @Value("${server.url:http://localhost:8080}")
    private String serverUrl;

    @GetMapping("/auth/url")
    public Map<String, String> getAuthUrl(@RequestParam String walletAddress) {
        // Callback URL 包含钱包地址状态或类似信息
        // 简单起见，将 walletAddress 作为 state 传递，或作为回调参数处理的一部分
        // 但 Strava 标准回调通常在应用设置中固定。
        // 我们将坚持使用固定的回调 /agent/strava/callback 并根据需要处理 state。
        // 或者更简单：前端调用此接口，获取 URL，用户点击，最终重定向回后端 /callback。
        // 我们将追加 walletAddress 作为 state。
        
        String callbackUrl = serverUrl + "/agent/strava/callback?wallet=" + walletAddress;
        // 理想情况下我们应该对此进行编码。
        
        String url = stravaService.getAuthUrl(serverUrl + "/agent/strava/callback");
        // 我们需要通过 state 参数传递钱包地址
        url += "&state=" + walletAddress;
        
        Map<String, String> res = new HashMap<>();
        res.put("url", url);
        return res;
    }

    @GetMapping("/callback")
    public RedirectView callback(@RequestParam String code, @RequestParam(required = false) String state) {
        if (state == null) {
            return new RedirectView("http://localhost:3000?error=missing_wallet"); // 暂时硬编码前端地址
        }
        
        try {
            stravaService.handleCallback(state, code);
            // 重定向回前端
            return new RedirectView("http://localhost:3000/dashboard?strava=connected"); 
        } catch (Exception e) {
            e.printStackTrace();
            return new RedirectView("http://localhost:3000/dashboard?strava=error"); 
        }
    }

    @GetMapping("/status")
    public Map<String, Object> getStatus(@RequestParam String walletAddress) {
        StravaConnection conn = stravaService.getConnection(walletAddress);
        Map<String, Object> res = new HashMap<>();
        res.put("connected", conn != null);
        if (conn != null) {
            res.put("athleteId", conn.getStravaAthleteId()); // 隐私?
        }
        return res;
    }
}
