-- =============================================
-- GitHub 用户授权表
-- 用于存储用户绑定的 GitHub 账号信息和 Access Token
-- =============================================

CREATE TABLE IF NOT EXISTS `github_connection` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    `wallet_address` VARCHAR(64) NOT NULL COMMENT '用户钱包地址 (作为用户唯一标识)',
    `github_id` BIGINT NOT NULL COMMENT 'GitHub 用户ID',
    `github_username` VARCHAR(100) NOT NULL COMMENT 'GitHub 用户名',
    `github_avatar_url` VARCHAR(500) DEFAULT NULL COMMENT 'GitHub 头像URL',
    `access_token` VARCHAR(255) NOT NULL COMMENT 'GitHub OAuth Access Token',
    `token_type` VARCHAR(50) DEFAULT 'bearer' COMMENT 'Token 类型',
    `scope` VARCHAR(255) DEFAULT NULL COMMENT '授权范围',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    UNIQUE KEY `uk_wallet_address` (`wallet_address`),
    UNIQUE KEY `uk_github_id` (`github_id`),
    INDEX `idx_github_username` (`github_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='GitHub 授权连接表';
