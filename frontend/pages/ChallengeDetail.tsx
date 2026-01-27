import React from 'react';
import { Page } from '../types';

interface ChallengeDetailProps {
    setPage: (page: Page) => void;
}

const ChallengeDetail: React.FC<ChallengeDetailProps> = ({ setPage }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getDayStatusClass = (day: number) => {
    if (day <= 3) return 'bg-success/10 text-success';
    if (day === 4) return 'bg-success text-white shadow-md shadow-success/20';
    if (day <= 8) return 'bg-success/10 text-success';
    if (day === 9) return 'bg-success text-white shadow-md shadow-success/20';
    if (day === 10) return 'border-2 border-primary border-dashed text-primary font-black relative';
    return 'bg-slate-50 text-slate-300 font-medium';
  };

  return (
    <main className="flex-grow py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3 tracking-widest uppercase">
              <a onClick={() => setPage(Page.CHALLENGE_LIST)} className="hover:text-primary transition-colors cursor-pointer">挑战列表</a>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-slate-900 uppercase">30天沉浸式阅读挑战</span>
            </nav>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">30天沉浸式阅读挑战</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <span className="material-symbols-outlined text-lg">share</span>
              分享进度
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-sky-500 transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-lg">sync</span>
              立即同步
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-white rounded-[2rem] p-10 shadow-soft border border-slate-100/50 flex flex-col items-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="size-64 -rotate-90">
                  <circle className="text-slate-50" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="12"></circle>
                  <circle className="text-primary" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeDasharray="691" strokeDashoffset="207" strokeLinecap="round" strokeWidth="12"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-display font-black text-slate-900">21</span>
                  <span className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Days Left</span>
                </div>
              </div>
              <div className="w-full grid grid-cols-3 gap-4 mt-12">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">总期限</p>
                  <p className="text-lg font-display font-extrabold text-slate-900">30 天</p>
                </div>
                <div className="text-center border-x border-slate-100 px-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">当前连胜</p>
                  <p className="text-lg font-display font-extrabold text-success">7 天</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">数据同步</p>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="text-sm font-bold text-slate-900">Apple Books</span>
                    <div className="size-2 rounded-full bg-success"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-soft border border-slate-100/50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  打卡日历
                </h3>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <div className="calendar-dot bg-success"></div>
                    <span>已达标</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="calendar-dot bg-slate-100 border border-slate-200"></div>
                    <span>待打卡</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-3">
                {['一', '二', '三', '四', '五', '六', '日'].map((day) => (
                  <div key={day} className="text-center text-[11px] font-bold text-slate-300 py-2 uppercase">{day}</div>
                ))}
                {days.slice(0, 21).map((day) => (
                    <div key={day} className={`aspect-square flex items-center justify-center rounded-2xl font-display text-sm ${getDayStatusClass(day)}`}>
                        {day}
                        {day === 10 && <span className="absolute -top-1 -right-1 size-2.5 bg-primary rounded-full animate-pulse"></span>}
                    </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white rounded-[2rem] p-8 shadow-soft border border-slate-100/50">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent">payments</span>
                    质押与奖励
                  </h3>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">已质押金额</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-display font-black text-slate-900">200.00</span>
                        <span className="text-sm font-bold text-slate-500 uppercase">USDT</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">预估年化收益</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-display font-black text-emerald-600">12.5%</span>
                        <span className="text-sm font-bold text-emerald-500 uppercase">APR</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FFF1F1] rounded-2xl p-5 border border-[#FFE4E4] flex items-center gap-6">
                    <div className="flex flex-col items-center justify-center text-danger shrink-0">
                      <span className="material-symbols-outlined font-bold text-2xl">report</span>
                      <span className="text-[10px] font-bold uppercase mt-1">report</span>
                    </div>
                    <div className="h-10 w-px bg-red-200/50"></div>
                    <div>
                      <h4 className="text-sm font-bold text-danger mb-1 uppercase tracking-wide">惩罚规则警示</h4>
                      <p className="text-[12px] text-red-600/80 leading-relaxed font-medium">
                        若今日未能在 24:00 前同步阅读数据，系统将自动扣除当日质押份额 (约 <span className="font-bold underline">6.67 USDT</span>) 作为惩罚。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] p-8 shadow-soft border border-slate-100/50 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">AI 习惯教练</h3>
                        <p className="text-xs text-slate-400 font-medium">您的个性化习惯优化专家</p>
                      </div>
                    </div>
                    <div className="relative mb-8">
                      <div className="chat-bubble bg-white border border-slate-100 p-6 rounded-2xl shadow-sm italic text-slate-600 leading-relaxed text-sm">
                        “嗨！你已经连续坚持阅读 7 天了，这是一个非常了不起的里程碑。根据我们的 AI 模型分析，度过前 10 天是习惯成型的关键。”
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex -space-x-2">
                      <div className="size-8 rounded-full border-2 border-white bg-slate-200"></div>
                      <div className="size-8 rounded-full border-2 border-white bg-slate-300"></div>
                      <div className="size-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] text-white font-bold">+12</div>
                    </div>
                    <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                      AI 深度分析
                      <span className="material-symbols-outlined text-sm">trending_up</span>
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChallengeDetail;