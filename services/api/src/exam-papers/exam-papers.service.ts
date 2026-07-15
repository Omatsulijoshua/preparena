import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ExamPapersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    return this.prisma.examinationPaper.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.examinationPaper.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { body: true, type: true, subject: true },
      }),
      this.prisma.examinationPaper.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findById(id: string) {
    const record = await this.prisma.examinationPaper.findUnique({
      where: { id },
      include: { body: true, type: true, subject: true, sections: { include: { questions: true } } },
    });
    if (!record) throw new NotFoundException('Exam paper not found');
    return record;
  }

  async update(id: string, dto: any) {
    await this.findById(id);
    return this.prisma.examinationPaper.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.examinationPaper.delete({ where: { id } });
  }
}
