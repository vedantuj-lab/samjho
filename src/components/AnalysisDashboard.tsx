import React, { useState } from 'react';
import { 
  DocumentAnalysis, 
  Language, 
  Persona, 
  ActionItem,
  RedFlag
} from '../types.ts';
import { getDeadlineUrgency } from '../utils/dateUtils.ts';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  IndianRupee, 
  CheckSquare, 
  Square, 
  Plus, 
  Copy, 
  Check, 
  Printer, 
  RotateCcw, 
  Quote, 
  HelpCircle,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { AskSamjhoChat } from './AskSamjhoChat.tsx';

interface AnalysisDashboardProps {
  analysis: DocumentAnalysis;
  onUpdateAnalysis: (updated: DocumentAnalysis) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  persona: Persona;
  documentContext: string;
  onReset: () => void;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  analysis,
  onUpdateAnalysis,
  language,
  onLanguageChange,
  persona,
  documentContext,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [newActionText, setNewActionText] = useState('');
  const [newActionDueDate, setNewActionDueDate] = useState('');

  // Handle action toggle
  const toggleAction = (id: string) => {
    const updated = {
      ...analysis,
      actions: analysis.actions.map((act) =>
        act.id === id ? { ...act, completed: !act.completed } : act
      ),
    };
    onUpdateAnalysis(updated);
  };

  // Add custom action item
  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionText.trim()) return;

    const newAct: ActionItem = {
      id: `custom-act-${Date.now()}`,
      task: newActionText.trim(),
      dueDate: newActionDueDate.trim() || 'Custom To-Do',
      completed: false,
    };

    onUpdateAnalysis({
      ...analysis,
      actions: [...analysis.actions, newAct],
    });

    setNewActionText('');
    setNewActionDueDate('');
  };

  // Copy plain-text summary
  const handleCopySummary = () => {
    const textLines = [
      `SAMJHO (समझो) DOCUMENT SUMMARY`,
      `Type: ${analysis.documentType}`,
      `Overview: ${analysis.oneLiner}`,
      `Verdict: ${analysis.verdict.recommendation} (Clarity Score: ${analysis.verdict.clarityScore}/100)`,
      `Rationale: ${analysis.verdict.reason}`,
      ``,
      `KEY TAKEAWAYS:`,
      ...analysis.summaryBullets.map((b, i) => `${i + 1}. ${b}`),
      ``,
      `IMPORTANT DATES:`,
      ...analysis.deadlines.map((d) => `- ${d.date}: ${d.description}`),
      ``,
      `FINANCIAL BREAKDOWN:`,
      ...analysis.money.map((m) => `- ${m.amount} (${m.type}): ${m.description}`),
      ``,
      `RED FLAGS:`,
      ...analysis.redFlags.map((rf) => `[${rf.severity}] "${rf.clause}"\n-> ${rf.explanation}\n-> Why it matters: ${rf.whyItMatters}`),
      ``,
      `ACTION CHECKLIST:`,
      ...analysis.actions.map((a) => `[${a.completed ? 'x' : ' '}] ${a.task} (Due: ${a.dueDate})`),
      ``,
      `Analyzed with Samjho (Powered by Google Gemini Multimodal)`
    ].join('\n');

    navigator.clipboard.writeText(textLines).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const score = analysis.verdict.clarityScore;
  const scoreColor =
    score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-rose-500';
  const scoreBg =
    score >= 80 ? 'bg-emerald-500/10' : score >= 50 ? 'bg-amber-500/10' : 'bg-rose-500/10';
  const scoreBorder =
    score >= 80 ? 'border-emerald-500/30' : score >= 50 ? 'border-amber-500/30' : 'border-rose-500/30';

  const completedActions = analysis.actions.filter((a) => a.completed).length;
  const totalActions = analysis.actions.length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-10 space-y-8">
      {/* Top Action Toolbar (hidden during print) */}
      <div className="no-print flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Language quick toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Language:
          </span>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs font-medium">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded-md transition ${
                language === 'en'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-3 py-1 rounded-md transition ${
                language === 'hi'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-3 py-1 rounded-md transition ${
                language === 'mr'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            title="Export clean PDF or Print"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-500" />
            <span>Download PDF / Print</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Doc</span>
          </button>
        </div>
      </div>

      {/* Print-Only Header */}
      <div className="hidden print-only mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Samjho (समझो) — Document Analysis Report</h1>
        <p className="text-xs text-slate-500 mt-1">
          Generated on {new Date().toLocaleDateString()} • Powered by Google Gemini Multimodal
        </p>
      </div>

      {/* TOP VERDICT CARD */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${scoreBorder} bg-white dark:bg-slate-900 shadow-xl relative overflow-hidden break-inside-avoid`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Circular Clarity Score Gauge */}
          <div className="relative w-32 h-32 flex flex-col items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                className={`${scoreColor} transition-all duration-1000 ease-out`}
                strokeWidth="8"
                strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-3xl font-extrabold ${scoreColor}`}>
                {score}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                / 100 Clarity
              </span>
            </div>
          </div>

          {/* Verdict Details */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  score >= 80
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300'
                    : score >= 50
                    ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300'
                }`}
              >
                {score >= 80 ? (
                  <ShieldCheck className="w-3.5 h-3.5" />
                ) : score >= 50 ? (
                  <AlertTriangle className="w-3.5 h-3.5" />
                ) : (
                  <ShieldAlert className="w-3.5 h-3.5" />
                )}
                <span>{analysis.verdict.recommendation}</span>
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                {analysis.documentType}
              </span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 leading-snug">
              {analysis.verdict.reason}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
              "{analysis.oneLiner}"
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: Summary at a Glance */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4 break-inside-avoid">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. Summary at a Glance
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-2.5 pt-1">
          {analysis.summaryBullets.map((bullet, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Key Dates & Urgency Timeline */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4 break-inside-avoid">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. Key Dates & Urgency Timeline
            </h2>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            Ref Date: 18 Oct 2026
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {analysis.deadlines.map((dl, idx) => {
            const urgency = getDeadlineUrgency(dl.date);
            const isHighUrgency = dl.urgent || urgency.isUrgent;

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isHighUrgency
                    ? 'border-rose-400/80 bg-rose-50/50 dark:bg-rose-950/20 shadow-xs ring-1 ring-rose-400/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{dl.date}</span>
                    </span>
                    {isHighUrgency && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-500 text-white animate-pulse">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                    {dl.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold">
                  <span
                    className={
                      isHighUrgency
                        ? 'text-rose-600 dark:text-rose-400 font-bold'
                        : 'text-indigo-600 dark:text-indigo-400'
                    }
                  >
                    {urgency.statusLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: Money & Financial Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4 break-inside-avoid">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <IndianRupee className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. Money & Financial Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {analysis.money.map((item, idx) => {
            const isPenalty = item.type === 'Penalty';
            const isHidden = item.type === 'Hidden Fee';
            const isDeposit = item.type === 'Deposit';

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  isPenalty || isHidden
                    ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-950/20'
                    : isDeposit
                    ? 'border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {item.amount}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isPenalty
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : isHidden
                        ? 'bg-amber-200 text-amber-900 dark:bg-amber-900/80 dark:text-amber-200 font-extrabold'
                        : isDeposit
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: Red Flag Alert Box (Crucial Feature) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/60 p-6 sm:p-8 shadow-md space-y-5 break-inside-avoid">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                4. Red Flag Alert Box
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Risky clauses with exact quoted text and real-world consequences
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
            {analysis.redFlags.length} Flag{analysis.redFlags.length > 1 ? 's' : ''} Found
          </span>
        </div>

        <div className="space-y-4 pt-1">
          {analysis.redFlags.map((flag, idx) => {
            const isHigh = flag.severity === 'High';
            const isMed = flag.severity === 'Medium';

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isHigh
                    ? 'border-rose-300 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/20'
                    : isMed
                    ? 'border-amber-300 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/20'
                    : 'border-yellow-200 dark:border-yellow-900 bg-yellow-50/30 dark:bg-yellow-950/10'
                }`}
              >
                {/* Header with severity badge */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                      isHigh
                        ? 'bg-rose-600 text-white'
                        : isMed
                        ? 'bg-amber-500 text-white'
                        : 'bg-yellow-400 text-yellow-950'
                    }`}
                  >
                    {flag.severity} Severity Risk
                  </span>
                  <span className="text-xs text-slate-400">Flag #{idx + 1}</span>
                </div>

                {/* EXACT Verbatim Quoted Clause Callout */}
                <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xs mb-3">
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <blockquote className="text-xs sm:text-sm italic font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                      "{flag.clause}"
                    </blockquote>
                  </div>
                </div>

                {/* Plain-Language Explanation */}
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed">
                    <strong className="text-slate-900 dark:text-white">Explanation: </strong>
                    {flag.explanation}
                  </p>

                  {/* Why this matters callout */}
                  <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 flex items-start gap-2 text-xs text-indigo-950 dark:text-indigo-200">
                    <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-indigo-900 dark:text-indigo-300">
                        Why this matters to you:
                      </strong>{' '}
                      {flag.whyItMatters}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 5: Interactive Action Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4 break-inside-avoid">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                5. Interactive Action Checklist
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Check off tasks as you complete them before signing or paying
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>
              {completedActions} of {totalActions} done
            </span>
            <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${totalActions > 0 ? (completedActions / totalActions) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Task list */}
        <div className="space-y-2.5 pt-1">
          {analysis.actions.map((act) => (
            <div
              key={act.id}
              onClick={() => toggleAction(act.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                act.completed
                  ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-400 dark:text-slate-500'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-indigo-400 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {act.completed ? (
                  <CheckSquare className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400 hover:text-indigo-600 transition" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs sm:text-sm font-medium ${
                    act.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
                  }`}
                >
                  {act.task}
                </p>
                <span className="inline-block mt-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  Target: {act.dueDate}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add custom action input (hidden during print) */}
        <form
          onSubmit={handleAddAction}
          className="no-print pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            value={newActionText}
            onChange={(e) => setNewActionText(e.target.value)}
            placeholder="Add custom action step (e.g. Email landlord about 15-day refund window)..."
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={newActionDueDate}
            onChange={(e) => setNewActionDueDate(e.target.value)}
            placeholder="Due date (optional)"
            className="sm:w-36 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!newActionText.trim()}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Step</span>
          </button>
        </form>
      </div>

      {/* Pinned Ask Samjho Chat Assistant (hidden in print) */}
      <div className="no-print pt-2">
        <AskSamjhoChat
          documentContext={documentContext}
          suggestedQuestions={analysis.suggestedQuestions}
          language={language}
        />
      </div>
    </div>
  );
};
