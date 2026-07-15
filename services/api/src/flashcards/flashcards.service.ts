import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class FlashcardsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    return this.prisma.flashcard.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.flashcard.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.flashcard.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findById(id: string) {
    const record = await this.prisma.flashcard.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Flashcard not found');
    return record;
  }

  async findByUser(userId: string) {
    return this.prisma.flashcard.findMany({
      where: { userId },
      orderBy: { nextReview: 'asc' },
    });
  }

  async findDueForReview(userId: string) {
    return this.prisma.flashcard.findMany({
      where: { userId, nextReview: { lte: new Date() } },
      orderBy: { nextReview: 'asc' },
    });
  }

  async update(id: string, dto: any) {
    await this.findById(id);
    return this.prisma.flashcard.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.flashcard.delete({ where: { id } });
  }
}
