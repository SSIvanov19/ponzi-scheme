'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { OfferCard, REFERRAL_LABELS } from '../lib/types';
import { formatReturn } from '../lib/cards';
import { 
  Search, 
  Lightbulb, 
  FileText, 
  Building2, 
  ArrowDownToLine, 
  BadgeCheck,
  ClipboardCheck
} from 'lucide-react';

interface OfferCardDisplayProps {
  card: OfferCard;
  revealedChecks?: Record<string, string>;
  showBasicInfo?: boolean; // Show docs/registration by default, or require investigation
}

export function OfferCardDisplay({ card, revealedChecks = {}, showBasicInfo = false }: OfferCardDisplayProps) {
  const chartData = card.returnHistoryMonthlyPct.map((value, index) => ({
    month: `M${index + 1}`,
    return: value,
  }));

  const getDocsBadge = (level: number) => {
    const labels = ['None', 'Minimal', 'Partial', 'Full'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    return (
      <span className={`px-2 py-1 rounded text-xs text-white ${colors[level]}`}>
        {labels[level]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      registered: 'bg-green-500',
      verified: 'bg-green-500',
      not_found: 'bg-red-500',
      unknown: 'bg-gray-500',
    };
    const labels: Record<string, string> = {
      registered: 'Registered',
      verified: 'Verified',
      not_found: 'Not Found',
      unknown: 'Unknown',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs text-white ${colors[status] || 'bg-gray-500'}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-2">{card.title}</h2>
        <p className="text-blue-300 text-lg italic">&quot;{card.pitch}&quot;</p>
      </div>

      {/* Promised Return */}
      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Promised Return:</span>
          <span className={`text-xl font-bold ${card.promisedReturn.guaranteed ? 'text-yellow-400' : 'text-green-400'}`}>
            {formatReturn(card.promisedReturn)}
          </span>
        </div>
      </div>

      {/* Return History Chart */}
      <div className="mb-4">
        <h3 className="text-sm text-slate-400 mb-2">12-Month Return History (%)</h3>
        <div className="bg-slate-900 rounded-lg p-2 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="returnGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area
                type="monotone"
                dataKey="return"
                stroke="#3b82f6"
                fill="url(#returnGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Referral Context - always visible (how you heard about it) */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-slate-400">How you heard about it:</span>
        <span className="text-sm text-blue-300">{REFERRAL_LABELS[card.referralContext]}</span>
      </div>

      {/* Basic Info - only shown after investigation or in regulator mode */}
      {showBasicInfo && (
        <div className="grid grid-cols-2 gap-4 mb-4 bg-slate-900/50 rounded-lg p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Documents:</span>
              {getDocsBadge(card.docsLevel)}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Registration:</span>
              {getStatusBadge(card.registrationStatus)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Seller License:</span>
              {getStatusBadge(card.sellerLicenseStatus)}
            </div>
          </div>
        </div>
      )}

      {/* Revealed Check Results */}
      {Object.keys(revealedChecks).length > 0 && (
        <div className="mt-4 border-t border-slate-700 pt-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
            <Search className="w-4 h-4" />
            Investigation Results:
          </h3>
          <div className="space-y-2">
            {Object.entries(revealedChecks).map(([action, result]) => {
              // Determine if this result is concerning
              const isConcerning = result.toLowerCase().includes('not found') ||
                result.toLowerCase().includes('no ') ||
                result.toLowerCase().includes('refuses') ||
                result.toLowerCase().includes('vague') ||
                result.toLowerCase().includes('delayed') ||
                result.toLowerCase().includes('blocked') ||
                result.toLowerCase().includes('pending');
              
              const { icon, label } = getActionDisplay(action);
              
              return (
                <div key={action} className={`rounded p-3 ${isConcerning ? 'bg-red-900/30 border border-red-700/50' : 'bg-slate-900'}`}>
                  <div className={`flex items-center gap-2 text-xs font-medium mb-1 ${isConcerning ? 'text-red-400' : 'text-blue-400'}`}>
                    {icon}
                    {label}
                  </div>
                  <div className={`text-sm ${isConcerning ? 'text-red-200' : 'text-slate-300'}`}>{result}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hint to investigate if no results yet */}
      {Object.keys(revealedChecks).length === 0 && (
        <div className="mt-4 text-center text-slate-500 text-sm italic">
          Use your Action Points to investigate this opportunity before deciding
        </div>
      )}
    </div>
  );
}

function getActionDisplay(action: string): { icon: React.ReactNode; label: string } {
  const displays: Record<string, { icon: React.ReactNode; label: string }> = {
    askSourceOfReturns: { icon: <Lightbulb className="w-4 h-4" />, label: 'Asked About Source of Returns' },
    requestDocs: { icon: <FileText className="w-4 h-4" />, label: 'Requested Documentation' },
    verifyAssets: { icon: <Building2 className="w-4 h-4" />, label: 'Verified Assets' },
    testWithdrawal: { icon: <ArrowDownToLine className="w-4 h-4" />, label: 'Tested Withdrawal' },
    checkRegistration: { icon: <ClipboardCheck className="w-4 h-4" />, label: 'Checked Registration' },
    checkLicense: { icon: <BadgeCheck className="w-4 h-4" />, label: 'Checked License' },
  };
  return displays[action] || { icon: <Search className="w-4 h-4" />, label: action.replace(/([A-Z])/g, ' $1').trim() };
}

