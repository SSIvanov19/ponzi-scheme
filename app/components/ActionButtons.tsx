'use client';

import { InvestorAction, ACTION_COSTS } from '../lib/types';
import { 
  ClipboardCheck, 
  BadgeCheck, 
  FileText, 
  Search, 
  ArrowDownToLine, 
  HelpCircle,
  Zap,
  Check
} from 'lucide-react';
import { ReactNode } from 'react';

interface ActionButtonsProps {
  actionPoints: number;
  actionsPerformed: InvestorAction[];
  onAction: (action: InvestorAction) => void;
  disabled?: boolean;
}

const ACTION_INFO: Record<InvestorAction, { label: string; icon: ReactNode; description: string }> = {
  checkRegistration: {
    label: 'Check Registration',
    icon: <ClipboardCheck className="w-5 h-5" />,
    description: 'Verify if product is registered with regulators',
  },
  checkLicense: {
    label: 'Check License',
    icon: <BadgeCheck className="w-5 h-5" />,
    description: 'Verify seller credentials and authorization',
  },
  requestDocs: {
    label: 'Request Documents',
    icon: <FileText className="w-5 h-5" />,
    description: 'Ask for prospectus, audited financials, custodian info',
  },
  verifyAssets: {
    label: 'Verify Assets',
    icon: <Search className="w-5 h-5" />,
    description: 'Confirm underlying assets actually exist',
  },
  testWithdrawal: {
    label: 'Test Withdrawal',
    icon: <ArrowDownToLine className="w-5 h-5" />,
    description: 'Try a small withdrawal to check for friction',
  },
  askSourceOfReturns: {
    label: 'Ask Source of Returns',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'Ask where the promised returns come from',
  },
};

export function ActionButtons({ actionPoints, actionsPerformed, onAction, disabled }: ActionButtonsProps) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Investigation Actions</h3>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-slate-400">AP:</span>
          <span className="text-xl font-bold text-yellow-400">{actionPoints}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(ACTION_INFO) as InvestorAction[]).map((action) => {
          const info = ACTION_INFO[action];
          const cost = ACTION_COSTS[action];
          const performed = actionsPerformed.includes(action);
          const canAfford = actionPoints >= cost;
          const isDisabled = disabled || performed || !canAfford;

          return (
            <button
              key={action}
              onClick={() => onAction(action)}
              disabled={isDisabled}
              className={`p-3 rounded-lg text-left transition-all ${
                performed
                  ? 'bg-green-900/30 border-2 border-green-500'
                  : isDisabled
                  ? 'bg-slate-700/50 opacity-50 cursor-not-allowed'
                  : 'bg-slate-700 hover:bg-slate-600 hover:border-blue-500 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-400">{info.icon}</span>
                <span className="font-medium text-white text-sm">{info.label}</span>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded ${
                  cost === 2 ? 'bg-orange-500/30 text-orange-300' : 'bg-blue-500/30 text-blue-300'
                }`}>
                  {cost} AP
                </span>
              </div>
              <p className="text-xs text-slate-400">{info.description}</p>
              {performed && (
                <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
                  <Check className="w-3 h-3" /> Completed
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
