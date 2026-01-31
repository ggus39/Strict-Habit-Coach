import React from 'react';
import { Icon } from '../components/Icon';


import { Page } from '../types';
import { useAccount, useReadContract, usePublicClient } from 'wagmi';
import { HABIT_ESCROW_ABI, HABIT_ESCROW_ADDRESS, STRICT_TOKEN_ABI, STRICT_TOKEN_ADDRESS, Challenge, ChallengeStatus } from '../contracts';
import { formatEther } from 'viem';
import { useState, useEffect } from 'react';

// 习惯图标映射
const getHabitIcon = (description: string) => {
  if (description.includes('阅读')) return { icon: 'menu_book', color: 'blue' };
  if (description.includes('跑步')) return { icon: 'directions_run', color: 'orange' };
  if (description.includes('编程')) return { icon: 'code', color: 'purple' };
  return { icon: 'trending_up', color: 'emerald' };
};

interface DashboardProps {
  setPage?: (page: Page) => void;
  onSelectChallenge?: (id: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setPage, onSelectChallenge }) => {
  const { address, isConnected } = useAccount();

  // 读取 STRICT 代币余额
  const { data: strictBalance } = useReadContract({
    address: STRICT_TOKEN_ADDRESS,
    abi: STRICT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  //读取挑战数量
  const { data: challengeCount, isLoading: loadingCount } = useReadContract({
    address: HABIT_ESCROW_ADDRESS,
    abi: HABIT_ESCROW_ABI,
    functionName: 'challengeCount',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    }
  });

  const [isLoadingChallenges, setIsLoadingChallenges] = useState(false);
  const [activeChallenges, setActiveChallenges] = useState<(Challenge & { id: number })[]>([]);
  const publicClient = usePublicClient();

  // 动态读取所有挑战
  useEffect(() => {
    const fetchAllChallenges = async () => {
      if (!address || !challengeCount || challengeCount === 0n || !publicClient) {
        setActiveChallenges([]);
        return;
      }

      setIsLoadingChallenges(true);
      const count = Number(challengeCount);
      const fetchedChallenges: (Challenge & { id: number })[] = [];

      for (let i = 0; i < count; i++) {
        try {
          const challengeData = await publicClient.readContract({
            address: HABIT_ESCROW_ADDRESS,
            abi: HABIT_ESCROW_ABI,
            functionName: 'getChallenge',
            args: [address, BigInt(i)],
          });
          if (challengeData) {
            fetchedChallenges.push({ ...(challengeData as unknown as Challenge), id: i });
          }
        } catch (e) {
          console.error(`获取挑战 ${i} 失败:`, e);
        }
      }

      // 过滤仅活跃挑战
      const active = fetchedChallenges.filter(c => c.status === ChallengeStatus.Active);
      setActiveChallenges(active);
      setIsLoadingChallenges(false);
    };

    fetchAllChallenges();
  }, [address, challengeCount, publicClient]);

  // 获取最新的挑战ID (保留原有逻辑作为备用，或者用于其他目的)
  const activeChallengeId = challengeCount ? Number(challengeCount) - 1 : undefined;

  const [githubStatus, setGithubStatus] = useState<{
    connected: boolean;
    username?: string;
    avatarUrl?: string;
  }>({ connected: false });
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);

  // 后端 API 基础路径
  const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8900') + '/agent';

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

  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set());

  // Reading Challenge State
  const [readingModalOpen, setReadingModalOpen] = useState(false);
  const [readingNote, setReadingNote] = useState('');
  const [currentReadingChallengeId, setCurrentReadingChallengeId] = useState<number | null>(null);
  const [isSubmittingReading, setIsSubmittingReading] = useState(false);

  const handleOpenReadingModal = (challengeId: number) => {
    setCurrentReadingChallengeId(challengeId);
    setReadingModalOpen(true);
    setReadingNote('');
  };

  const handleReadingSubmit = async () => {
    if (!readingNote.trim() || currentReadingChallengeId === null || !address) return;

    setIsSubmittingReading(true);
    try {
      const formData = new FormData();
      formData.append('walletAddress', address);
      formData.append('challengeId', currentReadingChallengeId.toString());
      formData.append('content', readingNote);

      const resp = await fetch(`${API_BASE}/reading/check`, {
        method: 'POST',
        body: formData
      });
      const data = await resp.json();

      if (data.success) {
        setCheckResult('审核通过: ' + data.message); // 添加前缀以便识别
        // 不要立即调用 check，否则会清空弹窗结果
      } else {
        setCheckResult('审核拒绝: ' + data.message); // 添加前缀
      }
    } catch (e) {
      console.error(e);
      setCheckResult('提交失败: 网络或服务器错误');
    } finally {
      setIsSubmittingReading(false);
    }
  };

  // 3. 检查今日打卡
  const handleCheckCommits = async (isAuto = false) => {
    if (!address || !githubStatus.connected) return;
    setIsChecking(true);
    setCheckResult(null);

    let succcesCount = 0;
    let txHashes: string[] = [];
    let clockedIn = false;
    const newCompleted = new Set<number>();

    try {
      if (activeChallenges.length === 0) {
        setCheckResult("当前无进行中的挑战");
      } else {
        // Iterate all active challenges
        for (const challenge of activeChallenges) {
          // 1. GitHub 挑战 (编程)
          if (challenge.habitDescription.includes('编程')) {
            let url = `${API_BASE}/github/check?walletAddress=${address}&challengeId=${challenge.id}`;
            const resp = await fetch(url);
            const data = await resp.json();
            if (data.clockedIn) {
              clockedIn = true;
              succcesCount++;
              newCompleted.add(challenge.id);
              if (data.txHash) txHashes.push(data.txHash);
            }
          }

          // 2. Strava 挑战 (跑步)
          if (challenge.habitDescription.includes('跑步')) {
            let url = `${API_BASE}/strava/check?walletAddress=${address}&challengeId=${challenge.id}`;
            const resp = await fetch(url);
            const data = await resp.json();
            if (data.clockedIn) {
              clockedIn = true;
              succcesCount++;
              newCompleted.add(challenge.id);
              if (data.txHash) txHashes.push(data.txHash);
            } else if (!data.success && data.message.includes('连接 Strava')) {
              // Prompt to connect
            }
          }

          // 3. 阅读挑战 (检查数据库)
          if (challenge.habitDescription.includes('阅读')) {
            let url = `${API_BASE}/reading/check?walletAddress=${address}&challengeId=${challenge.id}`;
            const resp = await fetch(url);
            const data = await resp.json();
            if (data.clockedIn) {
              clockedIn = true;
              succcesCount++;
              newCompleted.add(challenge.id);
            }
          }
        }

        // 更新完成状态 Set
        setCompletedChallenges(prev => {
          const next = new Set(prev);
          newCompleted.forEach(id => next.add(id));
          return next;
        });

        if (clockedIn) {
          let msg = `今日已打卡 ✅`;
          if (txHashes.length > 0) msg += `\n交易哈希: ${txHashes.join(', ')}`;
          setCheckResult(msg);
          if (!isAuto) alert(msg);
        } else if (succcesCount === 0) {
          // 检查是否至少有一个待打卡的 active challenge
          const needsCheck = activeChallenges.some(c => c.habitDescription.includes('编程') || c.habitDescription.includes('跑步'));
          if (needsCheck) {
            const msg = '今日尚未检测到有效提交或运动记录，请继续加油 ❌';
            setCheckResult(msg);
            if (!isAuto) alert(msg);
          }
        }
      }

    } catch (e) {
      setCheckResult('检查失败，请重试');
      console.error(e);
    } finally {
      setIsChecking(false);
    }
  };

  // Strava Status
  const [stravaConnected, setStravaConnected] = useState(false);

  // Check Strava Status
  useEffect(() => {
    if (address) {
      fetch(`${API_BASE}/strava/status?walletAddress=${address}`)
        .then(res => res.json())
        .then(data => setStravaConnected(data.connected))
        .catch(err => console.error(err));
    }
  }, [address]);

  // 处理 Strava 回调参数
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('strava') === 'connected') {
      setStravaConnected(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleConnectStrava = async () => {
    try {
      const res = await fetch(`${API_BASE}/strava/auth/url?walletAddress=${address}`);
      const data = await res.json();
      window.location.href = data.url;
    } catch (e) {
      alert('获取授权链接失败');
    }
  };

  useEffect(() => {
    if (githubStatus.connected && activeChallenges.length > 0) {
      // 简单防抖或只触发一次? 依赖项变化可能会触发多次，但 items 数量变化不频繁
      handleCheckCommits(true);
    }
  }, [githubStatus.connected, activeChallenges.length]);

  const navigate = (path: string) => {
    console.log('Navigate to:', path);
    // setPage(Page.CHALLENGE_DETAIL); 
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Reading Modal */}
      {/* Reading Modal */}
      {readingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => !isSubmittingReading && setReadingModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 w-full max-w-lg shadow-2xl ring-1 ring-white/50 animate-in zoom-in-95 duration-200 transform">

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-inner">
                <Icon name="psychology" className="text-indigo-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">提交阅读笔记</h3>
                <p className="text-slate-500 text-sm font-medium">Strict Coach 正在盯着你...</p>
              </div>
              <button
                onClick={() => setReadingModalOpen(false)}
                className="ml-auto text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Icon name="close" />
              </button>
            </div>

            {/* Input Area or Feedback Result */}
            {checkResult && readingModalOpen && !isSubmittingReading && (checkResult.includes('AI') || checkResult.includes('成功') || checkResult.includes('失败') || checkResult.includes('审核通过') || checkResult.includes('审核拒绝')) ? (
              <div className={`rounded-xl p-6 mb-6 ${checkResult.includes('成功') || checkResult.includes('✅') || checkResult.includes('审核通过') ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
                <div className="flex items-start gap-3">
                  <Icon
                    name={checkResult.includes('成功') || checkResult.includes('✅') || checkResult.includes('审核通过') ? "check_circle" : "error"}
                    className={`text-2xl mt-0.5 ${checkResult.includes('成功') || checkResult.includes('✅') || checkResult.includes('审核通过') ? 'text-emerald-500' : 'text-red-500'}`}
                  />
                  <div>
                    <h4 className={`font-bold mb-1 ${checkResult.includes('成功') || checkResult.includes('✅') || checkResult.includes('审核通过') ? 'text-emerald-800' : 'text-red-800'}`}>
                      {checkResult.includes('成功') || checkResult.includes('✅') || checkResult.includes('审核通过') ? '审核通过' : '审核拒绝'}
                    </h4>
                    <p className={`text-sm leading-relaxed ${checkResult.includes('成功') || checkResult.includes('✅') || checkResult.includes('审核通过') ? 'text-emerald-700' : 'text-red-700'}`}>
                      {checkResult.replace('打卡成功 ✅ ', '').replace('打卡失败: ', '').replace('审核通过: ', '').replace('审核拒绝: ', '')}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                  今日感悟
                </label>
                <div className="relative group">
                  <textarea
                    className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none transition-all placeholder:text-slate-400 text-slate-700 leading-relaxed font-medium group-hover:bg-white"
                    placeholder="写下你今天的阅读收获（至少10个字），AI 将会严格审核你的内容..."
                    value={readingNote}
                    onChange={e => setReadingNote(e.target.value)}
                    disabled={isSubmittingReading}
                  />
                  <div className="absolute bottom-3 right-3 text-xs font-bold text-slate-300 pointer-events-none">
                    {readingNote.length} 字
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-400 flex items-center gap-1.5 px-1">
                  <Icon name="info" className="text-indigo-400" />
                  <span>AI 会判断你的笔记是否敷衍，请认真对待。</span>
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              {!checkResult || !readingModalOpen || isSubmittingReading || (!checkResult.includes('AI') && !checkResult.includes('成功') && !checkResult.includes('失败') && !checkResult.includes('审核通过') && !checkResult.includes('审核拒绝')) ? (
                <>
                  <button
                    onClick={() => setReadingModalOpen(false)}
                    className="px-5 py-2.5 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all"
                    disabled={isSubmittingReading}
                  >
                    取消
                  </button>
                  <button
                    onClick={handleReadingSubmit}
                    disabled={!readingNote.trim() || isSubmittingReading}
                    className={`px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 ${isSubmittingReading ? 'cursor-wait' : ''}`}
                  >
                    {isSubmittingReading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Strict Coach 审阅中...</span>
                      </>
                    ) : (
                      <>
                        <span>提交审核</span>
                        <Icon name="send" className="text-sm" />
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setReadingModalOpen(false);
                    setReadingNote('');
                    setCheckResult(null);
                    handleCheckCommits(true); // 关闭弹窗时刷新状态
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all"
                >
                  我知道了
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mb-2">全局数据看板</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">查看所有习惯挑战的汇总表现与 Web3 资产状态。</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-100 px-4 py-2 rounded-full shadow-soft">
            <Icon name="circle" fill className="text-emerald-500 text-xs" />
            <span>GitHub <span className="font-bold text-slate-700">已同步</span></span>
          </div>
          {/* Strava Status Badge */}
          {activeChallenges.some(c => c.habitDescription.includes('跑步')) && (
            <div onClick={!stravaConnected ? handleConnectStrava : undefined} className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full shadow-soft border cursor-pointer transition-all ${stravaConnected ? 'bg-white border-slate-100 text-slate-500' : 'bg-orange-50 border-orange-100 text-orange-600 hover:bg-orange-100'}`}>
              <Icon name="directions_run" fill className={stravaConnected ? "text-emerald-500 text-xs" : "text-orange-500 text-xs"} />
              {stravaConnected ? (
                <span>Strava <span className="font-bold text-slate-700">已连接</span></span>
              ) : (
                <span className="font-bold">连接 Strava</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-slate-400">总质押金额</span>
            <div className="p-2 bg-sky-50 dark:bg-sky-900/20 rounded-lg text-primary">
              <Icon name="account_balance" className="text-xl" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {activeChallenges.length > 0
                ? parseFloat(formatEther(activeChallenges.reduce((acc, c) => acc + c.stakeAmount, 0n))).toFixed(4)
                : '0.00'}
            </span>
            <span className="text-lg font-bold text-slate-400 mb-1">KITE</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <Icon name="payments" className="text-sm" />
            <span>当前锁定中：{activeChallenges.length} 个挑战</span>
          </div>
        </div>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-slate-400">连续坚持天数</span>
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-500">
              <Icon name="local_fire_department" fill className="text-xl" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {activeChallenges.length > 0
                ? Math.max(...activeChallenges.map(c => Number(c.completedDays)))
                : 0}
            </span>
            <span className="text-lg font-bold text-slate-400 mb-1">天</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-400">
            <span>
              距离下个奖励等级还差 {activeChallenges.length > 0
                ? 7 - (Math.max(...activeChallenges.map(c => Number(c.completedDays))) % 7)
                : 7} 天
            </span>
          </div>
        </div>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-bold text-slate-400">累计获得 STRICT</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600">
              <Icon name="verified" fill className="text-xl" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {strictBalance ? parseFloat(formatEther(strictBalance as bigint)).toFixed(0) : '0'}
            </span>
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
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Icon name="task_alt" className="text-primary" />
                今日任务概览
              </h3>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Today's Habits</span>
            </div>
            <div className="space-y-6">
              {isLoadingChallenges ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-6 p-2 rounded-xl border border-transparent">
                      <div className="size-12 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-32 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                        <div className="h-3 w-20 bg-slate-50 dark:bg-slate-800/50 rounded animate-pulse" />
                      </div>
                      <div className="h-8 w-20 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : activeChallenges.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">暂无进行中的挑战</div>
              ) : (
                activeChallenges.map((challenge) => {
                  const habitInfo = getHabitIcon(challenge.habitDescription);
                  // 状态判定逻辑: 检查该挑战ID是否在完成列表里
                  const isClockedIn = completedChallenges.has(challenge.id);
                  const isReading = challenge.habitDescription.includes('阅读');

                  return (
                    <div
                      key={challenge.id}
                      onClick={() => onSelectChallenge?.(challenge.id)}
                      className="flex items-center gap-6 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors cursor-pointer group"
                    >
                      <div className={`size-12 rounded-xl bg-${habitInfo.color}-50 text-${habitInfo.color}-600 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                        <Icon name={habitInfo.icon} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-700 dark:text-slate-200 text-base">
                          {challenge.habitDescription.split(' - ')[0]}
                        </h4>
                      </div>
                      <div>
                        {isClockedIn ? (
                          <div className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-bold">
                            <Icon name="check_circle" className="text-lg" fill />
                            <span>已完成</span>
                          </div>
                        ) : isReading ? (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenReadingModal(challenge.id);
                            }}
                            className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold text-center cursor-pointer hover:bg-blue-100 transition-colors"
                          >
                            提交笔记
                          </div>
                        ) : (
                          <div className="px-4 py-1.5 bg-sky-50 text-sky-500 rounded-lg text-sm font-bold text-center">
                            进行中
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <Icon name="sync" className="text-primary" />
              数据源连接
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800/50 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-white dark:bg-slate-700 rounded-lg shadow-sm flex items-center justify-center text-slate-900 dark:text-white">
                    <Icon name="terminal" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">GitHub</p>
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

              {/* Strava Connection */}
              <div className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800/50 transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-white dark:bg-slate-700 rounded-lg shadow-sm flex items-center justify-center text-slate-900 dark:text-white">
                    <Icon name="directions_run" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Strava</p>
                    <p className={`text-[10px] font-bold ${stravaConnected ? 'text-emerald-500' : 'text-slate-400'}`}>
                      {stravaConnected ? '已连接' : '未连接'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={stravaConnected ? undefined : handleConnectStrava}
                  className={`text-xs font-bold ${stravaConnected ? 'text-slate-400' : 'text-primary'}`}
                >
                  {stravaConnected ? '已绑定' : '连接'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-sky-50/80 dark:bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-sky-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 bg-primary/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none group-hover:bg-primary/20 transition-colors"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Icon name="psychology" fill />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI 状态更新</h4>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest">AI Agent</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {githubStatus.connected
                  ? `你好 ${githubStatus.username}！我已经准备好监督你的代码库了。记得每天 Push 哦，否则你的质押金就有危险了！`
                  : "请先连接 GitHub 账号。Money is Justice —— 只有通过代码证明你的进步，才能获得奖励。"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;