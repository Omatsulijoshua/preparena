export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  CONTENT_ADMIN: 'CONTENT_ADMIN',
  FINANCE_ADMIN: 'FINANCE_ADMIN',
  SUPPORT_ADMIN: 'SUPPORT_ADMIN',
  SCHOOL_ADMIN: 'SCHOOL_ADMIN',
  TEACHER: 'TEACHER',
  PARENT: 'PARENT',
  STUDENT: 'STUDENT',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const EXAMINATION_BODIES = ['WAEC', 'WAEC_GCE', 'NECO', 'NECO_GCE', 'JAMB', 'POST_UTME', 'SAT', 'SCHOOL'] as const;

export type ExaminationBody = (typeof EXAMINATION_BODIES)[number];

export const QUESTION_TYPES = [
  'OBJECTIVE',
  'THEORY',
  'ESSAY',
  'PRACTICAL',
  'COMPREHENSION',
  'DIAGRAM',
  'IMAGE',
  'TABLE',
  'MATHEMATICAL_EXPRESSION',
  'AUDIO',
] as const;

export type QuestionType = (typeof QUESTION_TYPES)[number];

export const DIFFICULTY_LEVELS = ['EASY', 'MEDIUM', 'HARD', 'EXPERT'] as const;

export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];

export const EXAMINATION_MODES = [
  'PRACTICE',
  'TOPIC_PRACTICE',
  'TIMED_PRACTICE',
  'FULL_CBT',
  'DAILY_CHALLENGE',
  'MISTAKE_CORRECTION',
  'CUSTOM_TEST',
  'MULTIPLAYER',
  'SCHOOL_ASSIGNED',
] as const;

export type ExaminationMode = (typeof EXAMINATION_MODES)[number];

export const SUBSCRIPTION_PLANS = ['FREE', 'WEEKLY', 'MONTHLY', 'ANNUAL', 'FAMILY', 'SCHOOL'] as const;

export type SubscriptionPlan = (typeof SUBSCRIPTION_PLANS)[number];

export const PAYMENT_PROVIDERS = [
  'PAYSTACK',
  'FLUTTERWAVE',
  'STRIPE',
  'GOOGLE_PLAY',
  'APPLE_IAP',
  'BANK_TRANSFER',
] as const;

export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[number];

export const MISTAKE_CATEGORIES = [
  'KNOWLEDGE_GAP',
  'CALCULATION_ERROR',
  'QUESTION_MISINTERPRETATION',
  'TIME_PRESSURE',
  'GUESSING',
  'CARELESS_MISTAKE',
  'CHANGED_CORRECT_ANSWER',
] as const;

export type MistakeCategory = (typeof MISTAKE_CATEGORIES)[number];

export const AI_FEATURES = [
  'QUESTION_EXPLANATION',
  'PERSONAL_TUTOR',
  'PERFORMANCE_ANALYSIS',
  'WEAKNESS_IDENTIFICATION',
  'STUDY_PLAN',
  'REVISION_NOTE',
  'FLASHCARD',
  'SIMILAR_QUESTION',
  'QUESTION_GENERATION',
  'THEORY_MARKING',
  'ESSAY_MARKING',
  'HANDWRITING_ANALYSIS',
  'READINESS_PREDICTION',
  'VOICE_TUTOR',
] as const;

export type AIfeature = (typeof AI_FEATURES)[number];

export const SUBSCRIPTION_STATUS = ['ACTIVE', 'EXPIRING', 'EXPIRED', 'CANCELLED', 'GRACE_PERIOD'] as const;

export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[number];

export const THEMES = { LIGHT: 'LIGHT', DARK: 'DARK' } as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const CURRENCIES = ['NGN', 'USD', 'GHS', 'KES', 'ZAR', 'GBP'] as const;

export type Currency = (typeof CURRENCIES)[number];
