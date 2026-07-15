import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AppSettingsService {
  constructor(private prisma: PrismaService) {}

  async set(key: string, value: any, userId?: string) {
    return this.prisma.appSetting.upsert({
      where: { userId_key: { userId: userId ?? '', key } },
      update: { value },
      create: { key, value, userId: userId ?? null },
    });
  }

  async get(key: string, userId?: string) {
    const where = userId ? { userId_key: { userId, key } } : { userId_key: { userId: '', key } };
    const record = await this.prisma.appSetting.findUnique({ where });
    if (!record && !userId) throw new NotFoundException(`Setting '${key}' not found`);
    return record;
  }

  async findAll(userId?: string) {
    const where = userId ? { userId } : { userId: null };
    return this.prisma.appSetting.findMany({ where });
  }

  async remove(key: string, userId?: string) {
    const where = userId ? { userId_key: { userId, key } } : { userId_key: { userId: '', key } };
    await this.get(key, userId);
    return this.prisma.appSetting.delete({ where });
  }
}
