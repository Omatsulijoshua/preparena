import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class VouchersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    return this.prisma.voucher.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.voucher.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.voucher.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findByCode(code: string) {
    const record = await this.prisma.voucher.findUnique({ where: { code } });
    if (!record) throw new NotFoundException('Voucher not found');
    return record;
  }

  async findById(id: string) {
    const record = await this.prisma.voucher.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('Voucher not found');
    return record;
  }

  async update(id: string, dto: any) {
    await this.findById(id);
    return this.prisma.voucher.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.voucher.delete({ where: { id } });
  }
}
