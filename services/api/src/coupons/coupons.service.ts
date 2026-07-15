import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    return this.prisma.coupon.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.coupon.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.coupon.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findByCode(code: string) {
    const record = await this.prisma.coupon.findUnique({ where: { code } });
    if (!record) throw new NotFoundException('Coupon not found');
    return record;
  }

  async findById(id: string) {
    const record = await this.prisma.coupon.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Coupon not found');
    return record;
  }

  async update(id: string, dto: any) {
    await this.findById(id);
    return this.prisma.coupon.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.coupon.delete({ where: { id } });
  }
}
