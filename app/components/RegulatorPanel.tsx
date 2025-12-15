'use client';

import { RegulatorTest, RegulatorLabel } from '../lib/types';
import {
  ClipboardCheck,
  Megaphone,
  BarChart3,
  Lock,
  Timer,
  CheckCircle,
  Eye,
  ShieldAlert,
  Check
} from 'lucide-react';

interface RegulatorPanelProps {
  budget: number;
  testsPerformed: RegulatorTest[];
  onTest: (test: RegulatorTest) => void;
  onLabel: (label: RegulatorLabel) => void;
  disabled?: boolean;
}

const TEST_INFO: Record<RegulatorTest, { label: string; icon: React.ReactNode; description: string }> = {
  isRegistered: {
    label: 'Registration Check',
    icon: <ClipboardCheck className="w-5 h-5" />,
    description: 'Is this product registered/authorized?',
  },
  marketingGuarantees: {
    label: 'Marketing Analysis',
    icon: <Megaphone className="w-5 h-5" />,
    description: 'Is marketing making guarantee claims?',
  },
  returnsConsistent: {
    label: 'Returns Analysis',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Are returns implausibly consistent?',
  },
  custodyVerifiable: {
    label: 'Custody Verification',
    icon: <Lock className="w-5 h-5" />,
    description: 'Can asset custody be verified?',
  },
  withdrawalsDelayed: {
    label: 'Withdrawal Test',
    icon: <Timer className="w-5 h-5" />,
    description: 'Are withdrawals being delayed?',
  },
};

const LABEL_INFO: Record<RegulatorLabel, { label: string; icon: React.ReactNode; color: string }> = {
  clear: {
    label: 'Clear',
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'bg-green-600 hover:bg-green-500',
  },
  watchlist: {
    label: 'Watchlist',
    icon: <Eye className="w-6 h-6" />,
    color: 'bg-yellow-600 hover:bg-yellow-500',
  },
  enforcement: {
    label: 'Enforcement',
    icon: <ShieldAlert className="w-6 h-6" />,
    color: 'bg-red-600 hover:bg-red-500',
  },
};

export function RegulatorPanel({ budget, testsPerformed, onTest, onLabel, disabled }: RegulatorPanelProps) {
  return (
    <div className="space-y-4">
      {/* Budget Display */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Investigation Budget</h3>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Tests Remaining:</span>
            <div className="flex gap-1">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    i < budget
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-600 text-slate-400'
                  }`}
                >
                  {i < budget ? '●' : '○'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="grid grid-cols-1 gap-2">
          {(Object.keys(TEST_INFO) as RegulatorTest[]).map((test) => {
            const info = TEST_INFO[test];
            const performed = testsPerformed.includes(test);
            const isDisabled = disabled || performed || budget <= 0;

            return (
              <button
                key={test}
                onClick={() => onTest(test)}
                disabled={isDisabled}
                className={`p-3 rounded-lg text-left transition-all ${
                  performed
                    ? 'bg-green-900/30 border-2 border-green-500'
                    : isDisabled
                    ? 'bg-slate-700/50 opacity-50 cursor-not-allowed'
                    : 'bg-slate-700 hover:bg-slate-600 hover:border-blue-500 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">{info.icon}</span>
                  <span className="font-medium text-white text-sm">{info.label}</span>
                  {performed && <span className="ml-auto text-green-400 text-sm flex items-center gap-1"><Check className="w-4 h-4" /> Done</span>}
                </div>
                <p className="text-xs text-slate-400 mt-1">{info.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Label Decision */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Your Decision</h3>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(LABEL_INFO) as RegulatorLabel[]).map((label) => {
            const info = LABEL_INFO[label];
            return (
              <button
                key={label}
                onClick={() => onLabel(label)}
                disabled={disabled}
                className={`p-4 rounded-lg transition-all ${info.color} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex justify-center mb-1 text-white">{info.icon}</div>
                <div className="font-medium text-white">{info.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
