import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware
app.use(express.json({ limit: '35mb' }));

// Initialize Google Gemini SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const analysisResponseSchema = {
  type: Type.OBJECT,
  properties: {
    documentType: {
      type: Type.STRING,
      description: "Specific type of document (e.g. 'Residential Lease Agreement', 'University Fee Circular', 'MSEDCL Electricity Disconnection Notice')",
    },
    oneLiner: {
      type: Type.STRING,
      description: "A single, clear sentence summarizing what this document is and what it means for the reader",
    },
    verdict: {
      type: Type.OBJECT,
      properties: {
        clarityScore: {
          type: Type.NUMBER,
          description: "Clarity and safety score from 0 to 100. Lower means risky/opaque, higher means clear/standard.",
        },
        recommendation: {
          type: Type.STRING,
          description: "Verdict: exactly one of 'Safe to Sign/Proceed', 'Proceed with Caution', or 'Needs Revision / Do Not Sign Yet'",
        },
        reason: {
          type: Type.STRING,
          description: "Concise 1-2 sentence rationale behind the verdict",
        },
      },
      required: ["clarityScore", "recommendation", "reason"],
    },
    summaryBullets: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Maximum 5 simple, bite-sized key takeaways of the document",
    },
    deadlines: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          date: {
            type: Type.STRING,
            description: "Date string (YYYY-MM-DD or readable text like '3rd of every month')",
          },
          description: {
            type: Type.STRING,
            description: "What happens on or by this date",
          },
          urgent: {
            type: Type.BOOLEAN,
            description: "True if deadline is within 7 days or overdue",
          },
        },
        required: ["date", "description", "urgent"],
      },
      description: "Key dates and deadlines found in the document",
    },
    money: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          amount: {
            type: Type.STRING,
            description: "Amount formatted in INR (e.g. '₹35,000', '₹1,000 / day')",
          },
          description: {
            type: Type.STRING,
            description: "What this fee or charge is for",
          },
          type: {
            type: Type.STRING,
            description: "Fee category: 'One-time' | 'Deposit' | 'Monthly/Recurring' | 'Penalty' | 'Hidden Fee'",
          },
        },
        required: ["amount", "description", "type"],
      },
      description: "All financial figures, fees, penalties, deposits, or surcharges",
    },
    redFlags: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          clause: {
            type: Type.STRING,
            description: "EXACT verbatim clause quoted directly from the uploaded document text",
          },
          explanation: {
            type: Type.STRING,
            description: "Plain-language translation of why this clause is risky or one-sided",
          },
          severity: {
            type: Type.STRING,
            description: "Severity level: 'Low' | 'Medium' | 'High'",
          },
          whyItMatters: {
            type: Type.STRING,
            description: "Practical real-life consequence (e.g., 'If you vacate in month 8, you forfeit ₹30,000 deposit')",
          },
        },
        required: ["clause", "explanation", "severity", "whyItMatters"],
      },
      description: "Unfair clauses, high penalties, hidden deductions, or legal traps",
    },
    actions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          task: {
            type: Type.STRING,
            description: "Clear, concrete action step to take",
          },
          dueDate: {
            type: Type.STRING,
            description: "When this action should be taken",
          },
        },
        required: ["task", "dueDate"],
      },
      description: "Actionable checklist steps for the user",
    },
    suggestedQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3 highly relevant follow-up questions specific to this document",
    },
  },
  required: [
    "documentType",
    "oneLiner",
    "verdict",
    "summaryBullets",
    "deadlines",
    "money",
    "redFlags",
    "actions",
    "suggestedQuestions",
  ],
};

function getSystemInstruction(language: string, persona: string): string {
  let langDesc = "English (clear, accessible modern Indian English)";
  if (language === 'hi') {
    langDesc = "Hindi (natural, engaging Hindi + conversational Hinglish phrasing that young Indians and college students find clear and relatable, avoiding impenetrable Sanskrit terms)";
  } else if (language === 'mr') {
    langDesc = "Marathi (fluent, natural, accessible Marathi that any Marathi speaker or student easily understands)";
  }

  let personaDesc = "College Student: casual, direct, uses relatable everyday analogies (hostel rules, canteen fines, exam timetables), calls out student risks.";
  if (persona === 'parent') {
    personaDesc = "Parent: respectful, clear, structured, deeply focused on safety, cost transparency, and financial protections.";
  } else if (persona === 'beginner') {
    personaDesc = "Complete Beginner: ultra-simple, zero legal jargon, short crisp sentences, total clarity.";
  }

  return `You are Samjho (समझो) — an AI assistant designed specifically for students, first-time renters, and young adults in India to decode dense legal, rental, and bureaucratic documents in simple, everyday language.
You are NOT a lawyer or financial advisor. You provide objective, transparent breakdowns.

Key Rules:
1. Target Output Language: Output ALL content (bullet points, one-liner, explanations, whyItMatters, tasks, suggestedQuestions) in: ${langDesc}.
2. Persona Tone: Adapt the phrasing to match persona: ${personaDesc}.
3. Verbatim Quoting: For the "redFlags.clause" field, ALWAYS quote the exact sentence from the provided document text without alteration, so the user can locate it in their paper.
4. Grounding: Rely strictly on what is written or visible in the document. Never invent unmentioned penalties or phone numbers. If text is blurry or cropped, state that part is unreadable.
5. Currency: Express all financial numbers in Indian Rupees with ₹ symbol (e.g. ₹35,000).
6. Deadlines: Evaluate urgency based on current date (current year is 2026). If within 7 days or overdue, mark urgent: true.`;
}

// POST /api/analyze
app.post('/api/analyze', async (req, res) => {
  try {
    const { text, fileData, mimeType, language = 'en', persona = 'student' } = req.body;

    if (!text && !fileData) {
      return res.status(400).json({ error: 'Please provide either document text or an uploaded file.' });
    }

    const parts: any[] = [];

    if (fileData) {
      // fileData is expected to be a base64 string (without data: URL prefix, or sanitized)
      const cleanBase64 = fileData.replace(/^data:[^;]+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: cleanBase64,
        },
      });
    }

    const promptText = text
      ? `Please analyze this document in detail according to the specified schema:\n\n${text}`
      : `Please inspect this document image/PDF in detail, read all the fine print, extract key dates, financial terms, and red flags according to the specified schema.`;

    parts.push({ text: promptText });

    const systemInstruction = getSystemInstruction(language, persona);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: analysisResponseSchema as any,
        temperature: 0.2,
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error('Empty response received from Gemini.');
    }

    const parsedData = JSON.parse(responseText);

    // Ensure action items have IDs for checklist interactivity
    if (Array.isArray(parsedData.actions)) {
      parsedData.actions = parsedData.actions.map((act: any, idx: number) => ({
        ...act,
        id: act.id || `act-${idx + 1}-${Date.now()}`,
        completed: false,
      }));
    }

    return res.json({ success: true, analysis: parsedData });
  } catch (err: any) {
    console.error('Error in /api/analyze:', err);
    return res.status(500).json({
      error: err.message || 'Failed to analyze document. Please check the document format and try again.',
    });
  }
});

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const { question, documentContext, history = [], language = 'en' } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    let langNote = 'Respond in English.';
    let unfindableFallback = 'I cannot find this information in the provided document.';
    if (language === 'hi') {
      langNote = 'Respond in natural, friendly Hindi / Hinglish.';
      unfindableFallback = 'मुझे प्रदान किए गए दस्तावेज़ में यह जानकारी नहीं मिली।';
    } else if (language === 'mr') {
      langNote = 'Respond in natural Marathi.';
      unfindableFallback = 'मला दिलेल्या दस्तऐवजात ही माहिती सापडली नाही.';
    }

    const systemInstruction = `You are "Ask Samjho", an AI assistant grounded strictly in the user's provided document.
Document context:
"""
${documentContext || 'No document text available.'}
"""

STRICT GROUNDING RULE:
You MUST answer follow-up questions using strictly the context of the provided document above.
If the requested information (like a phone number, specific date, landlord's email, or unstated policy) CANNOT be found or inferred with certainty from the provided document, you MUST explicitly respond with:
"${unfindableFallback}"
Do not guess, hallucinate external details, or provide generic legal advice.
${langNote}
Keep your answer clear, concise, and helpful.`;

    const contents: any[] = [];

    // Append prior conversational turns if any
    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: question }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    const reply = response.text || unfindableFallback;
    return res.json({ success: true, reply });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({
      error: err.message || 'Failed to generate chat response.',
    });
  }
});

// POST /api/assistant-chat (Global Multilingual Legal & Document AI Assistant)
app.post('/api/assistant-chat', async (req, res) => {
  try {
    const { message, language = 'en', userRole = 'citizen', history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    let langInstruction = 'English (friendly, modern Indian context).';
    if (language === 'hi') {
      langInstruction = 'Hindi (warm, conversational Hindi + natural Hinglish so young adults and students feel comfortable).';
    } else if (language === 'mr') {
      langInstruction = 'Marathi (clear, natural, everyday Marathi used in Maharashtra).';
    }

    const systemInstruction = `You are Samjho AI (समझो साथी) — India's friendliest, most empowering document & civic assistant.
You specialize in helping students, first-time renters, and citizens decode:
1. Rental agreements, deposits, lock-in periods, Model Tenancy Act & Maharashtra Rent Control.
2. College hostel dues, fee circulars, mid-sem hall ticket disputes, scholarship forms, UGC rules.
3. Electricity disconnection notices (MSEDCL/BESCOM/BSES), municipal taxes, water bills, consumer complaints.
4. Insurance fine print, loan agreements, RTI drafting, bank penalty waivers.

User Profile: ${userRole.toUpperCase()}
Language Requirement: Respond strictly in ${langInstruction}
Tone: Empathetic, practical, action-oriented, protective of consumer/student rights.
Always explain things simply without dense legal jargon. Format replies with clear bullet points, actionable tips, and if applicable, mention exact Indian regulatory bodies (e.g., UGC Grievance Portal, National Consumer Helpline 1915, Rent Authority).
Add a brief reminder that this is civic guidance, not formal legal advocacy.`;

    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-6)) {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.3,
      },
    });

    const reply = response.text || 'I am here to help you understand your documents and rights.';
    return res.json({ success: true, reply });
  } catch (err: any) {
    console.error('Error in /api/assistant-chat:', err);
    return res.status(500).json({ error: err.message || 'Chat service temporarily unavailable.' });
  }
});

// POST /api/tts (Voice Synthesis via Gemini Flash Lite TTS)
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS.' });
    }

    // Clip long text to first 300 chars for snappy speech
    const cleanText = text.replace(/[*#_`]/g, '').slice(0, 320);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [{ text: cleanText }],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice as any },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio returned' });
    }

    return res.json({ success: true, audioBase64: base64Audio });
  } catch (err: any) {
    console.error('Error in /api/tts:', err);
    // Don't crash; client falls back to browser SpeechSynthesis API
    return res.status(500).json({ error: 'TTS fallback recommended', details: err.message });
  }
});

// POST /api/translate-analysis
app.post('/api/translate-analysis', async (req, res) => {
  try {
    const { analysis, targetLanguage, persona = 'student' } = req.body;
    if (!analysis || !targetLanguage) {
      return res.status(400).json({ error: 'Analysis object and targetLanguage are required.' });
    }

    const systemInstruction = getSystemInstruction(targetLanguage, persona);

    const prompt = `Translate and adapt the following structured analysis JSON into the target language (${targetLanguage}) while preserving the exact schema structure. Maintain the quoted clause in "redFlags.clause" verbatim as it appeared in the original document, but translate all explanations, summaries, whyItMatters, tasks, and questions naturally.
Analysis to adapt:
${JSON.stringify(analysis, null, 2)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: analysisResponseSchema as any,
        temperature: 0.1,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (Array.isArray(parsed.actions)) {
      parsed.actions = parsed.actions.map((act: any, idx: number) => ({
        ...act,
        id: act.id || `act-${idx + 1}-${Date.now()}`,
        completed: analysis.actions?.[idx]?.completed || false,
      }));
    }

    return res.json({ success: true, analysis: parsed });
  } catch (err: any) {
    console.error('Error in /api/translate-analysis:', err);
    return res.status(500).json({ error: 'Failed to translate analysis.' });
  }
});

async function start() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Samjho server running on http://0.0.0.0:${PORT}`);
  });
}

start();
