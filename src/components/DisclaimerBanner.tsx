import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="w-full bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-900 dark:text-amber-200">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
        <span>
          <strong>⚠️ Disclaimer:</strong> Samjho provides automated AI summaries for informational purposes only. It is not legal or financial advice. For critical decisions, consult a qualified advocate or advisor.
        </span>
      </div>
    </div>
  );
};
