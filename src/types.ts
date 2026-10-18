export type Language = 'en' | 'hi' | 'mr';

export type Persona = 'student' | 'parent' | 'beginner';

export type UserRole = 'student' | 'renter' | 'citizen' | 'legalaid';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  badge: string;
  cityOrInstitution: string;
  joinedDate: string;
  stats: {
    docsDecoded: number;
    moneySaved: string;
    redFlagsAvoided: number;
    pendingDeadlines: number;
  };
}

export interface Verdict {
  clarityScore: number;
  recommendation: string; // 'Safe to Sign/Proceed' | 'Proceed with Caution' | 'Needs Revision / Do Not Sign Yet'
  reason: string;
}

export interface Deadline {
  date: string;
  description: string;
  urgent: boolean;
}

export interface MoneyItem {
  amount: string;
  description: string;
  type: 'One-time' | 'Deposit' | 'Monthly/Recurring' | 'Penalty' | 'Hidden Fee';
}

export interface RedFlag {
  clause: string;
  explanation: string;
  severity: 'Low' | 'Medium' | 'High';
  whyItMatters: string;
}

export interface ActionItem {
  id: string;
  task: string;
  dueDate: string;
  completed?: boolean;
}

export interface DocumentAnalysis {
  documentType: string;
  oneLiner: string;
  verdict: Verdict;
  summaryBullets: string[];
  deadlines: Deadline[];
  money: MoneyItem[];
  redFlags: RedFlag[];
  actions: ActionItem[];
  suggestedQuestions: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  audioBase64?: string;
  isVoiceInput?: boolean;
}

export interface SampleDoc {
  id: string;
  title: string;
  category: string;
  icon: string;
  badge: string;
  recommendedFor: UserRole;
  rawText: string;
  precomputedAnalysis: Record<Language, DocumentAnalysis>;
}
