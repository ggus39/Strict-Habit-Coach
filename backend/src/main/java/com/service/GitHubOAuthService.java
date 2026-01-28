package com.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.domain.entity.GitHubConnection;
import com.mapper.GitHubConnectionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * GitHub OAuth 服务
 * 处理 OAuth 授权流程和用户绑定
 */
@Service
public class GitHubOAuthService {

    @Value("${github.oauth.client-id:}")
    private String clientId;

    @Value("${github.oauth.client-secret:}")
    private String clientSecret;

    @Value("${github.oauth.redirect-uri:http://localhost:8900/agent/github/callback}")
    private String redirectUri;

    @Autowired
    private GitHubConnectionMapper gitHubConnectionMapper;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * 生成 GitHub 授权 URL
     * @param walletAddress 用户钱包地址 (作为 state 参数)
     * @return GitHub 授权页面 URL
     */
    public String getAuthorizationUrl(String walletAddress) {
        return "https://github.com/login/oauth/authorize" +
                "?client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&scope=read:user,repo" +
                "&state=" + walletAddress;
    }

    /**
     * 用授权码换取 Access Token
     * @param code GitHub 返回的授权码
     * @return Access Token 响应
     */
    public Map<String, Object> exchangeCodeForToken(String code) {
        String tokenUrl = "https://github.com/login/oauth/access_token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(java.util.List.of(MediaType.APPLICATION_JSON));

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("code", code);
        body.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

        return response.getBody();
    }

    /**
     * 获取 GitHub 用户信息
     * @param accessToken Access Token
     * @return 用户信息
     */
    public Map<String, Object> getGitHubUser(String accessToken) {
        String userUrl = "https://api.github.com/user";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setAccept(java.util.List.of(MediaType.APPLICATION_JSON));

        HttpEntity<Void> request = new HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(userUrl, HttpMethod.GET, request, Map.class);

        return response.getBody();
    }

    /**
     * 保存或更新 GitHub 连接
     * @param walletAddress 钱包地址
     * @param accessToken Access Token
     * @param tokenType Token 类型
     * @param scope 授权范围
     * @param githubUser GitHub 用户信息
     */
    public void saveOrUpdateConnection(String walletAddress, String accessToken, 
                                        String tokenType, String scope, Map<String, Object> githubUser) {
        // 查询是否已存在
        LambdaQueryWrapper<GitHubConnection> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(GitHubConnection::getWalletAddress, walletAddress);
        GitHubConnection existing = gitHubConnectionMapper.selectOne(wrapper);

        if (existing != null) {
            // 更新
            existing.setAccessToken(accessToken);
            existing.setTokenType(tokenType);
            existing.setScope(scope);
            existing.setGithubId(((Number) githubUser.get("id")).longValue());
            existing.setGithubUsername((String) githubUser.get("login"));
            existing.setGithubAvatarUrl((String) githubUser.get("avatar_url"));
            existing.setUpdatedAt(LocalDateTime.now());
            gitHubConnectionMapper.updateById(existing);
        } else {
            // 新增
            GitHubConnection connection = new GitHubConnection();
            connection.setWalletAddress(walletAddress);
            connection.setAccessToken(accessToken);
            connection.setTokenType(tokenType);
            connection.setScope(scope);
            connection.setGithubId(((Number) githubUser.get("id")).longValue());
            connection.setGithubUsername((String) githubUser.get("login"));
            connection.setGithubAvatarUrl((String) githubUser.get("avatar_url"));
            connection.setCreatedAt(LocalDateTime.now());
            connection.setUpdatedAt(LocalDateTime.now());
            gitHubConnectionMapper.insert(connection);
        }
    }

    /**
     * 根据钱包地址获取 GitHub 连接
     * @param walletAddress 钱包地址
     * @return GitHub 连接信息
     */
    public GitHubConnection getConnectionByWallet(String walletAddress) {
        LambdaQueryWrapper<GitHubConnection> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(GitHubConnection::getWalletAddress, walletAddress);
        return gitHubConnectionMapper.selectOne(wrapper);
    }
}
