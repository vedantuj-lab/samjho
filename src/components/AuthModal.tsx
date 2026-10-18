import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  GraduationCap, 
  Home, 
  Zap, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Lock, 
  Mail,
  UserCheck
} from 'lucide-react';
import { UserProfile, UserRole } from '../types.ts';
import { DEMO_USERS, ROLE_SPECS } from '../data/mockUsers.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'student',
}) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'custom'>('demo');
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customRole, setCustomRole] = useState<UserRole>(initialRole);
  const [customCity, setCustomCity] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;

    const newUser: UserProfile = {
      id: `usr-custom-${Date.now()}`,
      name: customName.trim(),
      email: customEmail.trim(),
      role: customRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      badge: `${customRole.toUpperCase()} Member`,
      cityOrInstitution: customCity.trim() || 'Maharashtra, India',
      joinedDate: 'Oct 2026',
      stats: {
        docsDecoded: 1,
        moneySaved: '₹15,000',
        redFlagsAvoided: 3,
        pendingDeadlines: 1,
      },
    };

    onLoginSuccess(newUser);
  };

  const handleDemoSelect = (role: UserRole) => {
    const user = DEMO_USERS[role];
    onLoginSuccess(user);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top vibrant gradient header bar */}
        <div className="h-3 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Samjho Citizen & Student Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Choose your profile to enter
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Each user persona unlocks a dedicated, tailored dashboard with custom tools.
            </p>
          </div>

          {/* Switcher Tab */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('demo')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'demo'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              🚀 Instant 1-Click Demo Profiles
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                activeTab === 'custom'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              ✍️ Custom Login / Sign Up
            </button>
          </div>

          {activeTab === 'demo' ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Click any profile to access their custom dashboard:
              </p>

              {/* 4 Demo User Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Student */}
                <button
                  onClick={() => handleDemoSelect('student')}
                  className="group text-left p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 hover:border-amber-500 hover:shadow-md transition flex items-start gap-3"
                >
                  <img
                    src={DEMO_USERS.student.avatar}
                    alt={DEMO_USERS.student.name}
                    className="w-11 h-11 rounded-xl object-cover border-2 border-amber-400 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {DEMO_USERS.student.name}
                      </span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                        Student
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {DEMO_USERS.student.cityOrInstitution}
                    </p>
                    <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1">
                      <span>Saved ₹22,500</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </button>

                {/* 2. Renter */}
                <button
                  onClick={() => handleDemoSelect('renter')}
                  className="group text-left p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 hover:border-indigo-500 hover:shadow-md transition flex items-start gap-3"
                >
                  <img
                    src={DEMO_USERS.renter.avatar}
                    alt={DEMO_USERS.renter.name}
                    className="w-11 h-11 rounded-xl object-cover border-2 border-indigo-400 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {DEMO_USERS.renter.name}
                      </span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200">
                        Tenant
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {DEMO_USERS.renter.cityOrInstitution}
                    </p>
                    <p className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1">
                      <span>Saved ₹1,50,000</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </button>

                {/* 3. Citizen */}
                <button
                  onClick={() => handleDemoSelect('citizen')}
                  className="group text-left p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 hover:border-emerald-500 hover:shadow-md transition flex items-start gap-3"
                >
                  <img
                    src={DEMO_USERS.citizen.avatar}
                    alt={DEMO_USERS.citizen.name}
                    className="w-11 h-11 rounded-xl object-cover border-2 border-emerald-400 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {DEMO_USERS.citizen.name}
                      </span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
                        Citizen
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {DEMO_USERS.citizen.cityOrInstitution}
                    </p>
                    <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                      <span>Saved ₹48,200</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </button>

                {/* 4. Legal Aid */}
                <button
                  onClick={() => handleDemoSelect('legalaid')}
                  className="group text-left p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 hover:border-rose-500 hover:shadow-md transition flex items-start gap-3"
                >
                  <img
                    src={DEMO_USERS.legalaid.avatar}
                    alt={DEMO_USERS.legalaid.name}
                    className="w-11 h-11 rounded-xl object-cover border-2 border-rose-400 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {DEMO_USERS.legalaid.name}
                      </span>
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200">
                        Legal Aid
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {DEMO_USERS.legalaid.cityOrInstitution}
                    </p>
                    <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                      <span>86 Cases Decoded</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </p>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* Custom user registration / login */
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g., Aarav Mehta"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="e.g., aarav@example.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  City or College Institution
                </label>
                <input
                  type="text"
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  placeholder="e.g., Mumbai, Maharashtra"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Your Profile Dashboard
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomRole('student')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center gap-2 ${
                      customRole === 'student'
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 ring-1 ring-amber-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <span>Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomRole('renter')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center gap-2 ${
                      customRole === 'renter'
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-200 ring-1 ring-indigo-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Home className="w-4 h-4 text-indigo-500" />
                    <span>Tenant / Renter</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomRole('citizen')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center gap-2 ${
                      customRole === 'citizen'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 ring-1 ring-emerald-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span>Citizen / Consumer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomRole('legalaid')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center gap-2 ${
                      customRole === 'legalaid'
                        ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 ring-1 ring-rose-400'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Scale className="w-4 h-4 text-rose-500" />
                    <span>Legal Aid / Counselor</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 hover:from-indigo-700 hover:to-amber-600 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <span>Enter Dashboard as {customRole.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero tracking. Instant local session without password friction.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
