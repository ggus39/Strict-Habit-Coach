package com.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.domain.entity.GitHubConnection;
import org.apache.ibatis.annotations.Mapper;

/**
 * GitHub 连接 Mapper
 */
@Mapper
public interface GitHubConnectionMapper extends BaseMapper<GitHubConnection> {
}
