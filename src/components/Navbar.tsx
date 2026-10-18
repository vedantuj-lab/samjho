import React from 'react';
import { Language, Persona, UserProfile } from '../types.ts';
import { 
  FileSearch, 
  Sparkles, 
  Moon, 
  Sun, 
  GraduationCap, 
  Users, 
  HelpCircle,
  Printer,
  LogOut,
  User,
  Mic,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  persona: Persona;
  onPersonaChange: (p: Persona) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onPrint?: () => void;
  hasResults?: boolean;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenVoiceAssistant: () => void;
  onHomeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  persona,
  onPersonaChange,
  isDark,
  onToggleTheme,
  onPrint,
  hasResults,
  user,
  onOpenAuth,
  onLogout,
  onOpenVoiceAssistant,
  onHomeClick,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div 
          onClick={onHomeClick}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-700 via-purple-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <FileSearch className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-indigo-900 via-purple-700 to-amber-600 dark:from-indigo-300 dark:via-white dark:to-amber-400 bg-clip-text text-transparent">
                Samjho
              </span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/40">
                समझो
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Voice & Multimodal AI</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Voice Assistant Shortcut Button */}
          <button
            onClick={onOpenVoiceAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-xs transition transform hover:scale-102"
          >
            <Mic className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Voice AI</span>
          </button>

          {/* Persona selector (visible in sm+) */}
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="px-2 text-slate-400 dark:text-slate-500 font-medium">Explain like:</span>
            <button
              onClick={() => onPersonaChange('student')}
              title="Casual, college analogies"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition font-medium ${
                persona === 'student'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
            <button
              onClick={() => onPersonaChange('parent')}
              title="Formal, cost and safety focused"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition font-medium ${
                persona === 'parent'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Parent</span>
            </button>
            <button
              onClick={() => onPersonaChange('beginner')}
              title="Zero jargon, simple bullet points"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition font-medium ${
                persona === 'beginner'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Beginner</span>
            </button>
          </div>

          {/* Language selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700 text-xs font-medium">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-md transition ${
                language === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2.5 py-1 rounded-md transition ${
                language === 'hi'
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-2.5 py-1 rounded-md transition ${
                language === 'mr'
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              मराठी
            </button>
          </div>

          {/* User Auth Section */}
          {user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-slate-200 dark:border-slate-700">
              <div className="hidden sm:flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover border border-slate-300 dark:border-slate-600"
                />
                <div className="text-left leading-tight">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">
                    {user.name.split(' ')[0]}
                  </p>
                  <span className="text-[10px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400">
                    {user.role}
                  </span>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Log Out to Landing"
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 text-white text-xs font-bold shadow-xs transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
          )}

          {/* Print PDF Button (if results active) */}
          {hasResults && onPrint && (
            <button
              onClick={onPrint}
              title="Download PDF Report or Print"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Printer className="w-4 h-4" />
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

