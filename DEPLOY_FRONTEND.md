# 🚀 前端部署指南 (Frontend Deployment)

本项目的 web 前端基于 **React + Vite** 构建，支持多种部署方式。推荐使用 **Vercel** 进行自动化部署，也支持传统的 Nginx/Apache 静态托管。

---

## 方式一：使用 Vercel 部署 (推荐) ⚡

Vercel 是 React/Vite 应用的最佳部署平台，支持自动化构建、HTTPS 和 CDN 加速。

### 1-A.使用 Vercel CLI (命令行)

如果你安装了 `vercel` 命令行工具：

1.  进入前端目录：
    ```bash
    cd frontend
    ```
2.  运行部署命令：
    ```bash
    npx vercel --prod
    ```
3.  按照提示操作：
    *   Set up and deploy? -> **Y**
    *   Which scope? -> (选择你的账号)
    *   Link to existing project? -> **N** (或是 Y 如果你已经创建了)
    *   Project name? -> `strict-habit-coach`
    *   In which directory is your code located? -> `./` (确认是在 frontend 目录下)
    *   Want to modify these settings? -> **N** (默认 Vite 配置即可)


