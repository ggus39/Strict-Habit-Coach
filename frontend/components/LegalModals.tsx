import React from 'react';
import { Icon } from './Icon';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const BaseModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl ring-1 ring-white/10 animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Icon name="gavel" className="text-primary" />
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="size-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <Icon name="close" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto text-slate-600 dark:text-slate-300 text-sm leading-relaxed space-y-4">
                    {children}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 shrink-0 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity"
                    >
                        我已了解
                    </button>
                </div>
            </div>
        </div>
    );
};

export const PrivacyPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = (props) => (
    <BaseModal {...props} title="隐私政策 (Privacy Policy)">
        <div className="space-y-4">
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. 数据收集与使用</h4>
                <p>HabitStaker 重视您的隐私。在这个去中心化应用（DApp）中，我们不会收集您的姓名、邮箱、电话等个人身份信息（PII）。</p>
                <p>我们收集和处理的数据主要限于公开的链上数据，包括：</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>您的区块链钱包地址（Public Address）。</li>
                    <li>与 HabitEscrow 智能合约交互的交易记录。</li>
                    <li>您提交的习惯打卡记录（如 GitHub Commit 状态、Strava 运动数据、阅读笔记）。</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. 第三方服务集成</h4>
                <p>为了验证您的习惯完成情况，我们需要与第三方服务进行交互：</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>GitHub:</strong> 我们仅读取您的公开提交记录，不会修改您的代码库。</li>
                    <li><strong>Strava:</strong> 我们仅读取您的运动活动数据，不会发布动态。</li>
                </ul>
                <p>这些授权通过 OAuth 标准协议进行，我们不会存储您的第三方账户密码。</p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">3. 数据存储</h4>
                <p>
                    大部分核心业务逻辑（如质押、挑战状态）存储在 Kite AI Testnet 区块链上。这就是 Web3 的魅力——数据透明且不可篡改。
                    部分元数据（如 AI 审核结果）可能暂时存储在我们的缓存服务器中以加速访问，但仅作为链上数据的补充。
                </p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">4. 隐私保护声明</h4>
                <p>虽然我们尽力保护您的数据，但请注意区块链数据本质上是公开的。任何知道您钱包地址的人都可以查看您在这个 DApp 上的活动历史。建议您使用专用的钱包地址参与。</p>
            </div>
        </div>
    </BaseModal>
);

export const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = (props) => (
    <BaseModal {...props} title="使用条款 (Terms of Use)">
        <div className="space-y-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-xs font-bold">
                风险提示：这是一款基于区块链的实验性应用 (Beta)。在涉及真实资产操作时，请务必谨慎。
            </div>

            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. 服务描述</h4>
                <p>HabitStaker 是一个帮助用户养成习惯的 Web3 工具。用户通过质押加密资产（如 KITE）来承诺完成特定任务。如果完成任务，质押金退还并获得代币奖励；如果失败，质押金将被扣除。</p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. 资产风险</h4>
                <p>您理解并同意：</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>质押金可能全部损失：</strong> 如果您未能按时完成打卡任务，智能合约将根据规则自动执行罚没（Slashing）。这不可逆转。</li>
                    <li><strong>技术风险：</strong> 智能合约可能存在未发现的漏洞。虽然我们进行了测试，但不保证 100% 的安全性。您需自行承担使用智能合约的风险。</li>
                    <li><strong>网络风险：</strong> 区块链网络的拥堵、Gas 费波动等不可抗力可能影响服务的正常使用。</li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">3. 免责声明</h4>
                <p>
                    本应用按&ldquo;现状&rdquo;提供，不附带任何形式的明示或暗示保证。开发团队不对因使用本应用而导致的任何直接或间接损失负责，包括但不限于资金损失、数据丢失或利润损失。
                </p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">4. 规则变更</h4>
                <p>我们保留根据社区反馈或技术升级调整应用规则的权利。重大的智能合约升级将通过社区公告告知。</p>
            </div>
        </div>
    </BaseModal>
);

export const MechanismModal: React.FC<{ isOpen: boolean; onClose: () => void }> = (props) => (
    <BaseModal {...props} title="质押机制解析 (Staking Mechanism)">
        <div className="space-y-4">
            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">1. 核心逻辑 (Core Logic)</h4>
                <p>HabitStaker 的运行基于一套不可篡改的智能合约规则：</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>质押 (Stake):</strong> 用户在开启挑战时存入 KITE 到 HabitEscrow 合约。</li>
                    <li><strong>验证 (Verify):</strong> AI Agent 每日根据 GitHub/Strava、阅读笔记 数据验证您的行为，并上链记录。</li>
                    <li><strong>结算 (Settlement):</strong>
                        <ul className="list-disc pl-5 mt-1 text-xs text-slate-500">
                            <li>成功完成：取回本金 + 获得 STRICT 代币奖励。</li>
                            <li>挑战失败：质押的 ETH 将根据您设定的“失败去向”被转走（捐赠/销毁/项目方）。</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">2. 为什么有效 (The Psychology)</h4>
                <p>我们利用了行为经济学中的<strong>损失厌恶 (Loss Aversion)</strong> 原理：</p>
                <p className="mt-2 text-primary font-medium">“人们失去 100 元的痛苦，远大于获得 100 元的快乐。”</p>
                <p>当真正的资产被锁定时，您的大脑会为了避免损失而产生强大的行动力。这就是 HabitStaker 能提高 3 倍成功率的秘密。</p>
            </div>

            <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">3. 资金安全 (Security)</h4>
                <p>您的质押金存储在公开审计的智能合约中，任何人都（包括开发团队）无法随意挪用。只有符合合约规定的“挑战成功”或“挑战失败”逻辑触发时，资金才会移动。</p>
            </div>
        </div>
    </BaseModal>
);
