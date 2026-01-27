import React from 'react';
import { Page } from '../types';

interface ChallengeListProps {
  setPage: (page: Page) => void;
}

const ChallengeList: React.FC<ChallengeListProps> = ({ setPage }) => {
  return (
    <main className="max-w-7xl mx-auto w-full px-6 py-10 lg:px-10 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900 mb-2">我的挑战项目</h1>
          <p className="text-slate-500">追踪你的习惯进度，管理你的 Web3 资产质押</p>
        </div>
        <button onClick={() => setPage(Page.CREATE_CHALLENGE)} className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg shadow-primary/30 group">
          <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add</span>
          开启新挑战
        </button>
      </div>

      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <h3 className="text-lg font-bold text-slate-800">正在进行中 (3)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">menu_book</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">每日阅读</h4>
                  <p className="text-xs text-slate-400">目标: 30 页/天</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">进行中</div>
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500 font-medium">当前进度</span>
                  <span className="text-primary font-bold">12 / 21 天</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full shadow-[0_0_8px_rgba(19,182,236,0.3)]" style={{width: '57%'}}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">当前连击</p>
                  <p className="text-lg font-display font-black text-orange-500 flex items-center gap-1">
                    8 <span className="material-symbols-outlined text-sm">local_fire_department</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">质押金额</p>
                  <p className="text-lg font-display font-black text-slate-900">200 <span className="text-xs font-bold text-slate-400">USDT</span></p>
                </div>
              </div>
            </div>
            <button onClick={() => setPage(Page.CHALLENGE_DETAIL)} className="w-full mt-6 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 group">
              查看详情
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">directions_run</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">晨间跑步</h4>
                  <p className="text-xs text-slate-400">目标: 5 公里/天</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">进行中</div>
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500 font-medium">当前进度</span>
                  <span className="text-primary font-bold">5 / 30 天</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full shadow-[0_0_8px_rgba(19,182,236,0.3)]" style={{width: '16%'}}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">当前连击</p>
                  <p className="text-lg font-display font-black text-orange-500 flex items-center gap-1">
                    5 <span className="material-symbols-outlined text-sm">local_fire_department</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">质押金额</p>
                  <p className="text-lg font-display font-black text-slate-900">500 <span className="text-xs font-bold text-slate-400">USDT</span></p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 group">
              查看详情
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">code</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">开源贡献</h4>
                  <p className="text-xs text-slate-400">目标: 1 Commit/天</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">进行中</div>
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-500 font-medium">当前进度</span>
                  <span className="text-primary font-bold">18 / 21 天</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full shadow-[0_0_8px_rgba(19,182,236,0.3)]" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">当前连击</p>
                  <p className="text-lg font-display font-black text-orange-500 flex items-center gap-1">
                    12 <span className="material-symbols-outlined text-sm">local_fire_department</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">质押金额</p>
                  <p className="text-lg font-display font-black text-slate-900">150 <span className="text-xs font-bold text-slate-400">USDT</span></p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 group">
              查看详情
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">已完成的挑战</h3>
          <a className="text-sm font-medium text-primary hover:underline" href="#">查看全部</a>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[11px] uppercase tracking-wider font-bold text-slate-400">
              <tr>
                <th className="px-6 py-4">习惯名称</th>
                <th className="px-6 py-4">完成时间</th>
                <th className="px-6 py-4">最终成绩</th>
                <th className="px-6 py-4">质押返还</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">mindfulness</span>
                    </div>
                    <span className="text-sm font-bold text-slate-700">冥想 10 分钟</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">2023.11.24</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">100% 达成</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">100 USDT</span>
                    <span className="text-[10px] text-emerald-500 font-medium">+1.45 奖励</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary text-sm font-bold hover:text-sky-600 transition-colors">回顾</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">water_drop</span>
                    </div>
                    <span className="text-sm font-bold text-slate-700">多喝水</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">2023.10.15</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">85% 达成</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">50 USDT</span>
                    <span className="text-[10px] text-slate-400 font-medium">无奖励</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary text-sm font-bold hover:text-sky-600 transition-colors">回顾</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="fixed bottom-8 right-8 z-40">
        <button className="size-14 bg-white rounded-full shadow-2xl border border-slate-100 flex items-center justify-center text-primary hover:scale-110 transition-transform group relative">
          <span className="material-symbols-outlined text-2xl">smart_toy</span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <div className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] py-1 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            AI 教练正在线
          </div>
        </button>
      </div>
    </main>
  );
};

export default ChallengeList;