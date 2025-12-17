'use client';

import { InvestorDecision, PortfolioPosition } from '../lib/types';
import { useState } from 'react';
import { 
  TrendingUp, 
  X, 
  AlertTriangle, 
  DollarSign,
  Wallet,
  PiggyBank,
  Banknote
} from 'lucide-react';
import { getCardById } from '../lib/cards';

interface DecisionPanelProps {
  playerCash: number;
  currentInvestment: number;
  onDecision: (decision: InvestorDecision, amount?: number, sellCardId?: string) => void;
  onSellPosition?: (cardId: string) => void;
  disabled?: boolean;
  canReport?: boolean;
  portfolio?: PortfolioPosition[];
}

export function DecisionPanel({ 
  playerCash, 
  currentInvestment, 
  onDecision,
  onSellPosition,
  disabled,
  canReport = true,
  portfolio = [],
}: DecisionPanelProps) {
  const [investAmount, setInvestAmount] = useState(1000);

  const handleInvest = (decision: 'invest' | 'investMore') => {
    if (investAmount > 0 && investAmount <= playerCash) {
      onDecision(decision, investAmount);
    }
  };

  const handleSellPosition = (cardId: string) => {
    if (onSellPosition) {
      onSellPosition(cardId);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Make Your Decision</h3>

      {/* Cash Display */}
      <div className="flex justify-between items-center mb-4 p-3 bg-slate-900 rounded-lg">
        <div>
          <div className="flex items-center gap-1 text-sm text-slate-400">
            <Wallet className="w-4 h-4" />
            Available Cash
          </div>
          <div className="text-2xl font-bold text-green-400">${playerCash.toLocaleString()}</div>
        </div>
        {currentInvestment > 0 && (
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-slate-400 justify-end">
              <PiggyBank className="w-4 h-4" />
              In This Fund
            </div>
            <div className="text-xl font-bold text-blue-400">${currentInvestment.toLocaleString()}</div>
          </div>
        )}
      </div>

      {/* Portfolio Sell Section */}
      {portfolio.length > 0 && (
        <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
            <Banknote className="w-4 h-4" />
            Your Portfolio - Sell Positions
          </div>
          <div className="space-y-2">
            {portfolio.map((position) => {
              const card = getCardById(position.cardId);
              const profit = position.currentValue - position.investedAmount;
              const profitPct = ((profit / position.investedAmount) * 100).toFixed(1);
              return (
                <div key={position.cardId} className="flex items-center justify-between bg-slate-800 rounded-lg p-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">{card?.title || position.cardId}</div>
                    <div className="text-xs text-slate-400">
                      Invested: ${position.investedAmount.toLocaleString()} → ${position.currentValue.toLocaleString()}
                      <span className={profit >= 0 ? 'text-green-400 ml-1' : 'text-red-400 ml-1'}>
                        ({profit >= 0 ? '+' : ''}{profitPct}%)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSellPosition(position.cardId)}
                    disabled={disabled}
                    className="ml-2 px-3 py-1.5 bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed rounded text-xs font-medium text-white flex items-center gap-1"
                  >
                    <DollarSign className="w-3 h-3" />
                    Sell
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Investment Amount */}
      <div className="mb-4">
        <label className="text-sm text-slate-400 mb-2 block">Investment Amount</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={investAmount}
            onChange={(e) => setInvestAmount(Math.max(0, parseInt(e.target.value) || 0))}
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            min={0}
            max={playerCash}
          />
          <button
            onClick={() => setInvestAmount(Math.floor(playerCash * 0.25))}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300"
          >
            25%
          </button>
          <button
            onClick={() => setInvestAmount(Math.floor(playerCash * 0.5))}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300"
          >
            50%
          </button>
          <button
            onClick={() => setInvestAmount(playerCash)}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300"
          >
            All
          </button>
        </div>
      </div>

      {/* Main Actions */}
      <div className="space-y-3">
        <div className="text-xs text-slate-500 uppercase tracking-wide">Investment Actions</div>
        <div className="grid grid-cols-1 gap-3">
          {/* Invest / Invest More */}
          {currentInvestment === 0 ? (
            <button
              onClick={() => handleInvest('invest')}
              disabled={disabled || investAmount <= 0 || investAmount > playerCash}
              className="w-full p-3 rounded-lg transition-all bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="font-medium text-white">Invest</span>
              </div>
              <p className="text-xs text-white/70 mt-1 text-center">Put money into this offer</p>
            </button>
          ) : (
            <button
              onClick={() => handleInvest('investMore')}
              disabled={disabled || investAmount <= 0 || investAmount > playerCash}
              className="w-full p-3 rounded-lg transition-all bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="font-medium text-white">Invest More</span>
              </div>
              <p className="text-xs text-white/70 mt-1 text-center">Add more money to this fund</p>
            </button>
          )}

          {/* Walk Away */}
          <button
            onClick={() => onDecision('walkAway')}
            disabled={disabled}
            className="w-full p-3 rounded-lg transition-all bg-slate-600 hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2">
              <X className="w-5 h-5 text-white" />
              <span className="font-medium text-white">Walk Away</span>
            </div>
            <p className="text-xs text-white/70 mt-1 text-center">Skip this offer entirely</p>
          </button>
        </div>

        {/* Report Action */}
        <div className="pt-3 border-t border-slate-700">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Report Suspicious Activity</div>
          <button
            onClick={() => onDecision('report')}
            disabled={disabled || !canReport}
            className="w-full p-3 rounded-lg transition-all bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed relative"
          >
            {!canReport && (
              <div className="absolute inset-0 bg-slate-900/80 rounded-lg flex items-center justify-center">
                <span className="text-xs text-slate-400">Already reported</span>
              </div>
            )}
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5 text-white" />
              <span className="font-medium text-white">Report to Authorities</span>
            </div>
            <p className="text-xs text-white/70 mt-1 text-center">
              Correct report: +1 AP | False report: -2 AP
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
