package com.domain.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("strava_connection")
public class StravaConnection implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    private String walletAddress;

    private Long stravaAthleteId;

    private String accessToken;

    private String refreshToken;

    private LocalDateTime expiresAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
