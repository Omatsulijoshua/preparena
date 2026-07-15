import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ExaminationsService {
  constructor(private prisma: PrismaService) {}

  async createBody(dto: any) {
    return this.prisma.examinationBody.create({ data: dto });
  }

  async findAllBodies(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.examinationBody.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { types: true },
      }),
      this.prisma.examinationBody.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findBodyById(id: string) {
    const record = await this.prisma.examinationBody.findUnique({
      where: { id },
      include: { types: true },
    });
    if (!record) throw new NotFoundException('Examination body not found');
    return record;
  }

  async updateBody(id: string, dto: any) {
    await this.findBodyById(id);
    return this.prisma.examinationBody.update({ where: { id }, data: dto });
  }

  async removeBody(id: string) {
    await this.findBodyById(id);
    return this.prisma.examinationBody.delete({ where: { id } });
  }

  async createType(dto: any) {
    return this.prisma.examinationType.create({ data: dto });
  }

  async findTypeById(id: string) {
    const record = await this.prisma.examinationType.findUnique({
      where: { id },
      include: { body: true },
    });
    if (!record) throw new NotFoundException('Examination type not found');
    return record;
  }

  async updateType(id: string, dto: any) {
    await this.findTypeById(id);
    return this.prisma.examinationType.update({ where: { id }, data: dto });
  }

  async removeType(id: string) {
    await this.findTypeById(id);
    return this.prisma.examinationType.delete({ where: { id } });
  }
}
