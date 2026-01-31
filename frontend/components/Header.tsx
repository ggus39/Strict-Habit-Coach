import React from 'react';
import { useAccount, useConnect, useDisconnect, useBalance, useReadContract } from 'wagmi';
import { Page } from '../types';
import { STRICT_TOKEN_ADDRESS, STRICT_TOKEN_ABI } from '../contracts';
import { formatEther } from 'viem';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setPage }) => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
    query: {
      refetchInterval: 5000,
    }
  });

  const { data: strictBalance } = useReadContract({
    address: STRICT_TOKEN_ADDRESS,
    abi: STRICT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 5000 },
  });

  const getLinkClass = (page: Page) => {
    const baseClass = "text-sm font-semibold transition-colors cursor-pointer";
    const activeClass = "text-primary";
    const inactiveClass = "text-slate-600 dark:text-slate-300 hover:text-primary";

    return `${baseClass} ${currentPage === page ? activeClass : inactiveClass}`;
  };

  // 格式化地址显示
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // 格式化余额显示
  const formatBalance = (bal: typeof balance) => {
    if (!bal) return '0.00';
    return parseFloat(bal.formatted).toFixed(4);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-slate-200/30 px-6 md:px-20 lg:px-40 py-4 h-[80px]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage(Page.HOME)}>
          <div className="size-8 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl font-bold">token</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">HabitStaker</h2>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <a className={getLinkClass(Page.CREATE_CHALLENGE)} onClick={() => setPage(Page.CREATE_CHALLENGE)}>首页</a>
          <a className={getLinkClass(Page.CHALLENGE_LIST)} onClick={() => setPage(Page.CHALLENGE_LIST)}>挑战列表</a>
          <a className={getLinkClass(Page.DASHBOARD)} onClick={() => setPage(Page.DASHBOARD)}>数据看板</a>
        </nav>
        <div className="flex items-center gap-4">
          {isConnected ? (
            <>
              {/* 显示 STRICT 代币余额 */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                <span className="material-symbols-outlined text-purple-600 text-sm">stars</span>
                <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
                  {strictBalance ? parseFloat(formatEther(strictBalance as bigint)).toFixed(2) : '0.00'} STRICT
                </span>
              </div>

              {/* 显示余额 */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {formatBalance(balance)} {balance?.symbol || 'ETH'}
                </span>
              </div>
              {/* 显示地址和断开连接 */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:border-primary transition-colors bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                onClick={() => disconnect()}
                title="点击断开连接"
              >
                <span className="material-symbols-outlined text-base text-primary">account_balance_wallet</span>
                <span className="text-sm font-mono text-slate-600 dark:text-slate-300">{formatAddress(address!)}</span>
              </div>
            </>
          ) : (
            /* 连接钱包按钮 */
            <button
              className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-sky-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 hover:scale-105"
              onClick={() => {
                const metaMask = connectors.find((c) => c.name === 'MetaMask');
                if (metaMask) {
                  connect({ connector: metaMask });
                } else {
                  connect({ connector: connectors[0] });
                }
              }}
              disabled={isPending}
            >
              <span className="material-symbols-outlined text-base">account_balance_wallet</span>
              {isPending ? '连接中...' : '连接钱包'}
            </button>
          )}
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-white/50 shadow-md cursor-pointer hover:scale-105 transition-transform" style={{ backgroundImage: 'url("https://picsum.photos/100/100")' }}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;