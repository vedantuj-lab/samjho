import React, { useState } from 'react';
import { 
  UserProfile, 
  UserRole, 
  Language, 
  Persona, 
  DocumentAnalysis,
  SampleDoc 
} from '../types.ts';
import { ROLE_SPECS } from '../data/mockUsers.ts';
import { SAMPLE_DOCS } from '../data/sampleDocuments.ts';
import { UploadSection } from './UploadSection.tsx';
import { AnalysisDashboard } from './AnalysisDashboard.tsx';
import { LoadingScreen } from './LoadingScreen.tsx';
import { 
  Sparkles, 
  GraduationCap, 
  Home, 
  Zap, 
  Scale, 
  FileText, 
  ShieldCheck, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle,
  Send,
  MessageSquare,
  Bookmark,
  ChevronRight,
  Printer
} from 'lucide-react';

interface RoleDashboardProps {
  user: UserProfile;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  persona: Persona;
  onPersonaChange: (p: Persona) => void;
  isLoading: boolean;
  analysis: DocumentAnalysis | null;
  onAnalyze: (payload: { text?: string; fileData?: string; mimeType?: string; sampleDoc?: SampleDoc }) => void;
  onUpdateAnalysis: (a: DocumentAnalysis) => void;
  documentContext: string;
  onResetAnalysis: () => void;
  onOpenVoiceAssistant: () => void;
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({
  user,
  onSwitchRole,
  onLogout,
  language,
  onLanguageChange,
  persona,
  onPersonaChange,
  isLoading,
  analysis,
  onAnalyze,
  onUpdateAnalysis,
  documentContext,
  onResetAnalysis,
  onOpenVoiceAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<'decoder' | 'toolkit' | 'saved'>('decoder');
  const [copiedDraftKey, setCopiedDraftKey] = useState<string | null>(null);

  const roleSpec = ROLE_SPECS[user.role];

  const handleCopyDraft = (key: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedDraftKey(key);
      setTimeout(() => setCopiedDraftKey(null), 2500);
    });
  };

  // Mock saved docs library
  const savedDocs = [
    {
      id: 'doc-1',
      title: user.role === 'student' ? 'College Term 2 Fee Circular' : user.role === 'renter' ? 'Andheri West Rental Lease' : 'MSEDCL September Electricity Bill',
      date: '18 Oct 2026',
      score: user.role === 'student' ? 68 : user.role === 'renter' ? 42 : 82,
      recommendation: user.role === 'student' ? 'Proceed with Caution' : user.role === 'renter' ? 'Needs Revision' : 'Safe to Proceed',
      category: user.role === 'student' ? 'College Notice' : user.role === 'renter' ? 'Rental Agreement' : 'Utility Notice',
    },
    {
      id: 'doc-2',
      title: 'Monsoon Hostel Utility Surcharge Notice',
      date: '14 Oct 2026',
      score: 55,
      recommendation: 'Proceed with Caution',
      category: 'Campus Circular',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Personalized Role Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${roleSpec.gradient} text-white shadow-xl relative overflow-hidden`}>
        {/* Ambient subtle light circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          {/* User profile details */}
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-3 border-white/80 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">
                  {user.name}
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                  {user.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/80">
                {user.cityOrInstitution} • Member since {user.joinedDate}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-white/90">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>{roleSpec.title}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Role switcher & Voice Assistant CTA */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
            <button
              onClick={onOpenVoiceAssistant}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-extrabold shadow-md hover:bg-amber-100 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Voice AI Companion</span>
            </button>

            {/* Quick role switcher dropdown */}
            <div className="flex items-center bg-black/20 backdrop-blur-md rounded-xl p-1 border border-white/20 text-xs">
              <button
                onClick={() => onSwitchRole('student')}
                title="Student View"
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  user.role === 'student' ? 'bg-white text-slate-900' : 'text-white/80 hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => onSwitchRole('renter')}
                title="Tenant View"
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  user.role === 'renter' ? 'bg-white text-slate-900' : 'text-white/80 hover:text-white'
                }`}
              >
                Tenant
              </button>
              <button
                onClick={() => onSwitchRole('citizen')}
                title="Citizen View"
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  user.role === 'citizen' ? 'bg-white text-slate-900' : 'text-white/80 hover:text-white'
                }`}
              >
                Citizen
              </button>
              <button
                onClick={() => onSwitchRole('legalaid')}
                title="Legal Aid View"
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  user.role === 'legalaid' ? 'bg-white text-slate-900' : 'text-white/80 hover:text-white'
                }`}
              >
                Legal Aid
              </button>
            </div>
          </div>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/20 text-center">
          <div className="p-2">
            <span className="text-xl sm:text-2xl font-black">{user.stats.docsDecoded}</span>
            <p className="text-[11px] text-white/80 uppercase tracking-wide font-semibold">Docs Decoded</p>
          </div>
          <div className="p-2">
            <span className="text-xl sm:text-2xl font-black">{user.stats.moneySaved}</span>
            <p className="text-[11px] text-white/80 uppercase tracking-wide font-semibold">Money Saved</p>
          </div>
          <div className="p-2">
            <span className="text-xl sm:text-2xl font-black">{user.stats.redFlagsAvoided}</span>
            <p className="text-[11px] text-white/80 uppercase tracking-wide font-semibold">Flags Avoided</p>
          </div>
          <div className="p-2">
            <span className="text-xl sm:text-2xl font-black">{user.stats.pendingDeadlines}</span>
            <p className="text-[11px] text-white/80 uppercase tracking-wide font-semibold">Pending Deadlines</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for this Dashboard */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('decoder')}
          className={`py-3.5 px-5 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'decoder'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Multimodal Document Decrypter</span>
        </button>

        <button
          onClick={() => setActiveTab('toolkit')}
          className={`py-3.5 px-5 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'toolkit'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>{roleSpec.role.toUpperCase()} Rights & Appeal Drafter</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`py-3.5 px-5 text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'saved'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Documents ({savedDocs.length})</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'decoder' && (
        <div className="space-y-6">
          {isLoading ? (
            <LoadingScreen />
          ) : analysis ? (
            <AnalysisDashboard
              analysis={analysis}
              onUpdateAnalysis={onUpdateAnalysis}
              language={language}
              onLanguageChange={onLanguageChange}
              persona={persona}
              documentContext={documentContext}
              onReset={onResetAnalysis}
            />
          ) : (
            <UploadSection onAnalyze={onAnalyze} isLoading={isLoading} />
          )}
        </div>
      )}

      {/* Toolkit Tab for Role */}
      {activeTab === 'toolkit' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {roleSpec.title} Specialized Toolkit
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Grounded templates, regulatory citations, and dispute counter-proposals ready to copy or submit.
              </p>
            </div>

            {/* Role-Specific Interactive Cards */}
            {user.role === 'student' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Hall Ticket Defender */}
                <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                      UGC Regulation Section 6 Appeal
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      High Priority
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Mid-Sem Hall Ticket Cancellation Appeal Drafter
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Indian courts have repeatedly ruled that universities cannot bar students from exams due to administrative fee delays without a formal grievance hearing.
                  </p>
                  <button
                    onClick={() =>
                      handleCopyDraft(
                        'student-hall-ticket',
                        `To,\nThe Principal / Registrar,\nShree L.R. Tiwari College of Engineering\n\nSubject: Request for issuance of Mid-Semester Examination Hall Ticket pending fee processing\n\nRespected Sir/Madam,\n\nI am a bonafide final-year student (Roll No: [YOUR ROLL NO]). I refer to the circular dated 20 October 2026 mandating term fee deposition.\n\nDue to temporary banking transfer processing delays, my second-installment fee is in transit. As per UGC Student Grievance Redressal Regulations (2023) and Bombay High Court directives, withholding an examination hall ticket inflicts irreparable academic loss.\n\nI undertake to complete all clearing within 7 business days. Kindly issue my provisional hall ticket.\n\nYours sincerely,\n${user.name}\n${user.cityOrInstitution}`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedDraftKey === 'student-hall-ticket' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraftKey === 'student-hall-ticket' ? 'Copied Appeal Draft!' : 'Copy UGC Appeal Draft'}</span>
                  </button>
                </div>

                {/* 2. Hostel Deposit Defense */}
                <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                      Hostel Utility Audit
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-200 text-indigo-900">
                      Deposit Guard
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Unmetered Utility Surcharge Contest Letter
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Contest arbitrary ₹3,500 deductions from your refundable hostel caution deposit without individual sub-meter transparency.
                  </p>
                  <button
                    onClick={() =>
                      handleCopyDraft(
                        'student-hostel-surcharge',
                        `To,\nHostel Warden / Administration,\n\nSubject: Clarification regarding deduction of ₹3,500 Monsoon Utility Surcharge from Caution Deposit\n\nDear Warden,\n\nI am writing to respectfully request itemized sub-meter billing records regarding the ₹3,500 utility surcharge debited from my refundable security deposit.\n\nAs caution deposits are held strictly in trust under university hostel bylaws, blanket deductions without consumption audit contradict standard hostel norms. Kindly provide the society/hostel audit report.\n\nRegards,\n${user.name}`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedDraftKey === 'student-hostel-surcharge' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraftKey === 'student-hostel-surcharge' ? 'Copied Hostel Draft!' : 'Copy Surcharge Contest Letter'}</span>
                  </button>
                </div>
              </div>
            )}

            {user.role === 'renter' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Deposit Lock-in Counter */}
                <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                      Model Tenancy Act Sec 13
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-200 text-indigo-900">
                      Clause Counter
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    12-Month Lock-in Total Forfeiture Amendment
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Replace abusive 100% deposit forfeiture clauses with standard 1-month liquidated damages.
                  </p>
                  <button
                    onClick={() =>
                      handleCopyDraft(
                        'renter-lockin',
                        `Proposed Clause Modification for Rental Agreement:\n\n"Clause 5 (Early Termination): In the event the Tenant terminates the tenancy prior to completion of the 12-month lock-in period, the Tenant shall provide 30 days written notice or pay one (1) month rent in lieu thereof as liquidated damages. The remaining balance of the Security Deposit (₹15,00,000 less one month rent) shall be refunded within fifteen (15) days of handing over vacant possession."`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedDraftKey === 'renter-lockin' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraftKey === 'renter-lockin' ? 'Copied Amendment!' : 'Copy WhatsApp Counter Clause'}</span>
                  </button>
                </div>

                {/* 2. Painting Charge Contest */}
                <div className="p-5 rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-900 dark:text-pink-200">
                      Wear & Tear Standard
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-pink-200 text-pink-900">
                      Hidden Fee
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Mandatory ₹25,000 Painting Fee Waiver
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Propose fair wear-and-tear language instead of an automatic non-negotiable exit deduction.
                  </p>
                  <button
                    onClick={() =>
                      handleCopyDraft(
                        'renter-painting',
                        `Proposed Amendment for Painting Clause:\n\n"Clause 8 (Painting & Maintenance): Repainting charges upon vacating shall only be applicable if walls suffer damage exceeding normal wear and tear. If premises are maintained in clean, tenantable condition, no mandatory repainting deduction shall be made from the security deposit."`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedDraftKey === 'renter-painting' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraftKey === 'renter-painting' ? 'Copied Painting Waiver!' : 'Copy Painting Waiver Clause'}</span>
                  </button>
                </div>
              </div>
            )}

            {user.role === 'citizen' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Electricity Sec 56(1) */}
                <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                      Electricity Act 2003 Sec 56(1)
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                      Statutory Defense
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    15-Day Disconnection Notice Period Verification
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Under law, power distribution companies must provide a clear 15-day notice period in writing before any physical line cutoff.
                  </p>
                  <button
                    onClick={() =>
                      handleCopyDraft(
                        'citizen-msedcl',
                        `To,\nExecutive Engineer / Billing Officer,\nMSEDCL Division Office\n\nSubject: Representation regarding Consumer No: 015284930192 (Disconnection Notice)\n\nSir/Madam,\n\nI acknowledge the outstanding bill of ₹8,420 for September 2026. Please be informed that payment is being initiated today via online portal.\n\nAs mandated under Section 56(1) of the Electricity Act 2003, no supply disconnection can be executed without verifying online payment reconciliation. Please suspend any disconnection order.\n\nRegards,\n${user.name}\nConsumer No: 015284930192`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedDraftKey === 'citizen-msedcl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraftKey === 'citizen-msedcl' ? 'Copied MSEDCL Notice!' : 'Copy Disconnection Defense Letter'}</span>
                  </button>
                </div>

                {/* 2. National Consumer Helpline Drafter */}
                <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-900 dark:text-teal-200">
                      NCH Helpline 1915
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-200 text-teal-900">
                      Grievance Portal
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Consumer Forum Formal Grievance Drafter
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Direct formatted text for National Consumer Helpline against wrongful late surcharges and arbitrary penalties.
                  </p>
                  <button
                    onClick={() =>
                      handleCopyDraft(
                        'citizen-nch',
                        `Complaint for National Consumer Helpline (NCH Portal):\n\nComplainant Name: ${user.name}\nState: Maharashtra\nOpposite Party: MSEDCL / Utility Provider\nComplaint Category: Unfair Trade Practice / Deficient Billing Service\n\nDetails:\nThe service provider levied a late penalty surcharge despite the consumer not receiving timely billing delivery. Requesting waiver of unjust surcharge under Consumer Protection Act 2019 rules.`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedDraftKey === 'citizen-nch' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraftKey === 'citizen-nch' ? 'Copied NCH Draft!' : 'Copy NCH Complaint Draft'}</span>
                  </button>
                </div>
              </div>
            )}

            {user.role === 'legalaid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-3">
                  <span className="text-xs font-bold text-rose-900 dark:text-rose-200">
                    Pro-Bono Clinic Template
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Landlord-Tenant Conciliation Agreement
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Standardized pre-litigation settlement draft to avoid tedious court trials and obtain 15-day deposit refund commitments.
                  </p>
                  <button
                    onClick={() =>
                      handleCopyDraft(
                        'legalaid-conciliation',
                        `MEMORANDUM OF CONCILIATION & SETTLEMENT\n\nBetween: Amit Verma (Tenant) and Rajesh Sharma (Landlord)\nFacilitated by: ${user.name} (Legal Aid Volunteer)\n\n1. Both parties agree to waive the 12-month lock-in forfeiture clause.\n2. Landlord agrees to deduct one month's rent (₹35,000) as full and final settlement.\n3. The balance security deposit of ₹14,65,000 shall be electronically refunded via NEFT within 15 calendar days.\n4. Both parties affirm no further claims remain.`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedDraftKey === 'legalaid-conciliation' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraftKey === 'legalaid-conciliation' ? 'Copied Conciliation Draft!' : 'Copy Conciliation Draft'}</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 space-y-3">
                  <span className="text-xs font-bold text-purple-900 dark:text-purple-200">
                    Audit Checklist
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Top 5 Red-Flag Clauses in Mumbai Tenancy
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    1. Automatic Deposit Forfeiture • 2. Arbitrary Repainting Charges • 3. Unchecked Landlord Entry • 4. Exorbitant Daily Fines (₹1,000/day) • 5. No Notice Eviction.
                  </p>
                  <button
                    onClick={() =>
                      handleCopyDraft(
                        'legalaid-checklist',
                        `MUMBAI TENANCY RED FLAG AUDIT CHECKLIST:\n1. Lock-in Clause: Ensure max penalty does not exceed 1-2 months rent.\n2. Repainting: Must explicitly exclude fair wear and tear.\n3. Deposit Refund: Cap refund timeline strictly at 30 days maximum.\n4. Daily Late Fine: Must not exceed 10-18% per annum rate.\n5. Notice Period: Mutual 1-2 months notice after lock-in.`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedDraftKey === 'legalaid-checklist' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDraftKey === 'legalaid-checklist' ? 'Copied Checklist!' : 'Copy Audit Checklist'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Saved Documents Tab */}
      {activeTab === 'saved' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Saved Documents Archive
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Documents decoded and stored locally for your profile
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {savedDocs.length} Total Documents
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {savedDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-indigo-400 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold text-sm">
                    {doc.score}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {doc.category} • Analyzed on {doc.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      doc.score >= 80
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : doc.score >= 50
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {doc.recommendation}
                  </span>
                  <button
                    onClick={() => {
                      // Load corresponding sample doc
                      const sampleMatch = SAMPLE_DOCS.find(
                        (s) => s.recommendedFor === user.role
                      ) || SAMPLE_DOCS[0];
                      onAnalyze({ text: sampleMatch.rawText, sampleDoc: sampleMatch });
                      setActiveTab('decoder');
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 underline"
                  >
                    View Analysis
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
