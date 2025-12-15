'use client';

import { TeachingTag, TEACHING_CONTENT } from '../lib/types';
import {
  BookOpen,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

interface TeachingPopupProps {
  tags: TeachingTag[];
  onClose: () => void;
  cardTitle?: string;
  hiddenTruth?: string;
}

export function TeachingPopup({ tags, onClose, cardTitle, hiddenTruth }: TeachingPopupProps) {
  const getTruthLabel = (truth: string) => {
    const labels: Record<string, { text: string; color: string; icon: React.ReactNode }> = {
      ponzi: { text: 'PONZI SCHEME', color: 'text-red-400', icon: <ShieldAlert className="w-6 h-6" /> },
      legit: { text: 'LEGITIMATE', color: 'text-green-400', icon: <CheckCircle className="w-6 h-6" /> },
      pyramid_like_or_ponzi: { text: 'PYRAMID/PONZI', color: 'text-red-400', icon: <ShieldAlert className="w-6 h-6" /> },
      unclear_high_risk_not_necessarily_ponzi: { text: 'HIGH RISK (Not necessarily fraud)', color: 'text-yellow-400', icon: <AlertTriangle className="w-6 h-6" /> },
      ponzi_or_unregistered_fraud: { text: 'LIKELY FRAUD', color: 'text-red-400', icon: <ShieldAlert className="w-6 h-6" /> },
      speculative_not_ponzi: { text: 'SPECULATIVE (Not fraud)', color: 'text-yellow-400', icon: <AlertTriangle className="w-6 h-6" /> },
      can_mimic_ponzi_dynamics: { text: 'PONZI-LIKE DYNAMICS', color: 'text-orange-400', icon: <AlertCircle className="w-6 h-6" /> },
    };
    return labels[truth] || { text: truth, color: 'text-slate-400', icon: <AlertCircle className="w-6 h-6" /> };
  };

  const getContentStyle = (content: string) => {
    if (content.startsWith('[RED FLAG]') || content.startsWith('[FLAG]')) {
      return 'bg-red-900/30 border border-red-800';
    } else if (content.startsWith('[GOOD SIGN]') || content.startsWith('[CLEAR]')) {
      return 'bg-green-900/30 border border-green-800';
    } else {
      return 'bg-yellow-900/30 border border-yellow-800';
    }
  };

  const truth = hiddenTruth ? getTruthLabel(hiddenTruth) : null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-slate-600 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-400" />
            What You Should Know
          </h2>
          {cardTitle && (
            <p className="text-sm text-slate-400 mt-1">About: {cardTitle}</p>
          )}
        </div>

        {/* Truth Reveal */}
        {truth && (
          <div className="p-4 border-b border-slate-700 bg-slate-900/50">
            <div className="text-sm text-slate-400 mb-1">The Truth:</div>
            <div className={`text-xl font-bold ${truth.color} flex items-center gap-2`}>
              {truth.icon}
              {truth.text}
            </div>
          </div>
        )}

        {/* Teaching Content */}
        <div className="p-4 space-y-3">
          {tags.map((tag) => (
            <div
              key={tag}
              className={`p-4 rounded-lg ${getContentStyle(TEACHING_CONTENT[tag])}`}
            >
              <p className="text-slate-200">{TEACHING_CONTENT[tag]}</p>
            </div>
          ))}
        </div>

        {/* Educational Summary */}
        <div className="p-4 border-t border-slate-700 bg-slate-900/50">
          <div className="text-sm text-blue-300 italic flex items-start gap-2">
            <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>
              Remember: A Ponzi scheme pays &quot;returns&quot; using new investors&apos; money, not real profits. 
              When new money slows down, the scheme collapses.
            </span>
          </div>
        </div>

        {/* Close Button */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
