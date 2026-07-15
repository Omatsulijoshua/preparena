import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { studentProfile: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(id: string, dto: any) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        avatar: dto.avatar,
        studentProfile: dto.targetExamination || dto.dailyStudyGoal
          ? {
              upsert: {
                create: {
                  targetExamination: dto.targetExamination,
                  targetYear: dto.targetYear,
                  subjects: dto.subjects || [],
                  dailyStudyGoal: dto.dailyStudyGoal,
                  targetScore: dto.targetScore,
                  studySchedule: dto.studySchedule,
                },
                update: {
                  targetExamination: dto.targetExamination,
                  targetYear: dto.targetYear,
                  subjects: dto.subjects || [],
                  dailyStudyGoal: dto.dailyStudyGoal,
                  targetScore: dto.targetScore,
                  studySchedule: dto.studySchedule,
                },
              },
            }
          : undefined,
      },
      include: { studentProfile: true },
    });
  }

  async findAll(query: { page?: number; limit?: number; role?: string; search?: string }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = {};

    if (query.role) where.role = query.role;
    if (query.search) {
      where.OR = [
        { firstName: { contains: query.search, mode: 'insensitive' } },
        { lastName: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      },
    };
  }
}
