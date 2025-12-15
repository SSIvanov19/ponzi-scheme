'use client';

import { GameScores, PortfolioPosition } from '../lib/types';
import { getCardById } from '../lib/cards';
import { 
  DollarSign, 
  PiggyBank, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Target,
  Scale
} from 'lucide-react';

interface ScoreBoardProps {
  scores: GameScores;
  round: number;
  totalRounds: number;
  mode: 'investor' | 'regulator';
  portfolio?: PortfolioPosition[];
  playerCash?: number;
  actionPoints?: number;
}

export function ScoreBoard({ scores, round, totalRounds, mode, portfolio = [], playerCash = 0, actionPoints = 0 }: ScoreBoardProps) {
  const portfolioValue = portfolio.reduce((sum, p) => sum + p.currentValue, 0);
  
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">
            {mode === 'investor' ? 'Investor Progress' : 'Investigation Progress'}
          </span>
          <span className="text-sm text-slate-400">
            {round + 1} / {totalRounds} offers reviewed
          </span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${((round + 1) / totalRounds) * 100}%` }}
          />
        </div>
      </div>

      {/* Investor Mode: Show Portfolio */}
      {mode === 'investor' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-1">
              <DollarSign className="w-3 h-3" /> Cash
            </div>
            <div className="text-xl font-bold text-blue-400">
              ${playerCash.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-1">
              <PiggyBank className="w-3 h-3" /> Invested
            </div>
            <div className="text-xl font-bold text-purple-400">
              ${portfolioValue.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-1">
              <TrendingUp className="w-3 h-3" /> Net Worth
            </div>
            <div className={`text-xl font-bold ${scores.netWorth >= 10000 ? 'text-green-400' : 'text-red-400'}`}>
              ${scores.netWorth.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-1">
              <Zap className="w-3 h-3" /> Action Points
            </div>
            <div className="text-xl font-bold text-yellow-400">
              {actionPoints}
            </div>
          </div>
        </div>
      )}

      {/* Regulator Mode: Show Investigation Stats */}
      {mode === 'regulator' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-1">
              <ShieldCheck className="w-3 h-3" /> Scams Caught
            </div>
            <div className="text-xl font-bold text-green-400">
              {scores.ponzisCaught || 0}
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-1">
              <Target className="w-3 h-3" /> Evidence Quality
            </div>
            <div className={`text-xl font-bold ${scores.evidenceQuality >= 0 ? 'text-purple-400' : 'text-red-400'}`}>
              {scores.evidenceQuality}
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mb-1">
              <Scale className="w-3 h-3" /> False Positives
            </div>
            <div className="text-xl font-bold text-orange-400">
              {scores.legitMissed || 0}
            </div>
          </div>
        </div>
      )}

      {/* Active Investments (collapsed) */}
      {mode === 'investor' && portfolio.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="text-xs text-slate-400 mb-2">Active Investments ({portfolio.length})</div>
          <div className="flex flex-wrap gap-2">
            {portfolio.slice(0, 5).map((pos) => {
              const card = getCardById(pos.cardId);
              const gain = pos.currentValue - pos.investedAmount;
              return (
                <div 
                  key={pos.cardId} 
                  className="bg-slate-700 rounded px-2 py-1 text-xs flex items-center gap-1"
                  title={card?.title}
                >
                  <span className="text-slate-300 max-w-20 truncate">{card?.title.slice(0, 15)}...</span>
                  <span className={gain >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {gain >= 0 ? '+' : ''}{((gain / pos.investedAmount) * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
            {portfolio.length > 5 && (
              <div className="bg-slate-700 rounded px-2 py-1 text-xs text-slate-400">
                +{portfolio.length - 5} more
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
