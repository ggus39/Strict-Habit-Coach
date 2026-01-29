import React from 'react';
import { Page } from '../types';

interface LandingPageProps {
    setPage: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setPage }) => {
    return (
        <div className="">
            <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-slate-200/30 px-6 md:px-20 lg:px-40 py-4">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl font-bold">token</span>
                        </div>
                        <h2 className="text-xl font-extrabold tracking-tight">HabitStaker</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => setPage(Page.CREATE_CHALLENGE)}>首页</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => setPage(Page.CHALLENGE_LIST)}>挑战列表</a>
                        <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => setPage(Page.DASHBOARD)}>数据看板</a>
                    </nav>
                    <button
                        onClick={() => setPage(Page.CHALLENGE_LIST)}
                        className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-xl h-11 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                    >
                        <span className="material-symbols-outlined mr-2 text-[20px]">account_balance_wallet</span>
                        连接钱包
                    </button>
                </div>
            </header>

            <main className="pt-24">
                <section className="px-6 md:px-20 lg:px-40 py-16 md:py-24">
                    <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-[14px] mr-1">auto_awesome</span>
                                AI 驱动的 Web3 自律教练
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black leading-[1.2] tracking-tight text-slate-900 dark:text-white">
                                用自律赢得未来，<br />
                                <span className="text-primary block mt-2">用质押见证成长</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-[540px]">
                                结合 AI 监督与 Web3 质押机制，让每一次坚持都有价值。支持 Strava、Duolingo 数据自动同步，开启你的对赌成长之旅。
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setPage(Page.CHALLENGE_LIST)}
                                    className="h-14 px-8 bg-primary text-white font-bold rounded-xl text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-xl shadow-primary/10"
                                >
                                    立即开启挑战
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-[500px]">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-blue rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 flex items-center justify-center">
                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBf2h0Si_Ps9Af5_s_s8fwMLiIDcllAbIDBo9Imnh10TvKxqZTt_UOjFUwHCMMYK4pZ_F2fmiqrqRo3I5WZIQ067ZPFatYOsR9I1h5lWqTQ2aauLdmUAJDGuKHsAHjh_Xsh_0ZetyqbhtjDv28t36TgDuo8qeO4GRYGv7EHDQtZAwJW8X1Upz73sSEkMpSFP4HAgdcPHyDoq5b8MEQS2g6wQ-T3LAK_oN3-aG7gPK1XCPz1kikmbwRws-234SFIPXk_rIEP6KCsSs38')" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white/40 dark:bg-black/20 border-y border-slate-200 dark:border-gray-800 py-12">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-20 lg:px-40">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest mb-2">累计质押金额</p>
                                <p className="text-4xl font-black text-primary">$2,840,500+</p>
                            </div>
                            <div className="text-center border-x border-slate-200 dark:border-gray-800">
                                <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest mb-2">活跃挑战者</p>
                                <p className="text-4xl font-black text-slate-900 dark:text-white">12,482</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest mb-2">公益捐赠总额</p>
                                <p className="text-4xl font-black text-accent-blue">$158,200</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-20 lg:px-40 py-24">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="mb-16 text-center max-w-[800px] mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">重新定义习惯养成</h2>
                            <p className="text-lg text-slate-600">利用 Web3 经济激励模型与 AI 验证技术，克服人性弱点。</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
                                <div className="size-14 bg-accent-blue/10 text-accent-blue rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">sync</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">AI 实时同步</h3>
                                <p className="text-slate-600 dark:text-gray-400">深度集成 Duolingo、Strava 与 GitHub，通过 AI 引擎自动验证行为数据，无需手动繁琐打卡。</p>
                            </div>
                            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
                                <div className="size-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">lock</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">资产对赌机制</h3>
                                <p className="text-slate-600 dark:text-gray-400">质押 100U 或更多开启挑战，利用沉没成本效应与损失厌恶心理，激发你最强的执行力。</p>
                            </div>
                            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
                                <div className="size-14 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">奖励与公益</h3>
                                <p className="text-slate-600 dark:text-gray-400">挑战失败的质押金将进入奖池奖励胜者或捐赠给全球公益机构，让自律更有深度。</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 dark:bg-gray-900/50 py-24">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-20 lg:px-40">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">挑战之旅：如何运作</h2>
                        <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 dark:bg-gray-700 -z-0"></div>
                            <div className="relative flex-1 text-center group">
                                <div className="size-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md z-10 relative border-4 border-slate-50 dark:border-gray-900">
                                    <span className="material-symbols-outlined text-3xl text-primary">edit_note</span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">1. 选择习惯</h4>
                                <p className="text-sm text-slate-600">在挑战列表中选择跑步、阅读或学习目标</p>
                            </div>
                            <div className="relative flex-1 text-center group">
                                <div className="size-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md z-10 relative border-4 border-slate-50 dark:border-gray-900">
                                    <span className="material-symbols-outlined text-3xl text-primary">payments</span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">2. 存入质押金</h4>
                                <p className="text-sm text-slate-600">在链上安全锁定您的挑战对赌金</p>
                            </div>
                            <div className="relative flex-1 text-center group">
                                <div className="size-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md z-10 relative border-4 border-slate-50 dark:border-gray-900">
                                    <span className="material-symbols-outlined text-3xl text-primary">data_usage</span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">3. 每日同步</h4>
                                <p className="text-sm text-slate-600">AI 自动通过 API 校验您的每日行为数据</p>
                            </div>
                            <div className="relative flex-1 text-center group">
                                <div className="size-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg z-10 relative border-4 border-slate-50 dark:border-gray-900">
                                    <span className="material-symbols-outlined text-3xl">trophy</span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">4. 达成与结算</h4>
                                <p className="text-sm text-slate-600">挑战成功拿回本金，并瓜分奖励奖池</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white dark:bg-gray-950 border-t border-slate-200 dark:border-gray-800 py-16">
                <div className="max-w-[1280px] mx-auto px-6 md:px-20 lg:px-40">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-6 text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[16px] font-bold">token</span>
                                </div>
                                <h2 className="text-lg font-extrabold tracking-tight">HabitStaker</h2>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-gray-400">
                                HabitStaker 是首个结合 AI 教练与 Web3 质押奖励的习惯养成平台。
                            </p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">产品</h5>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-gray-400">
                                <li><a className="hover:text-primary" href="#">挑战列表</a></li>
                                <li><a className="hover:text-primary" href="#">数据看板</a></li>
                                <li><a className="hover:text-primary" href="#">AI 教练</a></li>
                                <li><a className="hover:text-primary" href="#">质押机制</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">社区</h5>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-gray-400">
                                <li><a className="hover:text-primary" href="#">Discord</a></li>
                                <li><a className="hover:text-primary" href="#">Twitter</a></li>
                                <li><a className="hover:text-primary" href="#">Telegram</a></li>
                                <li><a className="hover:text-primary" href="#">Medium</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">关于</h5>
                            <ul className="space-y-4 text-sm text-slate-600 dark:text-gray-400">
                                <li><a className="hover:text-primary" href="#">关于我们</a></li>
                                <li><a className="hover:text-primary" href="#">品牌资料</a></li>
                                <li><a className="hover:text-primary" href="#">联系我们</a></li>
                                <li><a className="hover:text-primary" href="#">隐私政策</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-600">© 2024 HabitStaker. Powered by Web3 & AI.</p>
                        <div className="flex items-center gap-6">
                            <span className="material-symbols-outlined text-slate-600 cursor-pointer hover:text-primary">public</span>
                            <span className="material-symbols-outlined text-slate-600 cursor-pointer hover:text-primary">share</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
