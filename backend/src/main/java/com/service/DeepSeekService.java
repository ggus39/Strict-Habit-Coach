package com.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DeepSeekService {

    // Hardcoded for now based on user input, normally in application.yaml
    private final String apiKey = "sk-eabd49b719f142fc8e9f297a94f56ec4";
    // Aliyun Bailian (Tongyi) OpenAI compatible endpoint
    private final String apiUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
    // https://dashscope.aliyuncs.com/compatible-mode/v1
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ValidationResult validateReadingNote(String content) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            Map<String, Object> body = new HashMap<>();
            body.put("model", "deepseek-v3");
            body.put("temperature", 0.7);
            
            // System prompt to enforce the persona and output format
            Map<String, String> systemMessage = new HashMap<>();
            systemMessage.put("role", "system");
            systemMessage.put("content", 
                "你是一个严格的习惯教练(Strict Habit Coach)。你的任务是审核用户的阅读笔记。\n" +
                "规则：\n" +
                "1. 如果内容是乱码、敷衍的单个词、或者完全与阅读无关，请判定为不通过。\n" +
                "2. 笔记必须包含具体的感悟或内容摘要，至少10个字。\n" +
                "3. 请以 JSON 格式返回结果，格式为：{\"pass\": true/false, \"reason\": \"简短的毒舌评语(中文)\"}。\n" +
                "4. 评语风格：严格、稍微带点讽刺但有建设性。如果通过，给予肯定但不要太温和。");

            Map<String, String> userMessage = new HashMap<>();
            userMessage.put("role", "user");
            userMessage.put("content", "用户的阅读笔记内容: " + content);

            body.put("messages", List.of(systemMessage, userMessage));
            // Ensure JSON response
            body.put("response_format", Map.of("type", "json_object"));

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
            
            if (response.getStatusCode().is2xxSuccessful()) {
                JsonNode root = objectMapper.readTree(response.getBody());
                String contentJson = root.path("choices").get(0).path("message").path("content").asText();
                
                // Clean up Markdown code blocks if present
                if (contentJson.startsWith("```json")) {
                    contentJson = contentJson.substring(7);
                } else if (contentJson.startsWith("```")) {
                    contentJson = contentJson.substring(3);
                }
                if (contentJson.endsWith("```")) {
                    contentJson = contentJson.substring(0, contentJson.length() - 3);
                }
                
                // Parse the inner JSON
                JsonNode resultNode = objectMapper.readTree(contentJson.trim());
                boolean pass = resultNode.path("pass").asBoolean();
                String reason = resultNode.path("reason").asText();
                
                return new ValidationResult(pass, reason);
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Fallback: if AI fails, let it pass to avoid blocking user, but mark as API error
            return new ValidationResult(true, "AI 暂时睡着了，这次先放过你。");
        }
        
        return new ValidationResult(false, "系统错误");
    }

    public static class ValidationResult {
        public boolean pass;
        public String reason;

        public ValidationResult(boolean pass, String reason) {
            this.pass = pass;
            this.reason = reason;
        }
    }
}
