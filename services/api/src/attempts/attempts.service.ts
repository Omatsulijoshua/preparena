import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AttemptsService {
  constructor(private prisma: PrismaService) {}

  async start(dto: { examinationPaperId?: string; mode: string; subjectId?: string }) {
    return this.prisma.attempt.create({
      data: {
        userId: '', // Set by controller
        examinationPaperId: dto.examinationPaperId,
        mode: dto.mode as any,
        startedAt: new Date(),
      },
    });
  }

  async submit(id: string, dto: { answers: any[]; timeRemaining: number }) {
    const attempt = await this.prisma.attempt.findUnique({
      where: { id },
      include: { paper: true },
    });

    if (!attempt) throw new NotFoundException('Attempt not found');

    const answers = dto.answers;
    let totalScore = 0;
    let totalMarks = 0;

    const processedAnswers = await Promise.all(
      answers.map(async (answer: any) => {
        const question = await this.prisma.question.findUnique({
          where: { id: answer.questionId },
        });
        if (!question) return null;

        const isCorrect = question.correctAnswer
          ? answer.selectedAnswer === question.correctAnswer
          : null;

        if (isCorrect) totalScore += question.marks;
        totalMarks += question.marks;

        return {
          attemptId: id,
          questionId: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
          isCorrect,
          timeSpent: answer.timeSpent || 0,
          answerChanges: answer.answerChanges || 0,
          isFlagged: answer.isFlagged || false,
        };
      }),
    );

    const validAnswers = processedAnswers.filter((a): a is NonNullable<typeof a> => a !== null);

    await this.prisma.attemptAnswer.createMany({
      data: validAnswers,
    });

    const timeSpent = attempt.paper
      ? attempt.paper.duration * 60 - dto.timeRemaining
      : validAnswers.reduce((sum: number, a: any) => sum + a.timeSpent, 0);

    return this.prisma.attempt.update({
      where: { id },
      data: {
        score: totalScore,
        totalMarks,
        timeSpent,
        timeRemaining: dto.timeRemaining,
        submittedAt: new Date(),
        isCompleted: true,
        isAutoSubmitted: dto.timeRemaining === 0,
      },
      include: {
        answers: true,
      },
    });
  }

  async findById(id: string) {
    const attempt = await this.prisma.attempt.findUnique({
      where: { id },
      include: {
        answers: { include: { question: true } },
        result: true,
        paper: true,
      },
    });
    if (!attempt) throw new NotFoundException('Attempt not found');
    return attempt;
  }

  async findByUser(userId: string, query: { page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 20;

    const [data, total] = await Promise.all([
      this.prisma.attempt.findMany({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          paper: { select: { title: true } },
          result: { select: { percentageScore: true, grade: true } },
        },
      }),
      this.prisma.attempt.count({ where: { userId } }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }
}
