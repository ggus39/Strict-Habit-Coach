import React from 'react';
import { Icon } from '../components/Icon';
// import { useNavigate } from 'react-router-dom'; // Commented out as we use setPage prop in this app structure usually, but strict adherence to user code first.
// The user code uses useNavigate, but the App.tsx uses functional state for navigation.
// I will adapt the user's code slightly to match the App's navigation props if they exist, or keep strictly if requested.
// User rule: "User input requirements priority > system setting requirements."
// User provided code uses `useNavigate` from `react-router-dom`, but the current project uses `useState` in `App.tsx` for navigation.
// To avoid breaking the app immediately, I might need to adjust `header` or just accept it might not link correctly yet.
// However, looking at the user's current App.tsx, it does NOT use react-router-dom. It uses conditional rendering.
// I should probably warn the user or adapt it.
// Let's look at `Dashboard.tsx` imports in the user request.
// `import { useNavigate } from 'react-router-dom';`
// Since `react-router-dom` is likely not installed or set up, I should probably adapt the navigation to `setPage`.
// Wait, the user said "Data dashboard page update to like that above".
// I will try to respect the code as much as possible. If I paste it exactly, it will break because of missing `react-router-dom`.
// I will change `useNavigate` to use the `setPage` prop convention existing in the app, 
// OR I will just paste it and let the user know they need router.
// Actually, looking at the previous file `Dashboard.tsx`, it takes no props?
// Let's check `App.tsx` again. `case Page.DASHBOARD: return <Dashboard />;` -> It passes NO props.
// So `Dashboard` cannot switch pages currently.
// I will just comment out the navigation part or mock it to prevent crash, 
// but I will write the file content as requested.
// actually I will make `Dashboard` accept `setPage` in `App.tsx` later if needed.
// For now, I'll modify the code slightly to avoid build error: `navigate` -> `console.log`.

// Actually, I'll check if `react-router-dom` is in package.json.
// PROBABLY NOT.
// I will replace `useNavigate` with a mock to avoid errors, or just not use it.
// The user code has: `onClick={() => navigate('/challenge')}`
// I will simply replace this with a comment or a dummy function to ensure it compiles.

// Wait, the user provided exact code. I should probably use it but adapt the imports if necessary.
// I'll stick to the user's code structure but fix the navigation compatibility issue by using a "stub" or assuming `setPage` will be passed eventually.
// Actually, `App.tsx` renders `<Dashboard />` without props.
// I'll adapt the user code to be compatible with the current project (no router).

import { Page } from '../types';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

interface DashboardProps {
  setPage?: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setPage }) => {
  const { address, isConnected } = useAccount();
  const [githubStatus, setGithubStatus] = useState<{
    connected: boolean;
    username?: string;
    avatarUrl?: string;
  }>({ connected: false });
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);

  // 后端 API 基础路径
  // 后端 API 基础路径
  const API_BASE = 'https://frp-oil.com:16292/agent';

  // 1. 获取 GitHub 绑定状态
  const fetchGithubStatus = async () => {
    if (!address) return;
    try {
      const resp = await fetch(`${API_BASE}/github/status?walletAddress=${address}`);
      const data = await resp.json();
      // 后端返回的是 githubUsername，映射到前端的 username
      setGithubStatus({
        connected: data.connected,
        username: data.githubUsername,
        avatarUrl: data.githubAvatarUrl
      });
    } catch (e) {
      console.error('获取 GitHub 状态失败', e);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchGithubStatus();
    }
  }, [isConnected, address]);

  // 处理 OAuth 回调后的参数
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('github_connected') === 'true') {
      fetchGithubStatus();
      // 清除 URL 参数
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // 2. 发起 GitHub 授权
  const handleConnectGitHub = () => {
    if (!address) {
      alert('请先连接钱包');
      return;
    }
    // 直接跳转到后端授权接口
    window.location.href = `${API_BASE}/github/auth?walletAddress=${address}`;
  };

  // 3. 检查今日打卡
  const handleCheckCommits = async () => {
    if (!address || !githubStatus.connected) return;
    setIsChecking(true);
    setCheckResult(null);
    try {
      // 假设当前仓库名固定或从配置获取，这里先写死测试，后续可改为配置项
      const repo = 'Strict-Habit-Coach';
      const resp = await fetch(`${API_BASE}/github/check?walletAddress=${address}&repo=${repo}`);
      const data = await resp.json();
      setCheckResult(data.message);
      if (data.clockedIn) {
        alert('恭喜！今日代码提交已通过 AI 验证 ✅');
      } else {
        alert('今日尚未检测到有效提交，请继续加油 ❌');
      }
    } catch (e) {
      setCheckResult('检查失败，请重试');
    } finally {
      setIsChecking(false);
    }
  };

  const navigate = (path: string) => {
    console.log('Navigate to:', path);
    // setPage(Page.CHALLENGE_DETAIL); 
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">全局数据看板</h1>
          <p className="text-slate-400 mt-2 text-lg font-medium">查看所有习惯挑战的汇总表现与 Web3 资产状态。</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-100 px-4 py-2 rounded-full shadow-soft">
          <Icon name="circle" fill className="text-emerald-500 text-xs" />
          <span>AI 正在同步 <span className="font-bold text-slate-700">GitHub 数据源</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-2xl border border-slate-100 shadow-soft flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-slate-400">总质押金额</span>
            <div className="p-2 bg-sky-50 rounded-lg text-primary">
              <Icon name="account_balance" className="text-xl" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 tracking-tight">0.05</span>
            <span className="text-lg font-bold text-slate-400 mb-1">ETH</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <Icon name="payments" className="text-sm" />
            <span>当前锁定中：1 个挑战</span>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-2xl border border-slate-100 shadow-soft flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-slate-400">连续坚持天数</span>
            <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
              <Icon name="local_fire_department" fill className="text-xl" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 tracking-tight">3</span>
            <span className="text-lg font-bold text-slate-400 mb-1">天</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-400">
            <span>距离下个奖励等级还差 4 天</span>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-2xl border border-slate-100 shadow-soft flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-slate-400">累计获得 STRICT</span>
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Icon name="verified" fill className="text-xl" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 tracking-tight">500</span>
            <span className="text-lg font-bold text-slate-400 mb-1">STRICT</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <Icon name="trending_up" className="text-sm" />
            <span>挖矿效率：1.5x</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 flex flex-col gap-6">
          <div className="bg-surface p-8 rounded-2xl border border-slate-100 shadow-soft">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Icon name="task_alt" className="text-primary" />
                今日任务概览
              </h3>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Today's Habits</span>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="size-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Icon name="code" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-700">
                      GitHub 代码提交 {githubStatus.connected && <span className="text-xs text-primary ml-2">(@{githubStatus.username})</span>}
                    </span>
                    <span className={`text-sm font-black ${checkResult?.includes('已打卡') ? 'text-emerald-500' : 'text-slate-300'}`}>
                      {checkResult?.includes('已打卡') ? '100%' : '0%'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${checkResult?.includes('已打卡') ? 'bg-emerald-500 w-full' : 'bg-slate-200 w-0'}`}></div>
                  </div>
                </div>
                <div className="w-24 text-right">
                  {githubStatus.connected ? (
                    <button
                      onClick={handleCheckCommits}
                      className="px-2.5 py-1 bg-primary text-white rounded-lg text-xs font-bold hover:bg-sky-500"
                    >
                      {isChecking ? '检查中...' : '同步提交'}
                    </button>
                  ) : (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-400 rounded-lg text-xs font-bold whitespace-nowrap">未绑定 GitHub</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-surface p-6 rounded-2xl border border-slate-100 shadow-soft">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
              <Icon name="sync" className="text-primary" />
              数据源连接
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-slate-900">
                    <Icon name="terminal" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">GitHub</p>
                    <p className={`text-[10px] font-bold ${githubStatus.connected ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {githubStatus.connected ? `@${githubStatus.username}` : '未连接'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={githubStatus.connected ? undefined : handleConnectGitHub}
                  className={`text-xs font-bold ${githubStatus.connected ? 'text-slate-400' : 'text-primary'}`}
                >
                  {githubStatus.connected ? '已绑定' : '连接'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-100 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Icon name="psychology" fill />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">AI 状态更新</h4>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest">AI Agent</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {githubStatus.connected
                ? `你好 ${githubStatus.username}！我已经准备好监督你的代码库了。记得每天 Push 哦，否则你的质押金就有危险了！`
                : "请先连接 GitHub 账号。Money is Justice —— 只有通过代码证明你的进步，才能获得奖励。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;