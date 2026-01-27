import React from 'react';
import { Page } from '../types';

interface LandingPageProps {
    setPage: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setPage }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-[#111813] dark:text-white transition-colors duration-300 font-display">
            <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-[#dce5df]/30 px-6 md:px-20 lg:px-40 py-4">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-brand-green rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-background-dark font-bold">eco</span>
                        </div>
                        <h2 className="text-xl font-extrabold tracking-tight">HabitStaker</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-sm font-semibold hover:text-brand-green transition-colors cursor-pointer" onClick={() => setPage(Page.CHALLENGE_LIST)}>首页</a>
                        <a className="text-sm font-semibold hover:text-brand-green transition-colors cursor-pointer" onClick={() => setPage(Page.CHALLENGE_LIST)}>挑战列表</a>
                        <a className="text-sm font-semibold hover:text-brand-green transition-colors cursor-pointer" onClick={() => setPage(Page.DASHBOARD)}>数据看板</a>
                    </nav>
                    <button
                        onClick={() => setPage(Page.CHALLENGE_LIST)}
                        className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-xl h-11 px-6 bg-brand-green text-[#111813] text-sm font-bold shadow-lg shadow-brand-green/20 hover:scale-105 transition-transform"
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
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-bold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-[14px] mr-1">auto_awesome</span>
                                AI 驱动的 Web3 自律教练
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black leading-[1.2] tracking-tight text-[#111813] dark:text-white">
                                用自律赢得未来，<br />
                                <span className="text-brand-green block mt-2">用质押见证成长</span>
                            </h1>
                            <p className="text-lg md:text-xl text-[#63886f] dark:text-gray-400 max-w-[540px]">
                                结合 AI 监督与 Web3 质押机制，让每一次坚持都有价值。支持 Strava、Duolingo 数据自动同步，开启你的对赌成长之旅。
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setPage(Page.CHALLENGE_LIST)}
                                    className="h-14 px-8 bg-brand-green text-[#111813] font-bold rounded-xl text-lg flex items-center justify-center gap-2 hover:bg-brand-green/90 transition-colors shadow-xl shadow-brand-green/10"
                                >
                                    立即开启挑战
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                                <button className="h-14 px-8 border-2 border-[#dce5df] dark:border-gray-700 text-[#111813] dark:text-white font-bold rounded-xl text-lg flex items-center justify-center hover:bg-white/50 dark:hover:bg-gray-800 transition-colors">
                                    查看 Demo
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full max-w-[500px]">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-brand-green to-accent-blue rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border border-[#dce5df] dark:border-gray-700 flex items-center justify-center">
                                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBf2h0Si_Ps9Af5_s_s8fwMLiIDcllAbIDBo9Imnh10TvKxqZTt_UOjFUwHCMMYK4pZ_F2fmiqrqRo3I5WZIQ067ZPFatYOsR9I1h5lWqTQ2aauLdmUAJDGuKHsAHjh_Xsh_0ZetyqbhtjDv28t36TgDuo8qeO4GRYGv7EHDQtZAwJW8X1Upz73sSEkMpSFP4HAgdcPHyDoq5b8MEQS2g6wQ-T3LAK_oN3-aG7gPK1XCPz1kikmbwRws-234SFIPXk_rIEP6KCsSs38')" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white/40 dark:bg-black/20 border-y border-[#dce5df] dark:border-gray-800 py-12">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-20 lg:px-40">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <p className="text-sm font-semibold text-[#63886f] uppercase tracking-widest mb-2">累计质押金额</p>
                                <p className="text-4xl font-black text-brand-green">$2,840,500+</p>
                            </div>
                            <div className="text-center border-x border-[#dce5df] dark:border-gray-800">
                                <p className="text-sm font-semibold text-[#63886f] uppercase tracking-widest mb-2">活跃挑战者</p>
                                <p className="text-4xl font-black text-[#111813] dark:text-white">12,482</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold text-[#63886f] uppercase tracking-widest mb-2">公益捐赠总额</p>
                                <p className="text-4xl font-black text-accent-blue">$158,200</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-20 lg:px-40 py-24">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="mb-16 text-center max-w-[800px] mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">重新定义习惯养成</h2>
                            <p className="text-lg text-[#63886f]">利用 Web3 经济激励模型与 AI 验证技术，克服人性弱点。</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl border border-[#dce5df] dark:border-gray-700 hover:shadow-xl transition-shadow group">
                                <div className="size-14 bg-accent-blue/10 text-accent-blue rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">sync</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">AI 实时同步</h3>
                                <p className="text-[#63886f] dark:text-gray-400">深度集成 Duolingo、Strava 与 GitHub，通过 AI 引擎自动验证行为数据，无需手动繁琐打卡。</p>
                            </div>
                            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl border border-[#dce5df] dark:border-gray-700 hover:shadow-xl transition-shadow group">
                                <div className="size-14 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">lock</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">资产对赌机制</h3>
                                <p className="text-[#63886f] dark:text-gray-400">质押 100U 或更多开启挑战，利用沉没成本效应与损失厌恶心理，激发你最强的执行力。</p>
                            </div>
                            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl border border-[#dce5df] dark:border-gray-700 hover:shadow-xl transition-shadow group">
                                <div className="size-14 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">奖励与公益</h3>
                                <p className="text-[#63886f] dark:text-gray-400">挑战失败的质押金将进入奖池奖励胜者或捐赠给全球公益机构，让自律更有深度。</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#f0f4f2] dark:bg-gray-900/50 py-24">
                    <div className="max-w-[1280px] mx-auto px-6 md:px-20 lg:px-40">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">挑战之旅：如何运作</h2>
                        <div className="relative flex flex-col md:flex-row justify-between items-start gap-12">
                            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-[#dce5df] dark:bg-gray-700 -z-0"></div>
                            <div className="relative flex-1 text-center group">
                                <div className="size-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md z-10 relative border-4 border-[#f0f4f2] dark:border-gray-900">
                                    <span className="material-symbols-outlined text-3xl text-brand-green">edit_note</span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">1. 选择习惯</h4>
                                <p className="text-sm text-[#63886f]">在挑战列表中选择跑步、阅读或学习目标</p>
                            </div>
                            <div className="relative flex-1 text-center group">
                                <div className="size-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md z-10 relative border-4 border-[#f0f4f2] dark:border-gray-900">
                                    <span className="material-symbols-outlined text-3xl text-brand-green">payments</span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">2. 存入质押金</h4>
                                <p className="text-sm text-[#63886f]">在链上安全锁定您的挑战对赌金</p>
                            </div>
                            <div className="relative flex-1 text-center group">
                                <div className="size-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md z-10 relative border-4 border-[#f0f4f2] dark:border-gray-900">
                                    <span className="material-symbols-outlined text-3xl text-brand-green">data_usage</span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">3. 每日同步</h4>
                                <p className="text-sm text-[#63886f]">AI 自动通过 API 校验您的每日行为数据</p>
                            </div>
                            <div className="relative flex-1 text-center group">
                                <div className="size-24 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg z-10 relative border-4 border-[#f0f4f2] dark:border-gray-900">
                                    <span className="material-symbols-outlined text-3xl">trophy</span>
                                </div>
                                <h4 className="text-lg font-bold mb-2">4. 达成与结算</h4>
                                <p className="text-sm text-[#63886f]">挑战成功拿回本金，并瓜分奖励奖池</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 md:px-20 lg:px-40 py-24">
                    <div className="max-w-[1280px] mx-auto">
                        <div className="group bg-brand-green rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(25,230,94,0.3)]">
                            {/* Animated Background Blobs */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-96 bg-white/20 rounded-full blur-3xl animate-blob"></div>
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-96 bg-black/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-80 bg-accent-blue/20 rounded-full blur-3xl animate-blob animation-delay-4000 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-6xl font-black text-[#111813] mb-6 tracking-tight animate-float">准备好改变自己了吗？</h2>
                                <p className="text-xl text-[#111813]/80 mb-12 max-w-[600px] mx-auto font-medium">
                                    加入 HabitStaker，与全球上万名挑战者一起，用科技与自律重塑生活轨迹。
                                </p>
                                <button
                                    onClick={() => setPage(Page.CHALLENGE_LIST)}
                                    className="shine-button bg-[#111813] text-white h-16 px-14 rounded-2xl text-xl font-bold hover:scale-105 transition-transform shadow-2xl flex items-center justify-center mx-auto hover:bg-black"
                                >
                                    <span className="relative z-10">现在就开始</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white dark:bg-gray-950 border-t border-[#dce5df] dark:border-gray-800 py-16">
                <div className="max-w-[1280px] mx-auto px-6 md:px-20 lg:px-40">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-6 bg-brand-green rounded flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[16px] text-background-dark font-bold">eco</span>
                                </div>
                                <h2 className="text-lg font-extrabold tracking-tight">HabitStaker</h2>
                            </div>
                            <p className="text-sm text-[#63886f] dark:text-gray-400">
                                HabitStaker 是首个结合 AI 教练与 Web3 质押奖励的习惯养成平台。
                            </p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">产品</h5>
                            <ul className="space-y-4 text-sm text-[#63886f] dark:text-gray-400">
                                <li><a className="hover:text-brand-green" href="#">挑战列表</a></li>
                                <li><a className="hover:text-brand-green" href="#">数据看板</a></li>
                                <li><a className="hover:text-brand-green" href="#">AI 教练</a></li>
                                <li><a className="hover:text-brand-green" href="#">质押机制</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">社区</h5>
                            <ul className="space-y-4 text-sm text-[#63886f] dark:text-gray-400">
                                <li><a className="hover:text-brand-green" href="#">Discord</a></li>
                                <li><a className="hover:text-brand-green" href="#">Twitter</a></li>
                                <li><a className="hover:text-brand-green" href="#">Telegram</a></li>
                                <li><a className="hover:text-brand-green" href="#">Medium</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-6">关于</h5>
                            <ul className="space-y-4 text-sm text-[#63886f] dark:text-gray-400">
                                <li><a className="hover:text-brand-green" href="#">关于我们</a></li>
                                <li><a className="hover:text-brand-green" href="#">品牌资料</a></li>
                                <li><a className="hover:text-brand-green" href="#">联系我们</a></li>
                                <li><a className="hover:text-brand-green" href="#">隐私政策</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-[#dce5df] dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-[#63886f]">© 2024 HabitStaker. Powered by Web3 & AI.</p>
                        <div className="flex items-center gap-6">
                            <span className="material-symbols-outlined text-[#63886f] cursor-pointer hover:text-brand-green">public</span>
                            <span className="material-symbols-outlined text-[#63886f] cursor-pointer hover:text-brand-green">share</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
