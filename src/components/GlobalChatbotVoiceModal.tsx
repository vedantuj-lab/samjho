import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Languages, 
  RotateCcw,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ChatMessage, Language, UserRole } from '../types.ts';

interface GlobalChatbotVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  language: Language;
  onLanguageChange: (l: Language) => void;
}

export const GlobalChatbotVoiceModal: React.FC<GlobalChatbotVoiceModalProps> = ({
  isOpen,
  onClose,
  userRole,
  language,
  onLanguageChange,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Suggested prompts per role and language
  const starterPrompts: Record<Language, Record<UserRole, string[]>> = {
    en: {
      student: [
        'Can college legally cancel my hall ticket for 3 days fee delay?',
        'Is the ₹3,500 unmetered hostel electricity surcharge legal?',
        'How to draft an official fee extension letter under UGC rules?',
      ],
      renter: [
        'Can landlord deduct ₹25,000 for painting if walls are clean?',
        'What is the maximum security deposit allowed under Model Tenancy Act?',
        'Can landlord forfeit 100% deposit for breaking 12-month lock-in?',
      ],
      citizen: [
        'How many days notice must MSEDCL give before cutting electricity?',
        'How to file a complaint on National Consumer Helpline (NCH 1915)?',
        'Can bank charge compounding penalty on delayed EMI payment?',
      ],
      legalaid: [
        'What are the landmark court rulings on student examination barring?',
        'Key provisions of Maharashtra Rent Control Act regarding deposits',
        'Standard conciliation clauses for residential landlord-tenant disputes',
      ],
    },
    hi: {
      student: [
        'क्या फीस लेट होने पर कॉलेज हॉल टिकट रोक सकता है?',
        'क्या हॉस्टल का ₹3,500 बिजली सरचार्ज काटना कानूनी है?',
        'UGC नियमों के तहत फीस माफी का पत्र कैसे लिखें?',
      ],
      renter: [
        'क्या दीवार साफ होने पर भी मकान मालिक ₹25,000 पेंटिंग चार्ज काट सकता है?',
        'मॉडल टेनेंसी एक्ट के तहत अधिकतम कितना डिपॉज़िट लिया जा सकता है?',
        'अगर 12 महीने के लॉक-इन से पहले फ्लैट छोड़ें तो क्या पूरा डिपॉज़िट ज़ब्त होगा?',
      ],
      citizen: [
        'बिजली काटने से पहले महावितरण को कितने दिन की लिखित नोटिस देनी चाहिए?',
        'उपभोक्ता हेल्पलाइन 1915 पर शिकायत कैसे दर्ज कराएं?',
        'बैंक के अतिरिक्त लेट फाइन के खिलाफ कैसे अपील करें?',
      ],
      legalaid: [
        'हॉल टिकट रोके जाने पर बॉम्बे हाईकोर्ट के क्या निर्देश हैं?',
        'महाराष्ट्र रेंट कंट्रोल में डिपॉजिट वापसी की समयसीमा क्या है?',
        'मकान मालिक-किराएदार समझौते का सही प्रारूप क्या है?',
      ],
    },
    mr: {
      student: [
        'शुल्क विलंबापोटी कॉलेज परीक्षा हॉल तिकीट रद्द करू शकते का?',
        'वसतिगृहाचा ₹3,500 वीज अधिभार अनामत रकमेतून कापणे योग्य आहे का?',
        'UGC नियमांनुसार मुदतवाढीचा अर्ज कसा करावा?',
      ],
      renter: [
        'भिंती स्वच्छ असतानाही घरमालक ₹25,000 रंगकाम शुल्क कापू शकतो का?',
        'भाडेकरारातील 12 महिन्यांचा लॉक-इन मोडल्यास संपूर्ण अनामत रक्कम जप्त होते का?',
        'महाराष्ट्रात किती महिन्यांचे भाडे डिपॉझिट म्हणून मागता येते?',
      ],
      citizen: [
        'महावितरणने वीज तोडण्यापूर्वी किती दिवसांची पूर्वसूचना देणे आवश्यक आहे?',
        'ग्राहक तक्रार निवारण केंद्रात (1915) तक्रार कशी नोंदवावी?',
        'बँकेच्या चुकीच्या दंडाविरुद्ध कायदेशीर दाद कशी मागावी?',
      ],
      legalaid: [
        'परीक्षेला बसण्यापासून रोखण्यावर उच्च न्यायालयाचे काय आदेश आहेत?',
        'महाराष्ट्र भाडे नियंत्रण कायद्यानुसार अनामत रकमेचे नियम काय आहेत?',
        'घरमालक-भाडेकरू तडजोड कराराचा कायदेशीर मसुदा कसा असावा?',
      ],
    },
  };

  // Setup Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSend(transcript, true);
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Update recognition language when user changes language
  useEffect(() => {
    if (recognitionRef.current) {
      if (language === 'hi') {
        recognitionRef.current.lang = 'hi-IN';
      } else if (language === 'mr') {
        recognitionRef.current.lang = 'mr-IN';
      } else {
        recognitionRef.current.lang = 'en-IN';
      }
    }
  }, [language]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeTexts: Record<Language, string> = {
        en: `Hello! I am your Samjho AI Voice Assistant. I am here to help you understand Indian rental laws, university circulars, electricity disconnection rules, and document clauses. Speak into the microphone or ask any question!`,
        hi: `नमस्ते! मैं आपका समझो AI वॉयस साथी हूँ। मैं रेंटल एग्रीमेंट, कॉलेज नोटिस, बिजली बिल और सरकारी नियमों को सरल भाषा में समझाने के लिए यहाँ हूँ। माइक पर बोलकर या लिखकर अपना सवाल पूछें!`,
        mr: `नमस्कार! मी तुमचा समझो AI व्हॉइस साथी आहे. भाडेकरार, कॉलेज परिपत्रके, वीजबिल किंवा कायदेशीर अटी समजून घेण्यासाठी मी सज्ज आहे. माइकवर बोलून किंवा लिहून प्रश्न विचारा!`,
      };

      setMessages([
        {
          id: 'welcome-0',
          sender: 'assistant',
          text: welcomeTexts[language],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  // Stop any playing audio
  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setCurrentlySpeakingId(null);
  };

  // Speak a message using Gemini TTS or browser synthesis
  const speakMessage = async (msgId: string, text: string) => {
    stopAudio();
    setCurrentlySpeakingId(msgId);

    // Clean markdown characters
    const cleanText = text.replace(/[*#_`]/g, '').slice(0, 300);

    // Try server-side Gemini TTS first
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        currentAudioRef.current = audio;
        audio.onended = () => setCurrentlySpeakingId(null);
        audio.onerror = () => fallbackBrowserSpeech(cleanText);
        await audio.play();
        return;
      }
    } catch (e) {
      // Fallback to browser
    }

    fallbackBrowserSpeech(cleanText);
  };

  const fallbackBrowserSpeech = (cleanText: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      if (language === 'hi') utterance.lang = 'hi-IN';
      else if (language === 'mr') utterance.lang = 'mr-IN';
      else utterance.lang = 'en-IN';

      utterance.onend = () => setCurrentlySpeakingId(null);
      utterance.onerror = () => setCurrentlySpeakingId(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setCurrentlySpeakingId(null);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopAudio();
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Recognition start error:', err);
      }
    }
  };

  const handleSend = async (questionText?: string, isVoice = false) => {
    const q = (questionText || input).trim();
    if (!q || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoiceInput: isVoice,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/assistant-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          language,
          userRole,
          history: messages,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to get answer');
      }

      const botMsgId = `bot-${Date.now()}`;
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // If auto-speak is enabled, speak out the response
      if (autoSpeak) {
        speakMessage(botMsgId, data.reply);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'assistant',
        text: 'Sorry, I encountered a temporary connection issue. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  const rolePrompts = starterPrompts[language]?.[userRole] || starterPrompts.en.student;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl h-[90vh] max-h-[720px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-700 via-purple-700 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-xs">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  Samjho AI Voice Assistant
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Multilingual
                </span>
              </div>
              <p className="text-xs text-white/80">
                Speaks English, हिंदी, and मराठी • Ask any document or legal right
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Auto-Speak Toggle */}
            <button
              onClick={() => {
                if (autoSpeak) stopAudio();
                setAutoSpeak(!autoSpeak);
              }}
              title={autoSpeak ? 'Auto-Voice: Enabled' : 'Auto-Voice: Disabled'}
              className={`p-2 rounded-xl transition ${
                autoSpeak ? 'bg-white/20 text-white' : 'bg-black/20 text-white/50'
              }`}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="p-2 rounded-xl hover:bg-white/20 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Language selector bar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5 text-indigo-500" />
            <span>Assistant Language:</span>
          </span>

          <div className="flex items-center bg-white dark:bg-slate-700 rounded-lg p-0.5 border border-slate-200 dark:border-slate-600 font-bold">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-md transition ${
                language === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2.5 py-1 rounded-md transition ${
                language === 'hi' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-2.5 py-1 rounded-md transition ${
                language === 'mr' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Starter Prompts Bar */}
        <div className="px-4 py-2.5 bg-indigo-50/40 dark:bg-indigo-950/20 border-b border-indigo-100 dark:border-indigo-900/50 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="text-indigo-900 dark:text-indigo-300 font-semibold shrink-0">Try asking:</span>
          {rolePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={isSending}
              className="shrink-0 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-500 transition text-[11px]"
            >
              💬 {p}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            const isSpeaking = currentlySpeakingId === m.id;

            return (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-white shadow-xs ${
                    isUser ? 'bg-slate-700' : 'bg-gradient-to-tr from-indigo-600 to-amber-500'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-xs shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200 dark:border-slate-700 shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-black/5 dark:border-white/5 text-[10px]">
                    <span className={isUser ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500'}>
                      {m.timestamp} {m.isVoiceInput && '• 🎙️ via Voice'}
                    </span>

                    {!isUser && (
                      <button
                        onClick={() => {
                          if (isSpeaking) {
                            stopAudio();
                          } else {
                            speakMessage(m.id, m.text);
                          }
                        }}
                        className={`flex items-center gap-1 font-bold transition ${
                          isSpeaking ? 'text-amber-500 animate-pulse' : 'text-indigo-600 dark:text-indigo-400 hover:opacity-80'
                        }`}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Stop Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isSending && (
            <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 animate-pulse font-semibold">
              <Bot className="w-4 h-4" />
              <span>Samjho AI is preparing response...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Voice Recording Active Wave Banner */}
        {isListening && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border-t border-rose-200 dark:border-rose-900 flex items-center justify-between text-xs text-rose-800 dark:text-rose-200 font-bold animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>Listening to you in {language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English'}... Speak now!</span>
            </div>
            <button
              onClick={toggleMic}
              className="px-2 py-0.5 rounded bg-rose-600 text-white text-[11px]"
            >
              Stop
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Mic Trigger */}
            <button
              type="button"
              onClick={toggleMic}
              title={isListening ? 'Stop listening' : 'Speak your question'}
              className={`p-3 rounded-2xl transition shadow-sm ${
                isListening
                  ? 'bg-rose-600 text-white animate-bounce'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'कोई भी सवाल पूछें या माइक दबाकर बोलें...'
                  : language === 'mr'
                  ? 'कोणताही प्रश्न विचारा किंवा माइकवर बोला...'
                  : 'Ask about rent, college fines, utility rules, or speak into mic...'
              }
              disabled={isSending}
              className="flex-1 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={isSending || !input.trim()}
              className="p-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 hover:from-indigo-700 text-white font-bold transition disabled:opacity-40 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
