/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { DisclaimerBanner } from './components/DisclaimerBanner.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { RoleDashboard } from './components/RoleDashboard.tsx';
import { GlobalChatbotVoiceModal } from './components/GlobalChatbotVoiceModal.tsx';
import { DocumentAnalysis, Language, Persona, SampleDoc, UserProfile, UserRole } from './types.ts';
import { DEMO_USERS } from './data/mockUsers.ts';
import { AlertCircle, Mic, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);

  const [language, setLanguage] = useState<Language>('en');
  const [persona, setPersona] = useState<Persona>('student');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [activeSample, setActiveSample] = useState<SampleDoc | null>(null);
  const [documentContext, setDocumentContext] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync dark mode class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Set html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleLanguageChange = async (newLang: Language) => {
    setLanguage(newLang);

    if (!analysis) return;

    // If currently viewing a pre-loaded sample document, switch directly to precomputed translation
    if (activeSample && activeSample.precomputedAnalysis[newLang]) {
      const translatedSample = activeSample.precomputedAnalysis[newLang];
      const updatedActions = translatedSample.actions.map((act, i) => ({
        ...act,
        completed: analysis.actions[i]?.completed || false,
      }));
      setAnalysis({
        ...translatedSample,
        actions: updatedActions,
      });
      return;
    }

    // Otherwise, translate live via backend Gemini endpoint
    try {
      setIsLoading(true);
      const res = await fetch('/api/translate-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis,
          targetLanguage: newLang,
          persona,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.warn('Could not translate dynamically, keeping current analysis', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaChange = (newPersona: Persona) => {
    setPersona(newPersona);
  };

  const handleAnalyze = async (payload: {
    text?: string;
    fileData?: string;
    mimeType?: string;
    sampleDoc?: SampleDoc;
  }) => {
    setErrorMessage(null);
    setIsLoading(true);

    // If it's a pre-loaded sample document, simulate the authentic 4-step Gemini multimodal analysis
    if (payload.sampleDoc) {
      setActiveSample(payload.sampleDoc);
      setDocumentContext(payload.sampleDoc.rawText);

      setTimeout(() => {
        const sampleAnalysis = payload.sampleDoc!.precomputedAnalysis[language];
        setAnalysis(sampleAnalysis);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2200);
      return;
    }

    // Real uploaded file or pasted text -> Call server-side Gemini API
    setActiveSample(null);
    setDocumentContext(payload.text || 'User uploaded document image/PDF');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: payload.text,
          fileData: payload.fileData,
          mimeType: payload.mimeType,
          language,
          persona,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze document.');
      }

      setAnalysis(data.analysis);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'An error occurred while decoding the document. Please verify the file and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAnalysis = () => {
    setAnalysis(null);
    setActiveSample(null);
    setDocumentContext('');
    setErrorMessage(null);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthOpen(false);
    handleResetAnalysis();
  };

  const handleSwitchRole = (newRole: UserRole) => {
    const demoUser = DEMO_USERS[newRole];
    setCurrentUser(demoUser);
    handleResetAnalysis();
  };

  const handleRoleSelectFromLanding = (role: UserRole) => {
    const demoUser = DEMO_USERS[role];
    setCurrentUser(demoUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    handleResetAnalysis();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors relative selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        persona={persona}
        onPersonaChange={handlePersonaChange}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onPrint={() => window.print()}
        hasResults={Boolean(analysis)}
        user={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
        onHomeClick={() => {
          if (!currentUser) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            handleResetAnalysis();
          }
        }}
      />

      {/* Mandatory Legal Safety Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start">
        {errorMessage && (
          <div className="max-w-4xl mx-auto px-4 mt-6 w-full">
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 flex items-start gap-3 text-rose-800 dark:text-rose-200 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong className="font-semibold">Analysis Notice: </strong>
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs font-bold underline hover:opacity-80"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {currentUser ? (
          /* Logged In: Dedicated Role Dashboard */
          <RoleDashboard
            user={currentUser}
            onSwitchRole={handleSwitchRole}
            onLogout={handleLogout}
            language={language}
            onLanguageChange={handleLanguageChange}
            persona={persona}
            onPersonaChange={handlePersonaChange}
            isLoading={isLoading}
            analysis={analysis}
            onAnalyze={handleAnalyze}
            onUpdateAnalysis={setAnalysis}
            documentContext={documentContext}
            onResetAnalysis={handleResetAnalysis}
            onOpenVoiceAssistant={() => setIsVoiceOpen(true)}
          />
        ) : (
          /* Public / Logged Out: Interactive Landing Page */
          <LandingPage
            onGetStarted={() => setIsAuthOpen(true)}
            onSelectRoleDemo={handleRoleSelectFromLanding}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        )}
      </main>

      {/* Persistent Floating AI Voice Assistant Button (Accessible anywhere) */}
      <aside 
        aria-label="Samjho AI Voice Assistant trigger"
        className="fixed bottom-6 right-6 z-40"
      >
        <button
          onClick={() => setIsVoiceOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 hover:from-indigo-700 hover:to-amber-600 text-white font-extrabold text-xs shadow-2xl shadow-indigo-500/40 transition-all transform hover:scale-105 active:scale-95"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
            <Mic className="w-3.5 h-3.5" />
          </div>
          <span className="hidden sm:inline">Samjho AI Voice Assistant</span>
          <span className="sm:hidden">Voice AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-1 -right-1" />
        </button>
      </aside>

      {/* Global Voice Assistant & Chatbot Modal */}
      <GlobalChatbotVoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        userRole={currentUser?.role || 'citizen'}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Login & Role Selection Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer (hidden during print) */}
      <footer className="no-print mt-auto border-t border-slate-200 dark:border-slate-800/80 py-8 px-4 bg-white/60 dark:bg-slate-900/60 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 dark:text-slate-200">Samjho (समझो)</span>
            <span>•</span>
            <span>Built for India's students, first-time renters, and citizens.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Multimodal Gemini 3.8 Flash & Speech AI</span>
            </span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Private</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
