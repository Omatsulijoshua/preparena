import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    return this.prisma.subscription.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.subscription.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: true },
      }),
      this.prisma.subscription.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findById(id: string) {
    const record = await this.prisma.subscription.findUnique({
      where: { id },
      include: { user: true, payments: true },
    });
    if (!record) throw new NotFoundException('Subscription not found');
    return record;
  }

  async findByUser(userId: string) {
    return this.prisma.subscription.findUnique({
      where: { userId },
      include: { payments: true },
    });
  }

  async update(id: string, dto: any) {
    await this.findById(id);
    return this.prisma.subscription.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.subscription.delete({ where: { id } });
  }
}
