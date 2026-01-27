import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setPage }) => {
  const getLinkClass = (page: Page) => {
    const baseClass = "text-sm font-medium py-5 border-b-2 transition-colors cursor-pointer";
    const activeClass = "text-primary border-primary font-bold";
    const inactiveClass = "text-slate-600 dark:text-slate-300 border-transparent hover:text-primary";
    
    return `${baseClass} ${currentPage === page ? activeClass : inactiveClass}`;
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-100 dark:border-slate-800 bg-surface-light dark:bg-surface-dark px-6 lg:px-10 sticky top-0 z-50 h-16">
      <div className="flex items-center gap-2 text-slate-900 dark:text-white cursor-pointer" onClick={() => setPage(Page.CREATE_CHALLENGE)}>
        <div className="size-8 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl font-bold">token</span>
        </div>
        <h2 className="text-xl font-display font-bold leading-tight">HabitStaker</h2>
      </div>
      <nav className="hidden md:flex items-center gap-8 h-full">
        <a className={getLinkClass(Page.HOME)} onClick={() => setPage(Page.CREATE_CHALLENGE)}>首页</a>
        <a className={getLinkClass(Page.CHALLENGE_LIST)} onClick={() => setPage(Page.CHALLENGE_LIST)}>挑战列表</a>
        <a className={getLinkClass(Page.DASHBOARD)} onClick={() => setPage(Page.DASHBOARD)}>数据看板</a>
      </nav>
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">1,240.50 USDT</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:border-primary transition-colors">
          <span className="material-symbols-outlined text-base text-primary">account_balance_wallet</span>
          <span className="text-sm font-mono text-slate-600 dark:text-slate-300">0x71C...8E5</span>
        </div>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border-2 border-white shadow-sm cursor-pointer" style={{backgroundImage: 'url("https://picsum.photos/100/100")'}}></div>
      </div>
    </header>
  );
};

export default Header;