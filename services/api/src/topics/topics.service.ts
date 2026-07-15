import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    return this.prisma.topic.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.topic.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { order: 'asc' },
      }),
      this.prisma.topic.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findById(id: string) {
    const record = await this.prisma.topic.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Topic not found');
    return record;
  }

  async findBySubject(subjectId: string) {
    return this.prisma.topic.findMany({
      where: { subjectId },
      orderBy: { order: 'asc' },
    });
  }

  async update(id: string, dto: any) {
    await this.findById(id);
    return this.prisma.topic.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.topic.delete({ where: { id } });
  }
}
