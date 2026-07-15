import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class LeaderboardsService {
  constructor(private prisma: PrismaService) {}

  async getGlobalLeaderboard(query: { limit?: number }) {
    const limit = query.limit || 50;
    return this.prisma.studentProfile.findMany({
      orderBy: { averageScore: 'desc' },
      take: limit,
      include: { user: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
    });
  }

  async getSubjectLeaderboard(subjectId: string, query: { limit?: number }) {
    const limit = query.limit || 50;
    return this.prisma.result.findMany({
      where: {},
      orderBy: { percentageScore: 'desc' },
      take: limit,
      include: { user: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
    });
  }

  async getSchoolLeaderboard(schoolId: string, query: { limit?: number }) {
    const limit = query.limit || 50;
    return this.prisma.studentProfile.findMany({
      where: { user: { schoolMemberships: { some: { schoolId } } } },
      orderBy: { averageScore: 'desc' },
      take: limit,
      include: { user: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
    });
  }

  async getStreakLeaderboard(query: { limit?: number }) {
    const limit = query.limit || 50;
    return this.prisma.studentProfile.findMany({
      orderBy: { currentStreak: 'desc' },
      take: limit,
      include: { user: { select: { id: true, firstName: true, lastName: true, avatar: true } } },
    });
  }
}
