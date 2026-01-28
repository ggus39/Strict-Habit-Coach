package com.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * GitHub 授权连接实体
 * 用于存储用户绑定的 GitHub 账号信息
 */
@Data
@TableName("github_connection")
public class GitHubConnection {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    /**
     * 用户钱包地址 (作为用户唯一标识)
     */
    private String walletAddress;
    
    /**
     * GitHub 用户ID
     */
    private Long githubId;
    
    /**
     * GitHub 用户名
     */
    private String githubUsername;
    
    /**
     * GitHub 头像URL
     */
    private String githubAvatarUrl;
    
    /**
     * GitHub OAuth Access Token
     */
    private String accessToken;
    
    /**
     * Token 类型
     */
    private String tokenType;
    
    /**
     * 授权范围
     */
    private String scope;
    
    /**
     * 创建时间
     */
    private LocalDateTime createdAt;
    
    /**
     * 更新时间
     */
    private LocalDateTime updatedAt;
}
