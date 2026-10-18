import { UserProfile, UserRole } from '../types.ts';

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  student: {
    id: 'usr-student-01',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@student.vjti.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    badge: 'Final Year Engg Student',
    cityOrInstitution: 'VJTI Mumbai • Computer Science',
    joinedDate: 'Aug 2026',
    stats: {
      docsDecoded: 14,
      moneySaved: '₹22,500',
      redFlagsAvoided: 9,
      pendingDeadlines: 2,
    },
  },
  renter: {
    id: 'usr-renter-02',
    name: 'Priya Iyer',
    email: 'priya.iyer@fintech.in',
    role: 'renter',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    badge: 'First-Time 1BHK Renter',
    cityOrInstitution: 'Andheri West, Mumbai',
    joinedDate: 'Jan 2026',
    stats: {
      docsDecoded: 8,
      moneySaved: '₹1,50,000',
      redFlagsAvoided: 12,
      pendingDeadlines: 1,
    },
  },
  citizen: {
    id: 'usr-citizen-03',
    name: 'Amitabh Joshi',
    email: 'amitabh.joshi@pune-urban.org',
    role: 'citizen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badge: 'Working Professional & Consumer',
    cityOrInstitution: 'Kothrud, Pune, MH',
    joinedDate: 'Mar 2026',
    stats: {
      docsDecoded: 19,
      moneySaved: '₹48,200',
      redFlagsAvoided: 15,
      pendingDeadlines: 3,
    },
  },
  legalaid: {
    id: 'usr-legalaid-04',
    name: 'Adv. Neha Kulkarni',
    email: 'adv.neha@mumbailawclinic.org',
    role: 'legalaid',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: 'Youth Legal Aid Volunteer',
    cityOrInstitution: 'Bombay High Court Legal Aid Cell',
    joinedDate: 'Nov 2025',
    stats: {
      docsDecoded: 86,
      moneySaved: '₹8,40,000',
      redFlagsAvoided: 74,
      pendingDeadlines: 5,
    },
  },
};

export interface RoleFeatureSpec {
  role: UserRole;
  title: string;
  tagline: string;
  gradient: string;
  accentBg: string;
  accentBorder: string;
  iconName: string;
  features: {
    title: string;
    description: string;
    icon: string;
    category: string;
  }[];
}

export const ROLE_SPECS: Record<UserRole, RoleFeatureSpec> = {
  student: {
    role: 'student',
    title: 'Student Document & Campus Rights Hub',
    tagline: 'Defend your semester, challenge unfair fines, and track scholarship rules without legal headaches.',
    gradient: 'from-amber-500 via-orange-500 to-rose-600',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
    iconName: 'GraduationCap',
    features: [
      {
        title: 'Hall Ticket Cancellation Defender',
        description: 'Instant scan for unlawful examination barring clauses. Generates UGC complaint drafts.',
        icon: 'ShieldAlert',
        category: 'Campus Protection',
      },
      {
        title: 'Hostel Security Deposit Tracker',
        description: 'Audit monsoon surcharges, canteen penalties, and unmetered room utility deductions.',
        icon: 'Home',
        category: 'Hostel Finance',
      },
      {
        title: 'Scholarship Eligibility & Bond Scanner',
        description: 'Detect hidden service bonds or repayment clauses in private scholarship agreements.',
        icon: 'Award',
        category: 'Scholarships',
      },
      {
        title: 'UGC Circulars & Academic Rules Vault',
        description: 'Pre-indexed repository of student-friendly UGC fee refund & grievance circulars.',
        icon: 'BookOpen',
        category: 'Knowledge Base',
      },
    ],
  },
  renter: {
    role: 'renter',
    title: 'Tenant Shield & Rental Agreement Auditor',
    tagline: 'Protect your hard-earned security deposit and spot predatory lock-in clauses before signing.',
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    accentBg: 'bg-indigo-500/10',
    accentBorder: 'border-indigo-500/30',
    iconName: 'Building',
    features: [
      {
        title: 'Deposit Lock-In Forfeiture Buster',
        description: 'Detects illegal 100% deposit forfeiture clauses and suggests fair 1-month penalty terms.',
        icon: 'Lock',
        category: 'Deposit Protection',
      },
      {
        title: 'Painting & Fair Wear-and-Tear Calculator',
        description: 'Check whether compulsory ₹20,000+ repainting charges violate Maharashtra Rent Control rules.',
        icon: 'Paintbrush',
        category: 'Hidden Fees',
      },
      {
        title: 'Landlord Clause Counter-Proposal Drafter',
        description: '1-click WhatsApp/email text proposing polite, legally backed amendments to the broker.',
        icon: 'Send',
        category: 'Negotiation',
      },
      {
        title: 'Model Tenancy Act (MTA) Reference Guide',
        description: 'Plain-language breakdown of 2-month maximum deposit cap and landlord entry notice rules.',
        icon: 'FileCheck',
        category: 'Legal Rights',
      },
    ],
  },
  citizen: {
    role: 'citizen',
    title: 'Citizen Civic & Consumer Defense Center',
    tagline: 'Understand official bureaucratic notices, contest sudden utility surcharges, and file consumer grievances.',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-500/30',
    iconName: 'UserCheck',
    features: [
      {
        title: 'Electricity Act Section 56(1) Disconnection Guard',
        description: 'Audit mandatory 15-day clear notice requirements before power disconnection.',
        icon: 'Zap',
        category: 'Utilities',
      },
      {
        title: 'National Consumer Helpline (NCH 1915) Drafter',
        description: 'Auto-format formal complaints with consumer number, transaction IDs, and exact claims.',
        icon: 'PhoneCall',
        category: 'Grievance',
      },
      {
        title: 'Bank EMI & Hidden Loan Penalty Scanner',
        description: 'Uncover compounding foreclosure charges, floating rate hikes, and processing traps.',
        icon: 'Landmark',
        category: 'Banking',
      },
      {
        title: 'RTI (Right to Information) Formatter',
        description: 'Craft targeted 150-word RTI queries to municipal corporations (BMC, PMC, BBMP).',
        icon: 'FileText',
        category: 'Civic Action',
      },
    ],
  },
  legalaid: {
    role: 'legalaid',
    title: 'Legal Aid & Student Counselor Workbench',
    tagline: 'Triage student and tenant distress calls, audit multi-page documents, and generate client advisories.',
    gradient: 'from-rose-600 via-pink-600 to-indigo-600',
    accentBg: 'bg-rose-500/10',
    accentBorder: 'border-rose-500/30',
    iconName: 'Scale',
    features: [
      {
        title: 'Batch Document Clause Risk Matrix',
        description: 'Cross-compare 5+ lease or campus notices simultaneously to identify recurring traps.',
        icon: 'Layers',
        category: 'Analytics',
      },
      {
        title: 'Mediation & Settlement Letter Generator',
        description: 'Produce balanced, legally grounded conciliation drafts for landlord-tenant disputes.',
        icon: 'Scale',
        category: 'Mediation',
      },
      {
        title: 'Student Distress Escalation Protocol',
        description: 'Step-by-step guidance on escalating university withholding of certificates to High Court.',
        icon: 'AlertOctagon',
        category: 'Escalation',
      },
      {
        title: 'Document Legality Scorecard Exporter',
        description: 'One-click branded PDF advisory report for pro-bono client distribution.',
        icon: 'Printer',
        category: 'Reports',
      },
    ],
  },
};
