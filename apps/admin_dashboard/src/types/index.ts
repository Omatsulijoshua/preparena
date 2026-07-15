export interface User {
  id: string;
  email: string | null;
  phone: string | null;
  firstName: string;
  lastName: string;
  avatar: string | null;
  role: 'SUPER_ADMIN' | 'CONTENT_ADMIN' | 'FINANCE_ADMIN' | 'SUPPORT_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isSuspended: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface Question {
  id: string;
  questionText: string;
  type: 'OBJECTIVE' | 'THEORY' | 'ESSAY' | 'PRACTICAL' | 'COMPREHENSION' | 'DIAGRAM' | 'IMAGE' | 'TABLE' | 'MATHEMATICAL_EXPRESSION' | 'AUDIO';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
  marks: number;
  isPublished: boolean;
  subject: { name: string };
  topic: { name: string };
  body: { name: string; code: string };
  createdAt: string;
}

export interface School {
  id: string;
  name: string;
  address: string | null;
  domain: string | null;
  logo: string | null;
  isActive: boolean;
  memberCount?: number;
  createdAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  user?: { firstName: string; lastName: string };
  provider: string;
  providerReference: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'VERIFIED' | 'FAILED' | 'REFUNDED';
  plan?: string;
  createdAt: string;
  verifiedAt: string | null;
}

export interface Examination {
  id: string;
  name: string;
  code: string;
  year: number;
  isActive: boolean;
  questionCount?: number;
  body: { name: string };
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'FIXED' | 'PERCENTAGE';
  value: number;
  maxUses: number | null;
  currentUses: number;
  plan: string | null;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface AIRequest {
  id: string;
  feature: string;
  provider: string;
  model: string;
  tokensUsed: number;
  cost: number;
  latency: number;
  createdAt: string;
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

export interface DashboardStats {
  totalStudents: number;
  totalQuestions: number;
  revenue: number;
  activeExams: number;
  readinessAvg: number;
  activeSubscriptions: number;
  studentGrowth: number;
  revenueGrowth: number;
}
