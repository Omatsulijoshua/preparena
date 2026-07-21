import type { Role, QuestionType, DifficultyLevel, ExaminationMode, SubscriptionPlan, PaymentProvider, MistakeCategory, AIfeature, SubscriptionStatus, Currency } from '../constants';

export interface User {
  id: string;
  email: string | null;
  phone: string | null;
  firstName: string;
  lastName: string;
  avatar: string | null;
  role: Role;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  authProvider: 'EMAIL' | 'PHONE' | 'GOOGLE' | 'APPLE';
  providerId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface StudentProfile {
  id: string;
  userId: string;
  targetExamination: string | null;
  targetYear: number | null;
  subjects: string[];
  dailyStudyGoal: number | null;
  targetScore: number | null;
  studySchedule: Record<string, unknown> | null;
  readinessScore: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string | null;
  totalStudyTime: number;
  totalQuestionsAttempted: number;
  averageScore: number;
}

export interface ExaminationType {
  id: string;
  examinationBodyId: string;
  name: string;
  code: string;
  year: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string | null;
  icon: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  description: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  examinationBodyId: string;
  examinationTypeId: string;
  subjectId: string;
  topicId: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  questionText: string;
  options: Record<string, string> | null;
  correctAnswer: string | null;
  explanation: string | null;
  marks: number;
  year: number | null;
  tags: string[];
  metadata: Record<string, unknown> | null;
  isPublished: boolean;
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExaminationPaper {
  id: string;
  examinationBodyId: string;
  examinationTypeId: string;
  title: string;
  description: string | null;
  duration: number;
  totalMarks: number;
  instructions: string | null;
  sections: ExaminationSection[];
  isPublished: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExaminationSection {
  id: string;
  examinationPaperId: string;
  title: string;
  instructions: string | null;
  questions: string[];
  duration: number | null;
  order: number;
}

export interface Attempt {
  id: string;
  userId: string;
  examinationPaperId: string | null;
  mode: ExaminationMode;
  answers: AnswerRecord[];
  score: number | null;
  totalMarks: number | null;
  timeSpent: number;
  timeRemaining: number | null;
  startedAt: string;
  submittedAt: string | null;
  isCompleted: boolean;
  isAutoSubmitted: boolean;
  timeManagementScore: number | null;
  readinessScore: number | null;
  createdAt: string;
}

export interface AnswerRecord {
  questionId: string;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  timeSpent: number;
  answerChanges: number;
  isFlagged: boolean;
}

export interface Result {
  id: string;
  attemptId: string;
  userId: string;
  totalScore: number;
  totalMarks: number;
  percentageScore: number;
  grade: string | null;
  subjectBreakdown: SubjectPerformance[];
  topicBreakdown: TopicPerformance[];
  timeAnalysis: TimeAnalysis;
  mistakeAnalysis: MistakeAnalysis;
  recommendations: string[];
  createdAt: string;
}

export interface SubjectPerformance {
  subjectId: string;
  subjectName: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  questionsAttempted: number;
  questionsCorrect: number;
}

export interface TopicPerformance {
  topicId: string;
  topicName: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  questionsAttempted: number;
}

export interface TimeAnalysis {
  totalTimeSpent: number;
  averageTimePerQuestion: number;
  timePerQuestion: Record<string, number>;
  questionsAnsweredTooQuickly: string[];
  questionsAnsweredTooSlowly: string[];
  unansweredQuestions: string[];
  timeManagementScore: number;
  timePerSection: Record<string, number>;
}

export interface MistakeAnalysis {
  totalMistakes: number;
  mistakes: MistakeRecord[];
  categories: Record<MistakeCategory, number>;
  repeatedMistakes: string[];
  weakestTopics: string[];
}

export interface MistakeRecord {
  questionId: string;
  questionText: string;
  selectedAnswer: string | null;
  correctAnswer: string | null;
  category: MistakeCategory;
  topicId: string;
  topicName: string;
  subjectName: string;
  attemptedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  gracePeriodEnd: string | null;
  autoRenew: boolean;
  paymentProvider: PaymentProvider | null;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  subscriptionId: string | null;
  provider: PaymentProvider;
  providerReference: string;
  transactionId: string | null;
  amount: number;
  currency: Currency;
  status: 'PENDING' | 'VERIFIED' | 'FAILED' | 'REFUNDED';
  metadata: Record<string, unknown> | null;
  verifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'FIXED' | 'PERCENTAGE';
  value: number;
  maxUses: number | null;
  currentUses: number;
  plan: SubscriptionPlan | null;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface Voucher {
  id: string;
  code: string;
  plan: SubscriptionPlan;
  duration: number;
  maxUses: number | null;
  currentUses: number;
  schoolId: string | null;
  resellerId: string | null;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface School {
  id: string;
  name: string;
  address: string | null;
  domain: string | null;
  logo: string | null;
  branding: Record<string, unknown> | null;
  subscriptionId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  name: string;
  schoolId: string;
  teacherId: string;
  subjects: string[];
  studentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ParentChild {
  id: string;
  parentId: string;
  studentId: string;
  relationship: string | null;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  isRead: boolean;
  createdAt: string;
}

export interface AIRequest {
  id: string;
  userId: string;
  feature: AIfeature;
  prompt: string;
  response: string | null;
  provider: string;
  model: string;
  tokensUsed: number;
  cost: number;
  latency: number;
  isCached: boolean;
  createdAt: string;
}

export interface AIResponse {
  success: boolean;
  data: unknown;
  error: string | null;
  confidence: number | null;
  cached: boolean;
}

export interface MarkingResult {
  estimatedScore: number;
  maximumScore: number;
  correctPoints: string[];
  missingPoints: string[];
  incorrectClaims: string[];
  grammarObservations: string[];
  structureObservations: string[];
  improvedAnswer: string;
  recommendedTopics: string[];
  confidenceScore: number;
  notice: string;
}

export interface StudyPlan {
  id: string;
  userId: string;
  date: string;
  dailyGoal: number;
  subjects: StudyPlanSubject[];
  recommendations: string[];
  isCompleted: boolean;
  createdAt: string;
}

export interface StudyPlanSubject {
  subjectId: string;
  subjectName: string;
  topics: string[];
  duration: number;
  isCompleted: boolean;
}

export interface Flashcard {
  id: string;
  userId: string;
  questionId: string | null;
  front: string;
  back: string;
  topicId: string | null;
  difficulty: DifficultyLevel;
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReview: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaderboardEntry {
  userId: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  score: number;
  accuracy: number;
  streak: number;
  rank: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface APIResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  message: string | null;
  meta?: Record<string, unknown>;
}
