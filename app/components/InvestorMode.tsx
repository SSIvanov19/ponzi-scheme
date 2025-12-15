'use client';

import { useGame } from '../lib/GameContext';
import { OfferCardDisplay } from './OfferCard';
import { ActionButtons } from './ActionButtons';
import { DecisionPanel } from './DecisionPanel';
import { TeachingPopup } from './TeachingPopup';
import { ScoreBoard } from './ScoreBoard';
import { getCardById } from '../lib/cards';
import { InvestorAction, RoundSummary, PortfolioPosition } from '../lib/types';
import { 
  PartyPopper, 
  Banknote, 
  Gamepad2, 
  Target, 
  Calendar,
  AlertTriangle,
  DollarSign,
  Zap
} from 'lucide-react';

export function InvestorMode() {
  const {
    state,
    currentCard,
    performAction,
    makeDecision,
    nextRound,
    hideTeaching,
    dismissSummary,
    goToResults,
    totalCards,
  } = useGame();

  // Get revealed check results - generate defaults for registration/license if not defined
  const revealedChecks: Record<string, string> = {};
  state.actionsThisRound.forEach((action: InvestorAction) => {
    const explicitResult = currentCard?.checkResults[action as keyof typeof currentCard.checkResults];
    if (explicitResult) {
      revealedChecks[action] = explicitResult;
    } else if (currentCard && action === 'checkRegistration') {
      // Generate default result based on card's registrationStatus
      if (currentCard.registrationStatus === 'registered') {
        revealedChecks[action] = 'Product is properly registered with financial regulators. Offering documents on file.';
      } else if (currentCard.registrationStatus === 'not_found') {
        revealedChecks[action] = 'No registration found. This offering is not registered with any financial regulator—a serious red flag.';
      } else {
        revealedChecks[action] = 'Registration status unclear. Could be a private placement or unregistered offering.';
      }
    } else if (currentCard && action === 'checkLicense') {
      // Generate default result based on card's sellerLicenseStatus
      if (currentCard.sellerLicenseStatus === 'verified') {
        revealedChecks[action] = 'Seller is properly licensed and in good standing with regulatory authorities.';
      } else if (currentCard.sellerLicenseStatus === 'not_found') {
        revealedChecks[action] = 'Seller license not found. This person is not registered to sell securities—do not invest.';
      } else {
        revealedChecks[action] = 'Unable to verify seller credentials. They may be operating without proper licensing.';
      }
    }
  });

  // Check if investor mode is complete
  if (state.investorCompleted) {
    const startingCash = 10000;
    const finalNetWorth = state.scores.netWorth;
    const returnPct = ((finalNetWorth - startingCash) / startingCash * 100).toFixed(1);
    const isProfit = finalNetWorth >= startingCash;

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
            <div className="flex justify-center mb-4">
              {isProfit ? (
                <PartyPopper className="w-16 h-16 text-yellow-400" />
              ) : (
                <Banknote className="w-16 h-16 text-red-400" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Investor Mode Complete!</h1>
            <p className="text-slate-300 mb-6">
              You&apos;ve navigated {totalCards} investment opportunities over {state.currentMonth} months.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-900 rounded-lg p-4">
                <div className={`text-2xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  ${finalNetWorth.toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">Final Net Worth</div>
                <div className={`text-xs ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                  {isProfit ? '+' : ''}{returnPct}% from start
                </div>
              </div>
              <div className="bg-slate-900 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400 flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  {state.actionPoints}
                </div>
                <div className="text-sm text-slate-400">Remaining AP</div>
                <div className="text-xs text-slate-500">Action Points left</div>
              </div>
            </div>

            {/* Summary of Ponzi exposure */}
            {Array.from(state.ponziCollapsed).length > 0 && (
              <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 mb-6 text-left">
                <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Schemes That Collapsed:
                </h3>
                <ul className="text-sm text-red-200 space-y-1">
                  {[...state.ponziCollapsed].map((cardId) => {
                    const card = getCardById(cardId);
                    return <li key={cardId}>• {card?.title || cardId}</li>;
                  })}
                </ul>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={goToResults}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
              >
                View Detailed Results
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  }

  const currentInvestment = state.portfolio.find((p: PortfolioPosition) => p.cardId === currentCard.id)?.currentValue || 0;
  const hasDecided = state.investorResults.some((r: { cardId: string }) => r.cardId === currentCard.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header with Goal */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Gamepad2 className="w-6 h-6 text-blue-400" />
              Ponzi Investor - <span className="text-blue-400">Investor Mode</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
              <Target className="w-4 h-4" />
              Goal: Maximize your net worth while avoiding scams. Starting: $10,000
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-white flex items-center gap-2 justify-end">
              <Calendar className="w-5 h-5 text-slate-400" />
              Month {state.currentMonth}
            </div>
            <div className="text-sm text-slate-400">Round {state.investorRound + 1} of {totalCards}</div>
          </div>
        </div>

        {/* Score Board */}
        <ScoreBoard
          scores={state.scores}
          round={state.investorRound}
          totalRounds={totalCards}
          mode="investor"
          portfolio={state.portfolio}
          playerCash={state.playerCash}
          actionPoints={state.actionPoints}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Offer Card */}
          <OfferCardDisplay
            card={currentCard}
            revealedChecks={revealedChecks}
            showBasicInfo={false}
          />

          {/* Actions & Decisions */}
          <div className="space-y-4">
            <ActionButtons
              actionPoints={state.actionPoints}
              actionsPerformed={state.actionsThisRound}
              onAction={(action: InvestorAction) => performAction(action)}
              disabled={hasDecided}
            />
            <DecisionPanel
              playerCash={state.playerCash}
              currentInvestment={currentInvestment}
              onDecision={makeDecision}
              disabled={hasDecided}
              canReport={!state.reportedCards.has(currentCard.id)}
              portfolio={state.portfolio}
            />
          </div>
        </div>

        {/* Round Summary Modal */}
        {state.roundSummary && !state.showTeachingPopup && (
          <RoundSummaryModal
            summary={state.roundSummary}
            onContinue={dismissSummary}
          />
        )}

        {/* Teaching Popup */}
        {state.showTeachingPopup && (
          <TeachingPopup
            tags={state.currentTeachingTags}
            cardTitle={currentCard.title}
            hiddenTruth={currentCard.hiddenTruth}
            onClose={() => {
              hideTeaching();
              nextRound();
            }}
          />
        )}
      </div>
    </div>
  );
}

// Round Summary Modal Component
import { BarChart3, Bomb } from 'lucide-react';

function RoundSummaryModal({ summary, onContinue }: { 
  summary: RoundSummary;
  onContinue: () => void;
}) {
  const totalReturn = summary.portfolioReturns.reduce((sum: number, r: { returnAmount: number }) => sum + r.returnAmount, 0);
  const hasCollapse = summary.portfolioReturns.some((r: { collapsed: boolean }) => r.collapsed);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-lg w-full border border-slate-700 shadow-2xl">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            Month {summary.month} Summary
          </h2>

          {/* Decision */}
          <div className="bg-slate-900 rounded-lg p-3 mb-4">
            <div className="text-sm text-slate-400">Your Decision</div>
            <div className="text-white font-medium">{summary.decisionMade}</div>
          </div>

          {/* Portfolio Returns */}
          {summary.portfolioReturns.length > 0 && (
            <div className="mb-4">
              <div className="text-sm text-slate-400 mb-2">Portfolio Activity This Month</div>
              <div className="space-y-2">
                {summary.portfolioReturns.map((pr: { cardId: string; returnAmount: number; collapsed: boolean }, i: number) => {
                  const card = getCardById(pr.cardId);
                  return (
                    <div 
                      key={i} 
                      className={`rounded p-2 text-sm ${
                        pr.collapsed 
                          ? 'bg-red-900/50 border border-red-700' 
                          : pr.returnAmount >= 0 
                          ? 'bg-green-900/30 border border-green-700/50'
                          : 'bg-red-900/30 border border-red-700/50'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className={pr.collapsed ? 'text-red-300' : 'text-slate-300'}>
                          {card?.title.slice(0, 30)}...
                        </span>
                        <span className={`font-medium flex items-center gap-1 ${
                          pr.collapsed ? 'text-red-400' : pr.returnAmount >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {pr.collapsed ? (
                            <>
                              <Bomb className="w-4 h-4" />
                              COLLAPSED!
                            </>
                          ) : (
                            `${pr.returnAmount >= 0 ? '+' : ''}$${pr.returnAmount.toFixed(0)}`
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={`text-right mt-2 font-semibold ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                Net: {totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(0)}
              </div>
            </div>
          )}

          {/* Warning for collapse */}
          {hasCollapse && (
            <div className="bg-red-900/50 border border-red-600 rounded-lg p-3 mb-4">
              <div className="text-red-300 text-sm flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                One or more of your investments has collapsed! This is what happens when Ponzi schemes run out of new investor money.
              </div>
            </div>
          )}

          {/* Net Worth */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-900 rounded-lg p-3 text-center">
              <div className="text-sm text-slate-400 flex items-center justify-center gap-1">
                <DollarSign className="w-4 h-4" />
                Cash
              </div>
              <div className="text-xl font-bold text-blue-400">${summary.cashOnHand.toLocaleString()}</div>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 text-center">
              <div className="text-sm text-slate-400">Net Worth</div>
              <div className="text-xl font-bold text-green-400">${summary.netWorth.toLocaleString()}</div>
            </div>
          </div>

          <button
            onClick={onContinue}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Continue to Lesson
          </button>
        </div>
      </div>
    </div>
  );
}
