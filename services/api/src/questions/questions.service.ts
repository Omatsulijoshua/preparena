import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any, userId: string) {
    return this.prisma.question.create({
      data: {
        ...dto,
        createdBy: userId,
      },
      include: {
        body: true,
        subject: true,
        topic: true,
      },
    });
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    examinationBodyId?: string;
    subjectId?: string;
    topicId?: string;
    type?: string;
    difficulty?: string;
    isPublished?: string;
    search?: string;
  }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = {};

    if (query.examinationBodyId) where.examinationBodyId = query.examinationBodyId;
    if (query.subjectId) where.subjectId = query.subjectId;
    if (query.topicId) where.topicId = query.topicId;
    if (query.type) where.type = query.type;
    if (query.difficulty) where.difficulty = query.difficulty;
    if (query.isPublished !== undefined) where.isPublished = query.isPublished === 'true';
    if (query.search) {
      where.OR = [
        { questionText: { contains: query.search, mode: 'insensitive' } },
        { tags: { has: query.search } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.question.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          body: { select: { name: true, code: true } },
          subject: { select: { name: true, code: true } },
          topic: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.question.count({ where }),
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

  async findById(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        body: true,
        subject: true,
        topic: true,
        typeRelation: true,
      },
    });
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  async update(id: string, dto: any) {
    const existing = await this.prisma.question.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Question not found');

    return this.prisma.question.update({
      where: { id },
      data: dto,
      include: {
        body: true,
        subject: true,
        topic: true,
      },
    });
  }

  async publish(id: string, reviewerId: string) {
    const existing = await this.prisma.question.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Question not found');

    return this.prisma.question.update({
      where: { id },
      data: {
        isPublished: true,
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
      },
    });
  }

  async delete(id: string) {
    const existing = await this.prisma.question.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Question not found');

    await this.prisma.question.delete({ where: { id } });
    return { deleted: true };
  }
}
