'use client';

import { useGame } from './lib/GameContext';
import { InvestorMode } from './components/InvestorMode';
import { ResultsScreen } from './components/ResultsScreen';
import { useState, useMemo } from 'react';
import {
  Dices,
  BookOpen,
  Flag,
  Lightbulb,
  Search,
  CheckCircle,
  Gamepad2,
  RefreshCcw,
  Info
} from 'lucide-react';

function WelcomeScreen({ onStart, onReset }: { 
  onStart: () => void; 
  onReset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Dices className="w-20 h-20 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ponzi <span className="text-gradient">Investor</span>
          </h1>
          <p className="text-xl text-slate-400">
            Can you spot the scam before you lose everything?
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            What You&apos;ll Learn
          </h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <Flag className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span>How to identify red flags in investment offers</span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span>Why &quot;guaranteed returns&quot; should make you suspicious</span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>What questions to ask before investing</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>Signs of legitimate vs fraudulent investments</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-blue-400" />
            How to Play
          </h2>
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-sm text-slate-400">
              Start with $10,000 and 3 Action Points. Review 7 investment offers, 
              use your AP to investigate red flags, and decide whether to invest, 
              walk away, or report suspicious activity. Correct reports earn +1 AP, 
              false reports cost -2 AP. Your goal: maximize your net worth while avoiding scams.
            </p>
          </div>
        </div>

        <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-4 mb-6">
          <p className="text-blue-300 text-sm text-center flex items-center justify-center gap-2">
            <Info className="w-5 h-5 flex-shrink-0" />
            <span>
              <strong>Educational Purpose:</strong> This game teaches real warning signs of 
              Ponzi schemes and investment fraud. Always do your own research before investing real money.
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onStart}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] animate-pulse-glow flex items-center justify-center gap-2"
          >
            <Gamepad2 className="w-6 h-6" />
            Start Game
          </button>

          <button
            onClick={onReset}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { state, resetGame } = useGame();
  const [manualStart, setManualStart] = useState(false);

  // Derive gameStarted from state or manual start button click
  const gameStarted = useMemo(() => {
    return manualStart || state.investorRound > 0 || state.investorResults.length > 0 || state.investorCompleted;
  }, [manualStart, state.investorRound, state.investorResults.length, state.investorCompleted]);

  const handleStart = () => {
    setManualStart(true);
  };

  const handleReset = () => {
    resetGame();
    setManualStart(false);
  };

  // Show results screen
  if (state.mode === 'results') {
    return <ResultsScreen />;
  }

  // Show investor mode if game started
  if (gameStarted) {
    return <InvestorMode />;
  }

  // Show welcome screen
  return (
    <WelcomeScreen 
      onStart={handleStart}
      onReset={handleReset}
    />
  );
}
