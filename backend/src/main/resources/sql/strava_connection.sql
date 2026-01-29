CREATE TABLE IF NOT EXISTS `strava_connection` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `wallet_address` varchar(100) NOT NULL COMMENT '钱包地址',
  `strava_athlete_id` bigint NOT NULL COMMENT 'Strava运动员ID',
  `access_token` varchar(255) NOT NULL COMMENT '访问令牌',
  `refresh_token` varchar(255) NOT NULL COMMENT '刷新令牌',
  `expires_at` datetime NOT NULL COMMENT '过期时间',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_wallet` (`wallet_address`),
  UNIQUE KEY `uk_strava_id` (`strava_athlete_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Strava连接表';
