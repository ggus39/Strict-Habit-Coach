import { http, createConfig } from 'wagmi';
import { defineChain } from 'viem';
import { injected, metaMask } from 'wagmi/connectors';

// 自定义 Kite AI Testnet 链配置
export const kiteAITestnet = defineChain({
  id: 2368,
  name: 'KiteAI Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'KITE',
    symbol: 'KITE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-testnet.gokite.ai/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kite Explorer',
      url: 'https://testnet.kitescan.ai',
    },
  },
  testnet: true,
});

// wagmi 配置
export const config = createConfig({
  chains: [kiteAITestnet],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [kiteAITestnet.id]: http('https://rpc-testnet.gokite.ai/'),
  },
});

// 声明类型
declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
