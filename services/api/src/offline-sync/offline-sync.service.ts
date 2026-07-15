import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class OfflineSyncService {
  constructor(private prisma: PrismaService) {}

  async syncPull(userId: string, lastSyncAt: string) {
    const since = lastSyncAt ? new Date(lastSyncAt) : new Date(0);
    const [bookmarks, notes, flashcards, mistakeNotebooks, studyPlans] = await Promise.all([
      this.prisma.bookmark.findMany({ where: { userId, createdAt: { gte: since } } }),
      this.prisma.note.findMany({ where: { userId, updatedAt: { gte: since } } }),
      this.prisma.flashcard.findMany({ where: { userId, updatedAt: { gte: since } } }),
      this.prisma.mistakeNotebook.findMany({ where: { userId, createdAt: { gte: since } } }),
      this.prisma.studyPlan.findMany({ where: { userId, createdAt: { gte: since } } }),
    ]);
    return { bookmarks, notes, flashcards, mistakeNotebooks, studyPlans, syncedAt: new Date().toISOString() };
  }

  async syncPush(userId: string, dto: { bookmarks?: any[]; notes?: any[]; flashcards?: any[]; mistakeNotebooks?: any[] }) {
    const results: Record<string, number> = {};
    if (dto.bookmarks?.length) {
      for (const item of dto.bookmarks) {
        await this.prisma.bookmark.upsert({ where: { userId_questionId: { userId, questionId: item.questionId } }, update: {}, create: { userId, questionId: item.questionId } });
      }
      results.bookmarks = dto.bookmarks.length;
    }
    if (dto.notes?.length) {
      for (const item of dto.notes) {
        await this.prisma.note.create({ data: { userId, ...item } });
      }
      results.notes = dto.notes.length;
    }
    if (dto.flashcards?.length) {
      for (const item of dto.flashcards) {
        await this.prisma.flashcard.create({ data: { userId, ...item } });
      }
      results.flashcards = dto.flashcards.length;
    }
    if (dto.mistakeNotebooks?.length) {
      for (const item of dto.mistakeNotebooks) {
        await this.prisma.mistakeNotebook.upsert({ where: { userId_questionId: { userId, questionId: item.questionId } }, update: { selectedAnswer: item.selectedAnswer, correctAnswer: item.correctAnswer, category: item.category }, create: { userId, ...item } });
      }
      results.mistakeNotebooks = dto.mistakeNotebooks.length;
    }
    return { synced: results, syncedAt: new Date().toISOString() };
  }
}
