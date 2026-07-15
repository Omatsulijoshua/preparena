import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@preparena.com' },
    update: {},
    create: {
      email: 'admin@preparena.com',
      firstName: 'Super',
      lastName: 'Admin',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      isEmailVerified: true,
      authProvider: 'EMAIL',
    },
  });

  // Create student user
  const studentPassword = await bcrypt.hash('Student@123', 12);
  const student = await prisma.user.upsert({
    where: { email: 'student@preparena.com' },
    update: {},
    create: {
      email: 'student@preparena.com',
      firstName: 'John',
      lastName: 'Student',
      passwordHash: studentPassword,
      role: 'STUDENT',
      isEmailVerified: true,
      authProvider: 'EMAIL',
      studentProfile: {
        create: {
          targetExamination: 'WAEC',
          targetYear: 2026,
          subjects: ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology'],
          dailyStudyGoal: 120,
          targetScore: 85,
          readinessScore: 72,
          currentStreak: 5,
          longestStreak: 12,
          totalStudyTime: 3600,
          totalQuestionsAttempted: 450,
          averageScore: 68.5,
        },
      },
    },
  });

  // Create examination bodies
  const bodies = [
    { name: 'West African Examinations Council', code: 'WAEC', description: 'WAEC examination body' },
    { name: 'WAEC GCE', code: 'WAEC_GCE', description: 'WAEC GCE examination' },
    { name: 'National Examinations Council', code: 'NECO', description: 'NECO examination body' },
    { name: 'NECO GCE', code: 'NECO_GCE', description: 'NECO GCE examination' },
    { name: 'Joint Admissions and Matriculation Board', code: 'JAMB', description: 'JAMB/UTME examination' },
    { name: 'Post UTME', code: 'POST_UTME', description: 'Post-UTME screening' },
    { name: 'Scholastic Assessment Test', code: 'SAT', description: 'SAT examination' },
  ];

  for (const body of bodies) {
    await prisma.examinationBody.upsert({
      where: { code: body.code },
      update: {},
      create: body,
    });
  }

  // Create subjects
  const subjects = [
    { name: 'Mathematics', code: 'MATH', description: 'Mathematics subject' },
    { name: 'English Language', code: 'ENG', description: 'English Language subject' },
    { name: 'Physics', code: 'PHY', description: 'Physics subject' },
    { name: 'Chemistry', code: 'CHEM', description: 'Chemistry subject' },
    { name: 'Biology', code: 'BIO', description: 'Biology subject' },
    { name: 'Economics', code: 'ECO', description: 'Economics subject' },
    { name: 'Government', code: 'GOV', description: 'Government subject' },
    { name: 'Geography', code: 'GEO', description: 'Geography subject' },
    { name: 'Commerce', code: 'COM', description: 'Commerce subject' },
    { name: 'Accounting', code: 'ACC', description: 'Accounting subject' },
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { code: subject.code },
      update: {},
      create: subject,
    });
  }

  // Create subscription plans
  await prisma.coupon.upsert({
    where: { code: 'WELCOME50' },
    update: {},
    create: {
      code: 'WELCOME50',
      type: 'PERCENTAGE',
      value: 50,
      maxUses: 100,
      isActive: true,
    },
  });

  await prisma.coupon.upsert({
    where: { code: 'SAVE1000' },
    update: {},
    create: {
      code: 'SAVE1000',
      type: 'FIXED',
      value: 1000,
      maxUses: 50,
      isActive: true,
    },
  });

  // Create AI settings
  await prisma.appSetting.upsert({
    where: { id: 'ai-default-provider' },
    update: {},
    create: {
      key: 'ai_default_provider',
      value: { provider: 'openai', model: 'gpt-4o' },
    },
  });

  console.log('Seed completed successfully');
  console.log(`Admin email: admin@preparena.com / Admin@123`);
  console.log(`Student email: student@preparena.com / Student@123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
