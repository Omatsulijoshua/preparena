import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ParentsService {
  constructor(private prisma: PrismaService) {}

  async linkChild(dto: { parentId: string; studentId: string; relationship?: string }) {
    return this.prisma.parentChild.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.parentChild.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.parentChild.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findById(id: string) {
    const record = await this.prisma.parentChild.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Parent relation not found');
    return record;
  }

  async findByParent(parentId: string) {
    return this.prisma.parentChild.findMany({
      where: { parentId },
      include: { student: true },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.parentChild.delete({ where: { id } });
  }
}
