import React, { useState } from 'react';
import Header from './components/Header';
import CreateChallenge from './pages/CreateChallenge';
import ChallengeList from './pages/ChallengeList';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ChallengeDetail from './pages/ChallengeDetail';
import BackgroundLayout from './components/BackgroundLayout';
import { PrivacyPolicyModal, TermsModal } from './components/LegalModals';
import { Page } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.CHALLENGE_LIST); // Default to App for dev, or Home
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Initial Check for Dev - logic to default to Home if preferred
  // const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <LandingPage setPage={setCurrentPage} />;
      case Page.CREATE_CHALLENGE:
        return <CreateChallenge setPage={setCurrentPage} />;
      case Page.CHALLENGE_LIST:
        return <ChallengeList setPage={setCurrentPage} onSelectChallenge={(id) => {
          setSelectedChallengeId(id);
          setCurrentPage(Page.CHALLENGE_DETAIL);
        }} />;
      case Page.DASHBOARD:
        return <Dashboard setPage={setCurrentPage} onSelectChallenge={(id) => {
          setSelectedChallengeId(id);
          setCurrentPage(Page.CHALLENGE_DETAIL);
        }} />;
      case Page.CHALLENGE_DETAIL:
        return <ChallengeDetail setPage={setCurrentPage} challengeId={selectedChallengeId} />;
      default:
        return <ChallengeList setPage={setCurrentPage} />;
    }
  };

  if (currentPage === Page.HOME) {
    return (
      <BackgroundLayout>
        {renderPage()}
      </BackgroundLayout>
    );
  }

  return (
    <BackgroundLayout>
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      <div className="flex-grow flex flex-col w-full max-w-[1440px] mx-auto pt-24">
        {renderPage()}
      </div>
      <footer className="mt-auto border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-8">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 opacity-60">
            <span className="material-symbols-outlined text-xl text-slate-400">token</span>
            <span className="text-sm font-bold text-slate-500">HabitStaker © 2026</span>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-400">
            <button className="hover:text-primary transition-colors" onClick={() => setShowPrivacy(true)}>隐私政策</button>
            <button className="hover:text-primary transition-colors" onClick={() => setShowTerms(true)}>使用条款</button>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </BackgroundLayout>
  );
}

export default App;