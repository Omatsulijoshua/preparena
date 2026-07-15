import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getStudentStats(userId: string) {
    const [attempts, results, profile] = await Promise.all([
      this.prisma.attempt.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: { result: true },
      }),
      this.prisma.result.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.studentProfile.findUnique({ where: { userId } }),
    ]);
    return { attempts, results, profile };
  }

  async getPerformanceOverview(userId: string) {
    const results = await this.prisma.result.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { attempt: { include: { paper: true } } },
    });
    return results;
  }

  async getSubjectPerformance(userId: string) {
    return this.prisma.result.findMany({
      where: { userId },
      select: { subjectBreakdown: true },
    });
  }

  async getTopicPerformance(userId: string) {
    return this.prisma.result.findMany({
      where: { userId },
      select: { topicBreakdown: true },
    });
  }

  async getPlatformStats() {
    const [totalUsers, totalAttempts, totalSchools, totalPapers] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.attempt.count(),
      this.prisma.school.count(),
      this.prisma.examinationPaper.count(),
    ]);
    return { totalUsers, totalAttempts, totalSchools, totalPapers };
  }
}
