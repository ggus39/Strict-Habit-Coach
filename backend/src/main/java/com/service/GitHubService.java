package com.service;

import org.kohsuke.github.GHCommit;
import org.kohsuke.github.GHRepository;
import org.kohsuke.github.GitHub;
import org.kohsuke.github.GitHubBuilder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

/**
 * GitHub 服务
 * 用于检查用户代码提交
 */
@Service
public class GitHubService {

    /**
     * 检查用户今日是否有提交
     * @param username GitHub 用户名
     * @param repoName 仓库名称
     * @param token GitHub Token
     * @return true 如果今日有提交
     */
    public boolean hasCommitsToday(String username, String repoName, String token) {
        try {
            GitHub github;
            if (token != null && !token.isEmpty()) {
                github = new GitHubBuilder().withOAuthToken(token).build();
            } else {
                github = new GitHubBuilder().build();
            }

            // 获取仓库
            GHRepository repo = github.getRepository(username + "/" + repoName);

            // 获取今日零点时间
            Date today = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());

            // 查询 Commit
            List<GHCommit> commits = repo.queryCommits()
                    .since(today)
                    .list()
                    .toList();

            return !commits.isEmpty();
        } catch (Exception e) {
            // 记录日志但不抛出异常
            System.err.println("检查 GitHub 提交失败: " + e.getMessage());
            return false;
        }
    }
}

