import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: { userId: string; questionId: string }) {
    const existing = await this.prisma.bookmark.findUnique({
      where: { userId_questionId: { userId: dto.userId, questionId: dto.questionId } },
    });
    if (existing) throw new ConflictException('Bookmark already exists');
    return this.prisma.bookmark.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.bookmark.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { question: true },
      }),
      this.prisma.bookmark.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findById(id: string) {
    const record = await this.prisma.bookmark.findUnique({
      where: { id },
      include: { question: true },
    });
    if (!record) throw new NotFoundException('Bookmark not found');
    return record;
  }

  async findByUser(userId: string) {
    return this.prisma.bookmark.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { question: true },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.bookmark.delete({ where: { id } });
  }
}
