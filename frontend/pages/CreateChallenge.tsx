import React, { useState } from 'react';
import { Page } from '../types';

interface CreateChallengeProps {
    setPage: (page: Page) => void;
}

const CreateChallenge: React.FC<CreateChallengeProps> = ({ setPage }) => {
  const [selectedHabit, setSelectedHabit] = useState('reading');
  const [stakeAmount, setStakeAmount] = useState(200);

  return (
    <div className="layout-container flex h-full grow flex-col">
      <div className="px-4 md:px-10 lg:px-20 xl:px-48 flex flex-1 justify-center py-12">
        <div className="layout-content-container flex flex-col w-full max-w-[1100px] flex-1">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Sidebar Steps */}
            <div className="hidden lg:flex flex-col w-64 shrink-0 pt-4">
              <div className="mb-12">
                <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight mb-2">开启新的习惯挑战</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">设定目标，质押资金，赢得自我</p>
              </div>
              <div className="flex flex-col gap-8 relative">
                <div className="flex items-center gap-4">
                  <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-md shadow-primary/20">1</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">习惯选择</span>
                    <span className="text-[11px] text-slate-400">选择你想养成的习惯</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="size-8 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center text-xs font-bold">2</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">目标设定</span>
                    <span className="text-[11px] text-slate-400">同步与频率</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 opacity-50">
                  <div className="size-8 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold">3</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-500">质押金额</span>
                    <span className="text-[11px] text-slate-400">承诺你的决心</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 opacity-50">
                  <div className="size-8 rounded-full bg-white border-2 border-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold">4</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-500">失败去向</span>
                    <span className="text-[11px] text-slate-400">如果未完成...</span>
                  </div>
                </div>
              </div>
              <div className="bg-sky-50 dark:bg-primary/5 rounded-xl p-5 mt-12 border border-sky-100 dark:border-primary/10">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">lightbulb</span>
                  <div>
                    <p className="text-xs font-bold text-primary mb-1">小贴士</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      研究表明，当有真金白银作为赌注时，习惯养成的成功率会提高 3 倍。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col gap-6">
              <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-soft border border-slate-100 dark:border-slate-800">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-8">选择你想养成的习惯</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div 
                    onClick={() => setSelectedHabit('reading')}
                    className={`group cursor-pointer rounded-2xl p-6 transition-all border-2 relative ${selectedHabit === 'reading' ? 'bg-slate-50/50 border-primary card-selected-icon' : 'bg-slate-50/50 border-transparent hover:border-slate-200'}`}
                  >
                    <div className="mb-4 aspect-square w-full overflow-hidden rounded-xl bg-blue-100/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-blue-500">menu_book</span>
                    </div>
                    <h4 className="mb-1 text-base font-bold text-slate-900">阅读</h4>
                    <p className="text-xs text-slate-500">每日 30 分钟阅读</p>
                  </div>
                  <div 
                    onClick={() => setSelectedHabit('running')}
                    className={`group cursor-pointer rounded-2xl p-6 transition-all border-2 relative ${selectedHabit === 'running' ? 'bg-slate-50/50 border-primary card-selected-icon' : 'bg-slate-50/50 border-transparent hover:border-slate-200'}`}
                  >
                    <div className="mb-4 aspect-square w-full overflow-hidden rounded-xl bg-orange-100/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-orange-500">directions_run</span>
                    </div>
                    <h4 className="mb-1 text-base font-bold text-slate-900">跑步</h4>
                    <p className="text-xs text-slate-500">每日 5 公里挑战</p>
                  </div>
                  <div 
                    onClick={() => setSelectedHabit('coding')}
                    className={`group cursor-pointer rounded-2xl p-6 transition-all border-2 relative ${selectedHabit === 'coding' ? 'bg-slate-50/50 border-primary card-selected-icon' : 'bg-slate-50/50 border-transparent hover:border-slate-200'}`}
                  >
                    <div className="mb-4 aspect-square w-full overflow-hidden rounded-xl bg-emerald-100/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-emerald-500">code</span>
                    </div>
                    <h4 className="mb-1 text-base font-bold text-slate-900">编程</h4>
                    <p className="text-xs text-slate-500">每日 1 次 Commit</p>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-soft border border-slate-100 dark:border-slate-800">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-8">设定你的目标与数据源</h3>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">每日目标 (页数)</label>
                    <div className="relative">
                      <input className="block w-full rounded-xl border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm" type="number" defaultValue="30" />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <span className="text-slate-400 text-sm">页</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">连接数据源验证</label>
                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-sm hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">menu_book</span> Kindle Cloud
                      </button>
                      <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-primary bg-sky-50 text-primary text-sm font-medium">
                        <span className="material-symbols-outlined text-lg">smartphone</span> Apple Books
                        <span className="material-symbols-outlined text-sm font-bold">check</span>
                      </button>
                      <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 text-slate-300 text-sm cursor-not-allowed">
                        <span className="material-symbols-outlined text-lg">rss_feed</span> Goodreads
                      </button>
                    </div>
                    <p className="mt-4 text-[11px] text-slate-400">我们将通过 API 自动验证您的每日进度，无需人工上传截图。</p>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-soft border border-slate-100 dark:border-slate-800">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-8">承诺金额 (Staking)</h3>
                <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl p-8">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-sm text-slate-500 font-medium">质押金额</span>
                    <div className="text-right">
                      <span className="text-3xl font-display font-black text-primary">{stakeAmount}</span>
                      <span className="text-base font-bold text-slate-900 ml-1">USDT</span>
                    </div>
                  </div>
                  <div className="mb-10">
                    <input 
                      className="w-full" 
                      max="500" 
                      min="50" 
                      step="10" 
                      type="range" 
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(Number(e.target.value))}
                    />
                    <div className="flex justify-between mt-3 text-[10px] font-medium text-slate-400">
                      <span>50 USDT</span>
                      <span>500 USDT</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">锁定期</span>
                      <span className="text-sm font-bold text-slate-900">21 天</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">预计收益 (APR 12%)</span>
                      <span className="text-sm font-bold text-emerald-500">+{((stakeAmount * 0.12 * 21) / 365).toFixed(2)} USDT</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-surface-dark rounded-2xl p-8 shadow-soft border border-slate-100 dark:border-slate-800 mb-4">
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-8">如果失败，资金去向?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="cursor-pointer group">
                    <input defaultChecked className="peer sr-only" name="penalty" type="radio" />
                    <div className="h-full rounded-2xl border-2 border-slate-100 bg-white p-5 transition-all peer-checked:border-primary peer-checked:bg-sky-50/30">
                      <div className="flex justify-between items-start mb-4">
                        <div className="size-9 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
                          <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                        </div>
                        <div className="text-primary opacity-0 peer-checked:opacity-100">
                          <span className="material-symbols-outlined text-xl font-variation-fill">check_circle</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-2">捐赠慈善</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">资金将自动捐赠给以太坊基金会或公共物品。</p>
                    </div>
                  </label>
                  <label className="cursor-pointer group">
                    <input className="peer sr-only" name="penalty" type="radio" />
                    <div className="h-full rounded-2xl border-2 border-slate-100 bg-white p-5 transition-all peer-checked:border-primary peer-checked:bg-sky-50/30">
                      <div className="flex justify-between items-start mb-4">
                        <div className="size-9 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                          <span className="material-symbols-outlined text-xl">local_fire_department</span>
                        </div>
                        <div className="text-primary opacity-0 peer-checked:opacity-100">
                          <span className="material-symbols-outlined text-xl font-variation-fill">check_circle</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-2">销毁 (Burn)</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">资金将被永久销毁，发送至黑洞地址。</p>
                    </div>
                  </label>
                  <label className="cursor-pointer group">
                    <input className="peer sr-only" name="penalty" type="radio" />
                    <div className="h-full rounded-2xl border-2 border-slate-100 bg-white p-5 transition-all peer-checked:border-primary peer-checked:bg-sky-50/30">
                      <div className="flex justify-between items-start mb-4">
                        <div className="size-9 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                          <span className="material-symbols-outlined text-xl">emoji_events</span>
                        </div>
                        <div className="text-primary opacity-0 peer-checked:opacity-100">
                          <span className="material-symbols-outlined text-xl font-variation-fill">check_circle</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mb-2">奖池分红</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">分给坚持到最后的其他挑战者。</p>
                    </div>
                  </label>
                </div>
              </section>

              <div className="bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-xl flex items-center justify-between gap-6 mb-12">
                <div className="flex flex-col pl-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">总计质押</span>
                  <span className="text-2xl font-black text-slate-900">{stakeAmount} USDT</span>
                </div>
                <button onClick={() => setPage(Page.CHALLENGE_LIST)} className="flex-1 bg-primary hover:bg-sky-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                  批准并开启挑战
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;