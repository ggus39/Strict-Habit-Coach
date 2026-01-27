import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <main className="w-full max-w-[1200px] mx-auto px-6 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">AI 习惯对赌仪表盘</h1>
          <p className="text-slate-400 mt-2 text-lg">欢迎回来，今日挑战进度良好，请保持自律。</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-100 px-4 py-2 rounded-full shadow-sm">
          <span className="material-symbols-outlined text-emerald-500 text-xs font-variation-fill" style={{fontVariationSettings: "'FILL' 1"}}>circle</span>
          <span>AI 实时监控中: <span className="font-bold text-slate-700">阅读挑战</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="md:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-surface-light p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-slate-400">质押总额</span>
                <div className="p-2 bg-sky-50 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-xl">account_balance</span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-slate-900">200.00</span>
                <span className="text-lg font-bold text-slate-400 mb-1">USDT</span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>预计收益 +1.38 USDT (APR 12%)</span>
              </div>
            </div>
            <div className="bg-surface-light p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-slate-400">当前连续</span>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <span className="material-symbols-outlined text-orange-500 text-xl" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-slate-900">12</span>
                <span className="text-lg font-bold text-slate-400 mb-1">天</span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-400">
                <span>击败了全球 85% 的挑战者</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-light p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">monitoring</span>
              今日目标进度
            </h3>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="relative flex items-center justify-center">
                <svg className="size-48" viewBox="0 0 100 100">
                  <circle className="text-slate-100 stroke-current" cx="50" cy="50" fill="transparent" r="40" strokeWidth="8"></circle>
                  <circle className="text-primary stroke-current progress-ring__circle" cx="50" cy="50" fill="transparent" r="40" strokeLinecap="round" strokeWidth="8" style={{strokeDasharray: 251.2, strokeDashoffset: 75.36}}></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-900">70%</span>
                  <span className="text-xs text-slate-400 font-bold">已完成</span>
                </div>
              </div>
              <div className="flex-1 w-full space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-slate-700">每日阅读时长</span>
                    <span className="text-slate-400 font-medium">21 / 30 分钟</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[70%] rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-400 font-bold mb-1">AI 判定状态</p>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                      <span className="material-symbols-outlined text-base" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                      有效进行中
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-400 font-bold mb-1">今日预警</p>
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                      <span className="material-symbols-outlined text-base">info</span>
                      无异常
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-light rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-pink-500">history</span>
                惩罚/执行历史
              </h3>
              <span className="text-xs font-bold text-slate-300">最后更新: 10分钟前</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold">
                  <tr>
                    <th className="px-6 py-4">挑战日期</th>
                    <th className="px-6 py-4">状态</th>
                    <th className="px-6 py-4">罚金去向</th>
                    <th className="px-6 py-4 text-right">结果</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-50">
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-600">2023-10-24</td>
                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs font-bold">成功</span></td>
                    <td className="px-6 py-4 text-slate-400">-</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-500">+0.12 USDT</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-600">2023-10-20</td>
                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-pink-50 text-pink-600 rounded text-xs font-bold">失败</span></td>
                    <td className="px-6 py-4 text-slate-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">volunteer_activism</span>
                      捐赠慈善
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-pink-500">-5.00 USDT</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-600">2023-10-19</td>
                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-xs font-bold">成功</span></td>
                    <td className="px-6 py-4 text-slate-400">-</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-500">+0.12 USDT</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-light p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">sync</span>
              同步数据源
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">smartphone</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Apple Books</p>
                    <p className="text-[10px] text-emerald-500 font-bold">已连接</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-slate-400 hover:text-primary">设置</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined">rss_feed</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Goodreads</p>
                    <p className="text-[10px] text-slate-400 font-bold">未连接</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-primary">连接</button>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 border border-primary text-primary text-sm font-bold rounded-lg hover:bg-sky-50 transition-colors">
              同步最新数据
            </button>
          </div>
          <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">AI 教练建议</h4>
                <p className="text-[10px] text-primary font-bold">实时分析</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              “基于你过去两周的模式，晚间 21:00 是你的高效阅读期。今日还剩 9 分钟即可完成目标，建议现在开始，避免最后时刻的焦虑。”
            </p>
            <div className="p-3 bg-white/80 rounded-lg text-xs text-slate-400 italic text-center">
              “自律不是对自我的束缚，而是对未来的投资。”
            </div>
          </div>
          <div className="bg-surface-light p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500">gavel</span>
              对赌协议详情
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <span className="text-xs text-slate-400 font-bold">惩罚机制</span>
                <span className="text-xs font-bold text-slate-700">捐赠慈善 (100%)</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <span className="text-xs text-slate-400 font-bold">锁定期截止</span>
                <span className="text-xs font-bold text-slate-700">2023-11-14</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-bold">累计已获奖励</span>
                <span className="text-xs font-bold text-emerald-500">2.45 USDT</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 border border-primary text-primary text-sm font-bold rounded-lg hover:bg-sky-50 transition-colors">
              管理质押
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;