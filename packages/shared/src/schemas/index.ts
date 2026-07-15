import { z } from 'zod';

export const emailSchema = z.string().email().max(255);

export const passwordSchema = z
  .string()
  .min(8)
  .max(128)
  .regex(/[A-Z]/, 'Must contain an uppercase letter')
  .regex(/[a-z]/, 'Must contain a lowercase letter')
  .regex(/[0-9]/, 'Must contain a number');

export const phoneSchema = z.string().regex(/^\+?[1-9]\d{6,14}$/);

export const uuidSchema = z.string().uuid();

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const registerSchema = z
  .object({
    email: emailSchema.optional(),
    phone: phoneSchema.optional(),
    password: passwordSchema,
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    authProvider: z.enum(['EMAIL', 'PHONE', 'GOOGLE', 'APPLE']),
    providerId: z.string().optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Email or phone is required',
  });

export const loginSchema = z.object({
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  password: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const createQuestionSchema = z.object({
  examinationBodyId: z.string().uuid(),
  examinationTypeId: z.string().uuid(),
  subjectId: z.string().uuid(),
  topicId: z.string().uuid(),
  type: z.enum([
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
  ]),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'EXPERT']),
  questionText: z.string().min(1),
  options: z.record(z.string(), z.string()).optional(),
  correctAnswer: z.string().optional(),
  explanation: z.string().optional(),
  marks: z.number().positive().default(1),
  year: z.number().int().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const createAttemptSchema = z.object({
  questionId: z.string().uuid(),
  selectedAnswer: z.string().optional(),
  timeSpent: z.number().int().nonnegative(),
  answerChanges: z.number().int().nonnegative().default(0),
  isFlagged: z.boolean().default(false),
});

export const submitExaminationSchema = z.object({
  examinationPaperId: z.string().uuid(),
  answers: z.array(
    z.object({
      questionId: z.string().uuid(),
      selectedAnswer: z.string().optional(),
      timeSpent: z.number().int().nonnegative(),
      answerChanges: z.number().int().nonnegative(),
      isFlagged: z.boolean(),
    }),
  ),
  timeRemaining: z.number().int().nonnegative(),
});

export const createPaymentSchema = z.object({
  plan: z.enum(['WEEKLY', 'MONTHLY', 'ANNUAL', 'FAMILY', 'SCHOOL']),
  provider: z.enum(['PAYSTACK', 'FLUTTERWAVE', 'STRIPE', 'GOOGLE_PLAY', 'APPLE_IAP', 'BANK_TRANSFER']),
  currency: z.enum(['NGN', 'USD', 'GHS', 'KES', 'ZAR', 'GBP']),
  couponCode: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const verifyPaymentSchema = z.object({
  provider: z.enum(['PAYSTACK', 'FLUTTERWAVE', 'STRIPE', 'GOOGLE_PLAY', 'APPLE_IAP', 'BANK_TRANSFER']),
  reference: z.string(),
  transactionId: z.string().optional(),
});

export const aiRequestSchema = z.object({
  feature: z.enum([
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
  ]),
  prompt: z.string().min(1),
  context: z.record(z.string(), z.unknown()).optional(),
});

export const createClassSchema = z.object({
  name: z.string().min(1).max(200),
  schoolId: z.string().uuid(),
  teacherId: z.string().uuid(),
  subjects: z.array(z.string().uuid()).optional(),
});

export const createSchoolSchema = z.object({
  name: z.string().min(1).max(300),
  address: z.string().optional(),
  domain: z.string().optional(),
  logo: z.string().url().optional(),
  branding: z.record(z.string(), z.unknown()).optional(),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  avatar: z.string().url().optional(),
  targetExamination: z.string().optional(),
  targetYear: z.number().int().optional(),
  subjects: z.array(z.string()).optional(),
  dailyStudyGoal: z.number().int().positive().optional(),
  targetScore: z.number().int().min(0).max(100).optional(),
  studySchedule: z.record(z.string(), z.unknown()).optional(),
});

export const syncOfflineSchema = z.object({
  attempts: z
    .array(
      z.object({
        questionId: z.string().uuid(),
        selectedAnswer: z.string().optional(),
        timeSpent: z.number().int(),
        answerChanges: z.number().int(),
        isFlagged: z.boolean(),
        attemptedAt: z.string().datetime(),
      }),
    )
    .optional(),
  bookmarks: z
    .array(
      z.object({
        questionId: z.string().uuid(),
        createdAt: z.string().datetime(),
      }),
    )
    .optional(),
  notes: z
    .array(
      z.object({
        questionId: z.string().uuid(),
        content: z.string(),
        createdAt: z.string().datetime(),
        updatedAt: z.string().datetime(),
      }),
    )
    .optional(),
  studyTime: z
    .array(
      z.object({
        duration: z.number().int(),
        date: z.string(),
      }),
    )
    .optional(),
});
