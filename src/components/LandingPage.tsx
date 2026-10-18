import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  FileSearch, 
  Home, 
  GraduationCap, 
  Zap, 
  Users, 
  Scale, 
  CheckCircle2, 
  Mic, 
  Languages, 
  TrendingUp, 
  FileText, 
  AlertTriangle,
  ChevronRight,
  Play
} from 'lucide-react';
import { Language, UserRole } from '../types.ts';
import { ROLE_SPECS } from '../data/mockUsers.ts';

interface LandingPageProps {
  onGetStarted: () => void;
  onSelectRoleDemo: (role: UserRole) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onSelectRoleDemo,
  language,
  onLanguageChange,
}) => {
  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>('student');

  const content = {
    en: {
      badge: 'Multimodal AI Legal & Civic Assistant for India',
      headlineStart: 'Stop guessing what you sign.',
      headlineGradient: 'Understand any Indian document in 30 seconds.',
      subhead: 'Rental agreements, college notices, electricity threats, and bank loans decoded into plain English, Hindi, or Marathi with zero legal jargon.',
      primaryCta: 'Get Started Free',
      demoCta: 'Explore Demo Dashboards',
      stats: [
        { value: '₹4.2 Cr+', label: 'Deposits & Fines Protected', color: 'from-amber-400 to-orange-500' },
        { value: '18,400+', label: 'Confusing Notices Decoded', color: 'from-indigo-400 to-purple-500' },
        { value: '98.7%', label: 'Red Flag Detection Rate', color: 'from-emerald-400 to-teal-500' },
        { value: '3 Languages', label: 'English, हिंदी & मराठी with Voice', color: 'from-pink-400 to-rose-500' },
      ],
      rolesTitle: 'Tailored Experience for Every Indian Need',
      rolesSub: 'Choose your profile to unlock custom tools, regulatory guides, and grievance templates.',
      howItWorksTitle: 'How Samjho Protects You in 3 Easy Steps',
      steps: [
        {
          num: '01',
          title: 'Snap or Upload',
          desc: 'Take a photo of your paper lease, college circular, or electricity bill, or upload a PDF/text.',
        },
        {
          num: '02',
          title: 'Gemini Deep Scan',
          desc: 'Our multimodal engine extracts fine-print traps, hidden deductions, and critical deadlines.',
        },
        {
          num: '03',
          title: 'Voice-Enabled Action',
          desc: 'Get an action checklist, talk to our AI voice assistant in your language, and generate dispute letters.',
        },
      ],
    },
    hi: {
      badge: 'भारत का पहला मल्टीमोडल AI कानूनी व नागरिक सहायक',
      headlineStart: 'बिना समझे हस्ताक्षर करना बंद करें।',
      headlineGradient: 'किसी भी भारतीय दस्तावेज़ को 30 सेकंड में समझें।',
      subhead: 'रेंटल एग्रीमेंट, कॉलेज सर्कुलर, बिजली कटने के नोटिस और बैंक लोन के कठिन नियमों को सरल हिंदी, मराठी या अंग्रेजी में समझें।',
      primaryCta: 'मुफ़्त शुरू करें',
      demoCta: 'डेमो डैशबोर्ड देखें',
      stats: [
        { value: '₹4.2 करोड़+', label: 'डिपॉज़िट व पेनाल्टी की बचत', color: 'from-amber-400 to-orange-500' },
        { value: '18,400+', label: 'कठिन नोटिस डिकोड किए गए', color: 'from-indigo-400 to-purple-500' },
        { value: '98.7%', label: 'रेड फ्लैग पकड़ने की दर', color: 'from-emerald-400 to-teal-500' },
        { value: '3 भाषाएँ', label: 'अंग्रेजी, हिंदी व मराठी आवाज़ के साथ', color: 'from-pink-400 to-rose-500' },
      ],
      rolesTitle: 'हर भारतीय की ज़रूरत के लिए अलग डैशबोर्ड',
      rolesSub: 'अपनी प्रोफ़ाइल चुनें और विशेष टूल, नियम व लेटर जनरेटर पाएँ।',
      howItWorksTitle: 'समझो कैसे काम करता है? केवल 3 सरल कदम',
      steps: [
        {
          num: '01',
          title: 'फोटो खींचें या अपलोड करें',
          desc: 'अपने रेंट एग्रीमेंट, कॉलेज नोटिस या बिल का फोटो लें या पीडीएफ अपलोड करें।',
        },
        {
          num: '02',
          title: 'जेमिनी डीप स्कैन',
          desc: 'हमारा AI इंजन छिपे हुए चार्ज, अनुचित शर्तें और अंतिम तारीखें खोज निकालता है।',
        },
        {
          num: '03',
          title: 'बोलकर बात करें व लेटर बनाएँ',
          desc: 'अपनी भाषा में वॉयस बॉट से सवाल पूछें और मकान मालिक या कॉलेज को भेजने के लिए लेटर तैयार करें।',
        },
      ],
    },
    mr: {
      badge: 'भारतातील पहिला मल्टीमोडल AI कायदेशीर व नागरी सहाय्यक',
      headlineStart: 'न समजता स्वाक्षरी करणे थांबवा.',
      headlineGradient: 'कोणताही कायदेशीर दस्तऐवज 30 सेकंदात समजून घ्या.',
      subhead: 'भाडेकरार, कॉलेज परिपत्रक, वीजबिल तोडणीची नोटीस आणि बँक कर्जाच्या अटींची मराठी, हिंदी व इंग्रजीत सोपी माहिती.',
      primaryCta: 'मोफत सुरू करा',
      demoCta: 'डेमो डॅशबोर्ड पहा',
      stats: [
        { value: '₹4.2 कोटी+', label: 'अनामत रक्कम व दंड वाचवला', color: 'from-amber-400 to-orange-500' },
        { value: '18,400+', label: 'कठीण नोटिसा डिकोड केल्या', color: 'from-indigo-400 to-purple-500' },
        { value: '98.7%', label: 'धोकादायक अटी शोधण्याचे प्रमाण', color: 'from-emerald-400 to-teal-500' },
        { value: '3 भाषा', label: 'मराठी, हिंदी व इंग्रजी आवाजासह', color: 'from-pink-400 to-rose-500' },
      ],
      rolesTitle: 'प्रत्येक घटकासाठी स्वतंत्र व वैशिष्ट्यपूर्ण डॅशबोर्ड',
      rolesSub: 'तुमची भूमिका निवडा आणि संबंधित अधिकार, मार्गदर्शक तत्त्वे व तक्रार अर्ज मिळवा.',
      howItWorksTitle: 'समझो 3 सोप्या टप्प्यांत तुमचे संरक्षण करते',
      steps: [
        {
          num: '01',
          title: 'फोटो काढा किंवा अपलोड करा',
          desc: 'भाडेकरार किंवा कॉलेजच्या नोटीसचा फोटो काढा अथवा पीडीएफ अपलोड करा.',
        },
        {
          num: '02',
          title: 'जेमिनी सखोल तपासणी',
          desc: 'आमचा AI अल्गोरिदम लपवलेले शुल्क, अन्यायकारक अटी व मुदती अचूक शोधून काढतो.',
        },
        {
          num: '03',
          title: 'व्हॉइस असिस्टंट व तक्रार पत्र',
          desc: 'मराठीत बोलून शंका विचारा आणि घरमालक किंवा प्रशासनासाठी कायदेशीर पत्रे तयार करा.',
        },
      ],
    },
  }[language];

  const activeSpec = ROLE_SPECS[selectedRoleTab];

  return (
    <div className="w-full relative overflow-hidden">
      {/* Background colorful radiant glow mesh */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 text-center">
        {/* Top Floating Badge with Colorful Shimmer */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-amber-500/10 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-xs mb-6 backdrop-blur-md animate-pulse-subtle">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{content.badge}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>

        {/* Dynamic Colorful Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.12]">
          {content.headlineStart}{' '}
          <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 dark:from-indigo-400 dark:via-purple-300 dark:to-amber-300 bg-clip-text text-transparent">
            {content.headlineGradient}
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {content.subhead}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 hover:from-indigo-700 hover:via-purple-700 hover:to-amber-600 shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            <span>{content.primaryCta}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('role-showcase-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{content.demoCta}</span>
          </button>
        </div>

        {/* Quick Highlights / Voice feature preview */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80">
            <Mic className="w-3.5 h-3.5 text-rose-500" />
            <span>Voice Input & Speech Playback</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80">
            <Languages className="w-3.5 h-3.5 text-indigo-500" />
            <span>English • हिंदी • मराठी</span>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Zero Data Storage • 100% Private</span>
          </span>
        </div>

        {/* Stats Grid with Dynamic Color Gradients */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {content.stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-sm text-center relative overflow-hidden group hover:border-indigo-400 transition"
            >
              <div className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Role-Specific Showcase Section */}
      <section id="role-showcase-section" className="py-16 sm:py-24 bg-slate-100/60 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              {content.rolesTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {content.rolesSub}
            </p>
          </div>

          {/* Interactive Role Switcher Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
            <button
              onClick={() => setSelectedRoleTab('student')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                selectedRoleTab === 'student'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/25 ring-2 ring-amber-400'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>College Student</span>
            </button>

            <button
              onClick={() => setSelectedRoleTab('renter')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                selectedRoleTab === 'renter'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25 ring-2 ring-indigo-400'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Tenant / Renter</span>
            </button>

            <button
              onClick={() => setSelectedRoleTab('citizen')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                selectedRoleTab === 'citizen'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-400'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Citizen / Consumer</span>
            </button>

            <button
              onClick={() => setSelectedRoleTab('legalaid')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
                selectedRoleTab === 'legalaid'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-rose-500/25 ring-2 ring-rose-400'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Legal Aid / Counselor</span>
            </button>
          </div>

          {/* Active Role Card Showcase with Gradient Shading */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl overflow-hidden relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r shadow-xs mb-1">
                  <span className={`bg-gradient-to-r ${activeSpec.gradient} px-3 py-1 rounded-full`}>
                    Specialized Role Dashboard
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {activeSpec.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
                  {activeSpec.tagline}
                </p>
              </div>

              <button
                onClick={() => onSelectRoleDemo(selectedRoleTab)}
                className={`px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r ${activeSpec.gradient} shadow-lg transition-transform transform hover:-translate-y-0.5 flex items-center gap-2 shrink-0`}
              >
                <span>Launch This Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Specialized Features for this Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {activeSpec.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-400 transition space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {feat.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 pt-2">
                    <span>Feature Included</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {content.howItWorksTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From dense legal paper to plain language voice-assisted guidance in under half a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.steps.map((st, i) => (
            <div
              key={i}
              className="relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-4"
            >
              <span className="text-4xl font-black bg-gradient-to-r from-indigo-500 to-amber-500 bg-clip-text text-transparent opacity-80">
                {st.num}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {st.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Vibrant Call to Action */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-indigo-700 via-purple-700 to-amber-600 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black">
              Never sign blind again.
            </h2>
            <p className="text-sm sm:text-base text-indigo-100">
              Join thousands of Indian students, tenants, and families taking back control of their rights.
            </p>
          </div>

          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-2xl bg-white text-indigo-900 font-extrabold text-base shadow-xl hover:bg-amber-100 transition transform hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <span>Start Decoding Now</span>
            <ArrowRight className="w-5 h-5 text-indigo-700" />
          </button>
        </div>
      </section>
    </div>
  );
};
