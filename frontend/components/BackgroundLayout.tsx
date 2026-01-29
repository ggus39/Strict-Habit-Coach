import React, { ReactNode } from 'react';

interface BackgroundLayoutProps {
    children: ReactNode;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300 font-display overflow-hidden selection:bg-primary/30">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none -z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-accent-blue/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default BackgroundLayout;
