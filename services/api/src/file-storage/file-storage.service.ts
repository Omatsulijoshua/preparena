import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class FileStorageService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    return this.prisma.file.create({ data: dto });
  }

  async findAll(query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const [data, total] = await Promise.all([
      this.prisma.file.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.file.count(),
    ]);
    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit), hasNext: page * limit < total, hasPrevious: page > 1 },
    };
  }

  async findById(id: string) {
    const record = await this.prisma.file.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('File not found');
    return record;
  }

  async findByUploader(uploadedBy: string) {
    return this.prisma.file.findMany({
      where: { uploadedBy },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.file.delete({ where: { id } });
  }
}
