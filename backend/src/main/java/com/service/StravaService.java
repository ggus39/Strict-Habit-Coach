package com.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.domain.entity.StravaConnection;
import com.mapper.StravaConnectionMapper;
import javastrava.api.v3.auth.AuthorisationService;
import javastrava.api.v3.auth.impl.retrofit.AuthorisationServiceImpl;
import javastrava.api.v3.auth.model.Token;
import javastrava.api.v3.auth.model.TokenResponse;
import javastrava.api.v3.model.StravaActivity;
import javastrava.api.v3.model.StravaAthlete;
import javastrava.api.v3.service.Strava;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;

@Service
public class StravaService {

    @Value("${strava.client-id}")
    private Integer clientId;

    @Value("${strava.client-secret}")
    private String clientSecret;

    @Autowired
    private StravaConnectionMapper stravaConnectionMapper;

    @Autowired
    private com.fasterxml.jackson.databind.ObjectMapper objectMapper;

    /**
     * 使用授权码换取 Token 并保存连接信息
     */
    public void handleCallback(String walletAddress, String code) {
        // 使用 RestTemplate 手动调用 Strava API
        // 避免 javastrava-api 的配置问题
        org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
        
        org.springframework.util.MultiValueMap<String, String> map = new org.springframework.util.LinkedMultiValueMap<>();
        map.add("client_id", String.valueOf(clientId));
        map.add("client_secret", clientSecret);
        map.add("code", code);
        map.add("grant_type", "authorization_code");

        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED);

        org.springframework.http.HttpEntity<org.springframework.util.MultiValueMap<String, String>> request = new org.springframework.http.HttpEntity<>(map, headers);
        
        try {
            org.springframework.http.ResponseEntity<String> response = restTemplate.postForEntity("https://www.strava.com/oauth/token", request, String.class);
            
            if (response.getStatusCode() == org.springframework.http.HttpStatus.OK) {
                com.fasterxml.jackson.databind.JsonNode root = objectMapper.readTree(response.getBody());
                
                String accessToken = root.path("access_token").asText();
                String refreshToken = root.path("refresh_token").asText();
                long expiresAt = root.path("expires_at").asLong();
                long athleteId = root.path("athlete").path("id").asLong();

                StravaConnection connection = new StravaConnection();
                connection.setWalletAddress(walletAddress);
                connection.setStravaAthleteId(athleteId);
                connection.setAccessToken(accessToken);
                connection.setRefreshToken(refreshToken);
                // ExpiresAt 是秒数，转换为 LocalDateTime
                connection.setExpiresAt(java.time.Instant.ofEpochSecond(expiresAt).atZone(ZoneId.of("Asia/Shanghai")).toLocalDateTime());

                StravaConnection existing = stravaConnectionMapper.selectOne(
                        new LambdaQueryWrapper<StravaConnection>().eq(StravaConnection::getWalletAddress, walletAddress)
                );

                if (existing != null) {
                    connection.setId(existing.getId());
                    connection.setUpdatedAt(LocalDateTime.now());
                    stravaConnectionMapper.updateById(connection);
                } else {
                    connection.setCreatedAt(LocalDateTime.now());
                    connection.setUpdatedAt(LocalDateTime.now());
                    stravaConnectionMapper.insert(connection);
                }
            } else {
                throw new RuntimeException("Strava Auth failed: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to exchange token", e);
        }
    }

    public StravaConnection getConnection(String walletAddress) {
        return stravaConnectionMapper.selectOne(
                new LambdaQueryWrapper<StravaConnection>().eq(StravaConnection::getWalletAddress, walletAddress)
        );
    }

    /**
     * 检查用户今日是否跑步超过 5km (或任意距离)
     */
    public boolean checkRunningToday(String walletAddress) {
        StravaConnection connection = getConnection(walletAddress);
        if (connection == null) return false;

        String accessToken = connection.getAccessToken();

        // 使用 RestTemplate 手动调用 Strava API 获取活动
        org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setBearerAuth(accessToken);
        org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(headers);

        try {
            // 获取今日之后的活动 (epoch seconds)
            // Strava API: /athlete/activities?after={epoch}
            long startOfDayEpoch = java.time.LocalDate.now(ZoneId.of("Asia/Shanghai"))
                    .atStartOfDay(ZoneId.of("Asia/Shanghai"))
                    .toEpochSecond();

            String url = "https://www.strava.com/api/v3/athlete/activities?after=" + startOfDayEpoch;
            
            org.springframework.http.ResponseEntity<String> response = restTemplate.exchange(
                    url, 
                    org.springframework.http.HttpMethod.GET, 
                    entity, 
                    String.class
            );

            if (response.getStatusCode() == org.springframework.http.HttpStatus.OK) {
                com.fasterxml.jackson.databind.JsonNode activities = objectMapper.readTree(response.getBody());
                
                if (activities.isArray()) {
                    for (com.fasterxml.jackson.databind.JsonNode activity : activities) {
                        String type = activity.path("type").asText();
                        double distance = activity.path("distance").asDouble(); // 米

                        // 检查是否是跑步且距离 > 0
                        if ("Run".equalsIgnoreCase(type) && distance > 0) {
                            return true;
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log error but return false safe
            return false;
        }

        return false;
    }
    
    public String getAuthUrl(String redirectUrl) {
         // 手动构造 URL，因为库可能会检查旧的端点
         return "https://www.strava.com/oauth/authorize?client_id=" + clientId + 
                "&response_type=code" +
                "&redirect_uri=" + redirectUrl + 
                "&approval_prompt=force" + 
                "&scope=activity:read_all";
    }
}
