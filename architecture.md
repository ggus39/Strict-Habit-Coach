# 🏗️ Strict Habit Coach - 系统架构

## 架构总览

```mermaid
graph TB
    subgraph Frontend["🖥️ 前端层 (React + Vite)"]
        LP[LandingPage<br/>落地页]
        DB[Dashboard<br/>仪表盘]
        CL[ChallengeList<br/>挑战列表]
        CC[CreateChallenge<br/>创建挑战]
        CD[ChallengeDetail<br/>挑战详情]
        LP --> DB
        DB --> CL
        DB --> CC
        CL --> CD
    end

    subgraph SpringBoot["☕ 后端 API 层 (Spring Boot)"]
        API[REST Controller]
        SVC[Service 层]
        REPO[Repository]
        WEB3[Web3j 服务]
        AGENT[AI Agent 服务]
        API --> SVC
        SVC --> REPO
        SVC --> WEB3
        SVC --> AGENT
    end

    subgraph Database["🗄️ 数据库 (MySQL)"]
        MYSQL[(用户/挑战/记录)]
    end

    subgraph Blockchain["⛓️ 智能合约层 (Solidity)"]
        ESC[HabitEscrow.sol]
        TOKEN[StrictToken.sol]
    end

    subgraph External["🌐 外部服务"]
        GHAPI[GitHub REST API]
        OPENAI[OpenAI API]
        CHAIN["区块链网络<br/>(Kite AI / EVM)"]
    end

    Frontend <-->|钱包交互| Blockchain
    Frontend <-->|HTTP API| SpringBoot
    REPO --> Database
    AGENT -->|获取 Commit| GHAPI
    AGENT -->|AI 判定| OPENAI
    WEB3 -->|调用合约| CHAIN
    Blockchain <-->|交易广播| CHAIN
```

---

## 📊 数据流图

```mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端
    participant A as Agent 后端
    participant G as GitHub API
    participant L as LLM (GPT-4o)
    participant C as 智能合约

    Note over U,C: 🟢 创建挑战流程
    U->>F: 1. 创建挑战 + 选择惩罚去向
    F->>C: 2. deposit(amount, penaltyType)
    C-->>F: 3. 返回交易确认
    F-->>U: 4. 显示挑战已激活

    Note over U,C: 🔍 每日审计流程
    A->>G: 5. 定时拉取 Commit Diff
    G-->>A: 6. 返回代码变更
    A->>L: 7. 发送判定请求
    L-->>A: 8. 返回 PASS/FAIL

    Note over U,C: ❌ 失败惩罚流程
    alt AI 判定失败
        A->>C: 9. slash(userId)
        C-->>A: 10. 扣除质押
        A->>F: 11. 推送失败通知
    else AI 判定成功
        A->>F: 12. 推送成功通知
    end

    Note over U,C: 🏆 挑战完成流程
    U->>F: 13. 完成所有周期
    F->>C: 14. claimReward()
    C-->>F: 15. 返还 ETH + Mint StrictToken
```

---

## 🧩 模块职责

### 1. 前端层 (`/frontend`)
| 页面 | 职责 |
|------|------|
| `LandingPage.tsx` | 产品介绍、CTA 引导 |
| `Dashboard.tsx` | 用户数据总览、钱包连接 |
| `CreateChallenge.tsx` | 创建挑战、设置惩罚类型 |
| `ChallengeList.tsx` | 查看所有挑战 |
| `ChallengeDetail.tsx` | 单个挑战详情、进度、AI 评价 |

### 2. 后端 Agent 层 (`/agent`)
| 函数 | 职责 |
|------|------|
| `fetchGitHubData()` | 从 GitHub API 拉取用户的 Commit 和 Diff |
| `askLLM(data)` | 调用 GPT-4o 判定代码质量 |
| `executeSlash(user)` | 使用服务端钱包签名调用合约 `slash()` |
| `scheduleAudit()` | 定时任务触发器 (Cron) |

### 3. 智能合约层 (`/contracts`)

#### StrictToken.sol - ERC20 代币
| 属性/函数 | 说明 |
|----------|------|
| `TOTAL_SUPPLY` | 总供应量 1亿 STRICT |
| `constructor()` | 铸造全部代币给部署者 |

#### HabitEscrow.sol - 托管合约
| 函数 | 职责 |
|------|------|
| `createChallenge()` | 用户质押 ETH 创建挑战，选择惩罚去向 |
| `slash(user, challengeId)` | Agent 专属：执行惩罚 |
| `emergencyWithdraw()` | "认怂退出"，扣 30% 懦夫税 |
| `claimReward()` | 挑战成功后领取本金 + STRICT 奖励 |
| `useResurrection()` | 使用复活卡重置挑战进度 |
| `recordDayComplete()` | Agent 记录每日完成 |

---

## 🚀 开发建议：先合约还是先后端？

> [!IMPORTANT]
> **建议：先开发智能合约 → 再开发后端 Agent**

### 理由

```mermaid
graph LR
    A[智能合约] -->|提供 ABI| B[后端 Agent]
    B -->|调用合约| A
    B -->|API 接口| C[前端]
    C -->|直接调用| A
```

1. **合约是核心基础设施**
   - 后端需要 ABI 才能调用合约
   - 前端也需要合约地址和 ABI 进行钱包交互
   - 合约一旦部署，接口就固定了

2. **开发顺序**
   ```
   Step 1: 智能合约 (HabitEscrow.sol)
      ↓ 获得 ABI + 合约地址
   Step 2: 后端 Agent (route.ts)
      ↓ 提供 API 接口
   Step 3: 前端集成 (调用真实合约和 API)
   ```

3. **合约优先的好处**
   - 可以先用 Remix 或 Hardhat 测试合约逻辑
   - 后端开发时有明确的调用目标
   - 减少返工风险

---

## 📁 推荐目录结构

```
Strict-Habit-Coach/
├── contracts/                 # 智能合约
│   ├── HabitEscrow.sol        # 主合约
│   ├── StrictToken.sol        # ERC20 奖励代币
│   └── hardhat.config.js      # Hardhat 配置
│
├── agent/                     # 后端 Agent
│   ├── route.ts               # API 路由入口
│   ├── services/
│   │   ├── github.ts          # GitHub API 封装
│   │   ├── llm.ts             # LLM 调用封装
│   │   └── contract.ts        # 合约交互封装
│   ├── jobs/
│   │   └── audit.ts           # 定时审计任务
│   └── server.ts              # 服务器入口
│
├── frontend/                  # 前端 (已完成静态页面)
│   ├── pages/
│   ├── components/
│   └── ...
│
└── architecture.md            # 架构文档 (本文件)
```

---

## ✅ 下一步 Action Items

- [ ] **合约开发**：完成 `HabitEscrow.sol` 核心逻辑
- [ ] **合约测试**：使用 Hardhat 编写测试用例
- [ ] **合约部署**：部署到测试网 (Kite AI Testnet / Sepolia)
- [ ] **后端开发**：实现 Agent 的 GitHub 数据采集 + LLM 判定 + 合约调用
- [ ] **前端集成**：接入真实合约和 API
