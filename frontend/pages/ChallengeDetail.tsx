import React from 'react';
import { Icon } from '../components/Icon';
import { Page } from '../types';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { HABIT_ESCROW_ABI, HABIT_ESCROW_ADDRESS, Challenge, ChallengeStatus } from '../contracts';
import { formatEther } from 'viem';

interface ChallengeDetailProps {
  setPage?: (page: Page) => void;
  challengeId?: number | null;
}

const ChallengeDetail: React.FC<ChallengeDetailProps> = ({ setPage, challengeId }) => {
  const { address } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  // Read Challenge Data
  const { data: challengeData, isLoading } = useReadContract({
    address: HABIT_ESCROW_ADDRESS,
    abi: HABIT_ESCROW_ABI,
    functionName: 'getChallenge',
    args: address && challengeId !== undefined && challengeId !== null ? [address, BigInt(challengeId)] : undefined,
    query: { enabled: !!address && challengeId !== undefined && challengeId !== null },
  });

  const challenge = challengeData as unknown as Challenge | undefined;

  if (!address || challengeId === undefined || challengeId === null) {
    return <div className="p-10 text-center">请先选择一个挑战</div>;
  }

  if (isLoading || !challenge) {
    return (
      <div className="max-w-[1200px] mx-auto p-10 flex justify-center">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculations
  const now = Math.floor(Date.now() / 1000);
  const startTime = Number(challenge.startTime);
  const daysPassed = Math.floor((now - startTime) / 86400); // 1 day = 86400s
  const targetDays = Number(challenge.targetDays);
  const completedDays = Number(challenge.completedDays);

  // Days Left (min 0)
  const daysLeft = Math.max(0, targetDays - daysPassed);

  // Progress %
  // For the gauge, let's use completed days vs target.
  const completionPercent = Math.min(100, (completedDays / targetDays) * 100);

  const isReading = challenge.habitDescription.includes('阅读');
  const isRunning = challenge.habitDescription.includes('跑步');
  const isCoding = challenge.habitDescription.includes('编程');

  const habitTypeColor = isReading ? 'blue' : isRunning ? 'orange' : isCoding ? 'purple' : 'emerald';
  const habitIcon = isReading ? 'menu_book' : isRunning ? 'directions_run' : isCoding ? 'code' : 'trending_up';

  // Calendar Log Generation
  const currentDayIndex = daysPassed + 1;

  return (
    <div className="animate-fade-in-up max-w-[1200px] mx-auto px-6 py-8">
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <div
          className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide cursor-pointer hover:text-slate-600 transition-colors"
        >
          <span onClick={() => setPage && setPage(Page.DASHBOARD)}>返回看板</span>
          <Icon name="chevron_right" className="text-base" />
          <span>挑战详情</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-${habitTypeColor}-50 text-${habitTypeColor}-600`}>
              <Icon name={habitIcon} />
            </div>
            {challenge.habitDescription}
          </h1>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-full text-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Icon name="share" className="text-lg" /> 分享进度
            </button>
            <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-full text-sm shadow-glow hover:bg-primary-dark transition-all flex items-center gap-2">
              <Icon name="sync" className="text-lg" /> 立即同步
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Circular Gauge Card */}
        <div className="lg:col-span-5 bg-surface rounded-2xl p-8 border border-slate-100 shadow-soft flex flex-col justify-between items-center relative overflow-hidden">
          <div className="relative size-64 flex items-center justify-center mt-4">
            {/* Background Circle */}
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                className="text-slate-100"
              />
              {/* Progress Circle */}
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 100}
                strokeDashoffset={2 * Math.PI * 100 * (1 - completionPercent / 100)}
                strokeLinecap="round"
                className={`text-${habitTypeColor}-500 transition-all duration-1000 ease-out`}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-6xl font-black text-slate-900 tracking-tighter">{daysLeft}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Days Left</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-50">
            <div className="text-center">
              <p className="text-xs text-slate-400 font-bold mb-1">总期限</p>
              <p className="text-lg font-black text-slate-900">{targetDays} 天</p>
            </div>
            <div className="text-center border-l border-slate-100">
              <p className="text-xs text-slate-400 font-bold mb-1">已打卡</p>
              <p className={`text-lg font-black text-${habitTypeColor}-500`}>{completedDays} 天</p>
            </div>
            <div className="text-center border-l border-slate-100">
              <p className="text-xs text-slate-400 font-bold mb-1">数据源</p>
              <p className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1">
                {isReading ? 'DeepSeek AI' : isRunning ? 'Strava' : 'GitHub'}
                <span className="block size-2 rounded-full bg-emerald-500"></span>
              </p>
            </div>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="lg:col-span-7 bg-surface rounded-2xl p-8 border border-slate-100 shadow-soft">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <Icon name="calendar_today" className="text-primary" /> 打卡日历
            </h3>
            <div className="flex gap-4 text-xs font-bold text-slate-400">
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500"></span> 已达标
              </div>
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-slate-200"></span> 待打卡 / 未达标
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-3 mb-2">
            {['一', '二', '三', '四', '五', '六', '日'].map((d, i) => (
              <div key={i} className="text-center text-xs font-bold text-slate-300 py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-3">
            {/* Simple visual rendering of days */}
            {Array.from({ length: targetDays }).map((_, i) => {
              const dayNum = i + 1;
              const isCompleted = dayNum <= completedDays;
              const isToday = dayNum === currentDayIndex;
              const isMissed = !isCompleted && dayNum < currentDayIndex;

              let bgClass = "bg-slate-50 text-slate-300";
              if (isCompleted) bgClass = "bg-emerald-50 text-emerald-600 border border-emerald-100";
              if (isMissed) bgClass = "bg-red-50 text-red-300 border border-red-50";
              if (isToday) bgClass = "bg-sky-50 text-primary border-2 border-dashed border-primary";

              return (
                <div key={dayNum} className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold ${bgClass} relative`}>
                  {dayNum}
                  {isToday && <span className="absolute -top-1 -right-1 size-2 bg-primary rounded-full"></span>}
                  {isCompleted && <Icon name="check" className="text-xs ml-0.5" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Staking & Rewards */}
          <div className="bg-surface rounded-2xl p-8 border border-slate-100 shadow-soft">
            <h3 className="text-lg font-bold text-amber-500 flex items-center gap-2 mb-6">
              <Icon name="payments" className="text-amber-500" /> 质押与奖励 (Staking & Rewards)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="text-xs font-bold text-slate-400 mb-2">已质押金额</p>
                <p className="text-3xl font-black text-slate-800">{formatEther(challenge.stakeAmount)} <span className="text-sm font-bold text-slate-400">KITE</span></p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6">
                <p className="text-xs font-bold text-emerald-600 mb-2">预估年化收益</p>
                <p className="text-3xl font-black text-emerald-500">12.5% <span className="text-sm font-bold text-emerald-600">APR</span></p>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border border-red-100 flex gap-4">
              <div className="text-red-500 pt-1">
                <h4 className="text-xl font-black uppercase leading-none">report</h4>
                <span className="text-[10px] font-bold tracking-widest block text-center mt-1">REPORT</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-500 mb-1">惩罚规则警示</h4>
                <p className="text-xs text-red-400 leading-relaxed font-medium">
                  若今日未能在 24:00 前同步数据，系统将自动扣除当日质押份额 (约 <span className="underline decoration-red-300 cursor-pointer">{Number(formatEther(challenge.stakeAmount)) / targetDays} KITE</span>) 作为惩罚并捐赠至 Web3 公共物品基金。
                </p>
              </div>
            </div>
          </div>

          {/* Protocol Detail */}
          <div className="bg-surface rounded-2xl p-8 border border-slate-100 shadow-soft">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-sky-500 flex items-center gap-2">
                <Icon name="gavel" className="text-sky-500" /> 承诺协议详情
              </h3>
              <span className="px-3 py-1 bg-sky-50 text-sky-500 rounded-full text-[10px] font-bold uppercase tracking-wide">Protocol Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-2">惩罚机制</p>
                <p className="text-xl font-black text-slate-800 mb-1">100% 捐赠</p>
                <p className="text-[10px] text-slate-400">违约金将转入 DAO 金库</p>
              </div>
              <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-2">开始时间</p>
                <p className="text-xl font-black text-slate-800 mb-1">{new Date(startTime * 1000).toLocaleDateString()}</p>
                <p className="text-[10px] text-slate-400">挑战正式生效日期</p>
              </div>
              <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 mb-2">累计已获奖励</p>
                <p className="text-xl font-black text-emerald-500 mb-1">{(Number(formatEther(challenge.stakeAmount)) * 0.1).toFixed(4)} <span className="text-xs text-slate-400">KITE</span></p>
                <p className="text-[10px] text-slate-400">包含节点激励与承诺收益</p>
              </div>
            </div>

            {completedDays >= targetDays ? (
              challenge.stakeAmount > 0n ? (
                <button
                  onClick={() => {
                    if (!address) return;
                    writeContract({
                      address: HABIT_ESCROW_ADDRESS,
                      abi: HABIT_ESCROW_ABI,
                      functionName: 'claimReward',
                      args: [BigInt(challengeId!)],
                      account: address,
                      chain: undefined
                    });
                  }}
                  disabled={isPending}
                  className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      领取中...
                    </>
                  ) : (
                    <>
                      <Icon name="emoji_events" className="text-xl" /> 领取挑战奖励
                    </>
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full mt-6 bg-slate-100 dark:bg-slate-800 text-slate-400 py-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed border border-slate-200 dark:border-slate-700"
                >
                  <Icon name="check_circle" className="text-xl" /> 奖励已领取
                </button>
              )
            ) : (
              <button className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                <Icon name="settings_suggest" className="text-xl" /> 管理质押
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-surface rounded-2xl border border-slate-100 shadow-soft h-full flex flex-col relative overflow-hidden">
            <div className="p-8 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="psychology" className="text-sky-400 text-xl" />
                <h3 className="text-lg font-bold text-slate-900">AI 习惯教练</h3>
              </div>
              <p className="text-xs text-slate-400">您的个性化习惯优化专家</p>
            </div>

            <div className="px-6 flex-1">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none p-6 relative mt-4">
                <svg className="absolute -top-2 left-0 w-4 h-4 text-slate-50 fill-current transform rotate-180" viewBox="0 0 20 20">
                  <path d="M0 0 L20 0 L20 20 Z" />
                </svg>
                <p className="text-sm text-slate-600 italic leading-relaxed font-medium">
                  {completedDays > 0 ?
                    `“不错！你已经坚持了 ${completedDays} 天。根据 DeepSeek 的分析，你的行为模式正在固化。继续保持，Web3 的奖励只属于坚持者。”` :
                    `“从第一天开始才是最难的。我已经准备好见证你的蜕变了，${address?.slice(0, 6)}...${address?.slice(-4)}。别让我失望。”`
                  }
                </p>
              </div>
            </div>

            <div className="p-6 mt-auto">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full bg-slate-200 border-2 border-white"></div>
                  <div className="size-8 rounded-full bg-slate-300 border-2 border-white"></div>
                  <div className="size-8 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">AI</div>
                </div>
                <button className="text-xs font-bold text-sky-500 flex items-center gap-1 hover:text-sky-600">
                  查看 AI 报告 <Icon name="trending_up" className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;