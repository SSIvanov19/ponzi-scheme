'use client';

import { useGame } from '../lib/GameContext';
import { OFFER_CARDS, isPonziLike } from '../lib/cards';
import { InvestorRoundResult } from '../lib/types';
import {
  BarChart3,
  DollarSign,
  Zap,
  Target,
  Trophy,
  CheckCircle,
  XCircle,
  AlertCircle,
  MinusCircle,
  Hand,
  ShieldAlert,
  Lightbulb,
  Flag,
  ShieldCheck
} from 'lucide-react';
import { isDefinitelyPonzi, isAmbiguous, isLegit } from '../lib/cards';

// Map hiddenTruth values to user-friendly labels
const HIDDEN_TRUTH_LABELS: Record<string, string> = {
  ponzi: 'Ponzi Scheme',
  pyramid_like_or_ponzi: 'Pyramid/Ponzi Scheme',
  ponzi_or_unregistered_fraud: 'Ponzi or Unregistered Fraud',
  ponzi_or_fraud: 'Ponzi or Fraud',
  ponzi_like_liquidity_trap: 'Ponzi-Like Liquidity Trap',
  can_mimic_ponzi_dynamics: 'Can Mimic Ponzi Dynamics',
  ambiguous_can_create_ponzi_like_dynamics: 'High Risk - Ponzi-Like Dynamics',
  unclear_high_risk_not_necessarily_ponzi: 'High Risk (Not Necessarily Ponzi)',
  speculative_not_ponzi: 'Speculative (Not a Ponzi)',
  legit: 'Legitimate Investment',
};

export function ResultsScreen() {
  const { state, resetGame } = useGame();

  const getDecisionIcon = (decision: string) => {
    const icons: Record<string, React.ReactNode> = {
      invest: <DollarSign className="w-5 h-5 text-green-400" />,
      investMore: <><DollarSign className="w-4 h-4 text-green-400" /><DollarSign className="w-4 h-4 text-green-400" /></>,
      walkAway: <Hand className="w-5 h-5 text-slate-400" />,
      report: <ShieldAlert className="w-5 h-5 text-red-400" />,
    };
    return icons[decision] || <MinusCircle className="w-5 h-5 text-slate-400" />;
  };

  const getTruthBadge = (truth: string) => {
    // Definite scams - red
    if (isDefinitelyPonzi(truth)) {
      return <span className="px-1.5 sm:px-2 py-1 rounded text-xs bg-red-500 text-white">SCAM</span>;
    }
    // Ponzi-like dynamics (pyramid, liquidity traps, etc.) - orange
    if (isPonziLike(truth)) {
      return <span className="px-1.5 sm:px-2 py-1 rounded text-xs bg-orange-500 text-white">HIGH RISK</span>;
    }
    // Legitimate investments - green
    if (isLegit(truth)) {
      return <span className="px-1.5 sm:px-2 py-1 rounded text-xs bg-green-500 text-white">LEGIT</span>;
    }
    // Speculative/unclear - yellow
    return <span className="px-1.5 sm:px-2 py-1 rounded text-xs bg-yellow-500 text-white">RISKY</span>;
  };

  const getTruthLabel = (truth: string) => {
    return HIDDEN_TRUTH_LABELS[truth] || truth;
  };

  const getInvestorScore = (cardId: string, truth: string) => {
    const result = state.investorResults.find((r: InvestorRoundResult) => r.cardId === cardId);
    if (!result) return null;

    const isScam = isPonziLike(truth);
    const isLegitimate = isLegit(truth);
    const isRisky = isAmbiguous(truth); // High risk but not necessarily a scam
    const invested = result.decision === 'invest' || result.decision === 'investMore';
    const avoided = result.decision === 'walkAway';
    const reported = result.decision === 'report';

    if (isScam) {
      if (reported) return { icon: <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />, text: 'Perfect!', color: 'text-green-400' };
      if (avoided) return { icon: <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-400" />, text: 'Good call', color: 'text-green-400' };
      if (invested) return { icon: <XCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-400" />, text: 'Trapped!', color: 'text-red-400' };
    } else if (isLegitimate) {
      // Only legitimate investments should show "missed opportunity"
      if (invested) return { icon: <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-400" />, text: 'Good investment', color: 'text-green-400' };
      if (avoided) return { icon: <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />, text: 'Missed opportunity', color: 'text-yellow-400' };
      if (reported) return { icon: <XCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-400" />, text: 'False alarm', color: 'text-red-400' };
    } else if (isRisky) {
      // High risk investments - avoiding is good, investing is risky
      if (avoided) return { icon: <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-green-400" />, text: 'Avoided risk', color: 'text-green-400' };
      if (invested) return { icon: <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />, text: 'Risky bet', color: 'text-yellow-400' };
      if (reported) return { icon: <MinusCircle className="w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />, text: 'Overly cautious', color: 'text-slate-400' };
    }
    return { icon: <MinusCircle className="w-4 sm:w-5 h-4 sm:h-5 text-slate-400" />, text: 'Neutral', color: 'text-slate-400' };
  };

  // Calculate summary stats
  const investorCorrect = state.cardOrder.map((id: string) => 
    OFFER_CARDS.find((c) => c.id === id)
  ).filter((card): card is typeof OFFER_CARDS[number] => {
    if (!card) return false;
    const result = state.investorResults.find((r: InvestorRoundResult) => r.cardId === card.id);
    if (!result) return false;
    const isScam = isPonziLike(card.hiddenTruth);
    const avoided = result.decision === 'walkAway' || result.decision === 'report';
    const invested = result.decision === 'invest' || result.decision === 'investMore';
    return (isScam && avoided) || (!isScam && invested);
  }).length;

  const totalRounds = state.cardOrder.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <BarChart3 className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Game Complete!</h1>
          <p className="text-slate-400">
            Review your investment decisions
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-slate-800 rounded-xl p-3 sm:p-4 border border-slate-700 text-center">
            <div className="text-xl sm:text-3xl font-bold text-green-400 flex items-center justify-center gap-1 sm:gap-2">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
              {state.scores.netWorth.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Final Net Worth</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 sm:p-4 border border-slate-700 text-center">
            <div className="text-xl sm:text-3xl font-bold text-blue-400 flex items-center justify-center gap-1 sm:gap-2">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              {state.actionPoints}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Remaining AP</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-3 sm:p-4 border border-slate-700 text-center">
            <div className="text-xl sm:text-3xl font-bold text-yellow-400 flex items-center justify-center gap-1 sm:gap-2">
              <Target className="w-5 h-5 sm:w-6 sm:h-6" />
              {investorCorrect}/{totalRounds}
            </div>
            <div className="text-xs sm:text-sm text-slate-400">Accuracy</div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-slate-700">
            <h2 className="text-lg sm:text-xl font-bold text-white">Your Decisions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-slate-400">Offer</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-slate-400">Truth</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-slate-400 hidden sm:table-cell">Decision</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-slate-400">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {state.cardOrder.map((cardId: string) => {
                  const card = OFFER_CARDS.find((c) => c.id === cardId);
                  if (!card) return null;
                  const investorResult = state.investorResults.find((r: InvestorRoundResult) => r.cardId === card.id);
                  const investorScore = getInvestorScore(card.id, card.hiddenTruth);

                  return (
                    <tr key={card.id} className="hover:bg-slate-700/50">
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <div className="text-xs sm:text-sm text-white font-medium line-clamp-2">{card.title}</div>
                        <div className="text-xs text-slate-500 hidden sm:block">{card.id}</div>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {getTruthBadge(card.hiddenTruth)}
                          <span className="text-xs text-slate-500 hidden sm:block">{getTruthLabel(card.hiddenTruth)}</span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center hidden sm:table-cell">
                        {investorResult ? (
                          <span title={investorResult.decision}>
                            {getDecisionIcon(investorResult.decision)}
                          </span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                        {investorScore ? (
                          <span className={`text-xs sm:text-sm flex items-center justify-center gap-1 ${investorScore.color}`}>
                            {investorScore.icon}
                            <span className="hidden sm:inline">{investorScore.text}</span>
                          </span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Learnings */}
        <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
            Key Learnings
          </h2>
          <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-slate-900 rounded-lg p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
                <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
                Red Flags to Watch
              </h3>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1">
                <li>• Guaranteed returns (real investments have risk)</li>
                <li>• Overly consistent returns (markets fluctuate)</li>
                <li>• Missing documentation or audits</li>
                <li>• Withdrawal delays or restrictions</li>
                <li>• Secrecy or pressure tactics</li>
                <li>• Unlicensed sellers</li>
              </ul>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Signs of Legitimacy
              </h3>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1">
                <li>• Registered with regulators</li>
                <li>• Licensed, verified sellers</li>
                <li>• Audited financial statements</li>
                <li>• Clear fee disclosures</li>
                <li>• Variable returns reflecting market conditions</li>
                <li>• No pressure, take your time</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
            <p className="text-blue-300 text-sm flex items-start gap-2">
              <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Remember:</strong> A Ponzi scheme pays &quot;returns&quot; using new investors&apos; money, 
                not real profits. When new money stops flowing in, the scheme collapses. 
                Always verify before you invest, and if something seems too good to be true, it probably is.
              </span>
            </p>
          </div>
        </div>

        {/* Play Again */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
