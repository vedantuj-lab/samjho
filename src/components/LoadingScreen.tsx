import React, { useState, useEffect } from 'react';
import { Sparkles, FileSearch, ShieldAlert, CheckCircle2 } from 'lucide-react';

const MESSAGES = [
  { text: 'Reading the fine print...', subtext: 'Gemini multimodal parsing every line & clause' },
  { text: 'Translating legal jargon into plain language...', subtext: 'Demystifying dense bureaucratic clauses' },
  { text: 'Scanning for hidden fees and penalties...', subtext: 'Detecting unannounced deductions & forfeiture terms' },
  { text: 'Building your personalized action checklist...', subtext: 'Formulating step-by-step guidance before you sign' },
];

export const LoadingScreen: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Dynamic Animated Status Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-indigo-100 dark:border-indigo-950 p-8 shadow-xl text-center space-y-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Central Spinner & Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-950" />
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-amber-500 text-white flex items-center justify-center shadow-lg animate-pulse">
            <FileSearch className="w-8 h-8" />
          </div>
        </div>

        {/* Rotating Messages */}
        <div className="space-y-1.5 transition-all duration-300 min-h-[64px]">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <span>{MESSAGES[currentIdx].text}</span>
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {MESSAGES[currentIdx].subtext}
          </p>
        </div>

        {/* 4 Step Progress Pills */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {MESSAGES.map((msg, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === currentIdx
                  ? 'w-8 bg-indigo-600 dark:bg-indigo-400'
                  : i < currentIdx
                  ? 'w-2 bg-emerald-500'
                  : 'w-2 bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Realistic Skeleton Dashboard Loaders */}
      <div className="space-y-6 animate-pulse opacity-75">
        {/* Verdict Skeleton */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="flex-1 space-y-3 w-full">
            <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>
        </div>

        {/* 2-Column Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
