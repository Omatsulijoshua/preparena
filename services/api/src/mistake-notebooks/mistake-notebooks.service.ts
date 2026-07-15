import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class MistakeNotebooksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: { userId: string; questionId: string; selectedAnswer?: string; correctAnswer?: string; category: any }) {
    const existing = await this.prisma.mistakeNotebook.findUnique({
      where: { userId_questionId: { userId: dto.userId, questionId: dto.questionId } },
    });
    if (existing) throw new ConflictException('Mistake entry already exists');
    return this.prisma.mistakeNotebook.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.mistakeNotebook.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.mistakeNotebook.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findById(id: string) {
    const record = await this.prisma.mistakeNotebook.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Mistake entry not found');
    return record;
  }

  async findByUser(userId: string) {
    return this.prisma.mistakeNotebook.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.mistakeNotebook.delete({ where: { id } });
  }
}
