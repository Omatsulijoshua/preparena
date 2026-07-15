import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class StudyPlansService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    return this.prisma.studyPlan.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.studyPlan.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.studyPlan.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findById(id: string) {
    const record = await this.prisma.studyPlan.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Study plan not found');
    return record;
  }

  async findByUser(userId: string) {
    return this.prisma.studyPlan.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async update(id: string, dto: any) {
    await this.findById(id);
    return this.prisma.studyPlan.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.studyPlan.delete({ where: { id } });
  }
}
