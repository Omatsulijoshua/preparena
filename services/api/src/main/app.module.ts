import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from '../common/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { StudentProfilesModule } from '../student-profiles/student-profiles.module';
import { ParentsModule } from '../parents/parents.module';
import { TeachersModule } from '../teachers/teachers.module';
import { SchoolsModule } from '../schools/schools.module';
import { ClassesModule } from '../classes/classes.module';
import { ExaminationsModule } from '../examinations/examinations.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { TopicsModule } from '../topics/topics.module';
import { QuestionsModule } from '../questions/questions.module';
import { ExamPapersModule } from '../exam-papers/exam-papers.module';
import { AttemptsModule } from '../attempts/attempts.module';
import { ResultsModule } from '../results/results.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { StudyPlansModule } from '../study-plans/study-plans.module';
import { BookmarksModule } from '../bookmarks/bookmarks.module';
import { NotesModule } from '../notes/notes.module';
import { MistakeNotebooksModule } from '../mistake-notebooks/mistake-notebooks.module';
import { FlashcardsModule } from '../flashcards/flashcards.module';
import { PaymentsModule } from '../payments/payments.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { CouponsModule } from '../coupons/coupons.module';
import { VouchersModule } from '../vouchers/vouchers.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AiGatewayModule } from '../ai-gateway/ai-gateway.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { OfflineSyncModule } from '../offline-sync/offline-sync.module';
import { LeaderboardsModule } from '../leaderboards/leaderboards.module';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { AppSettingsModule } from '../app-settings/app-settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: 60000,
            limit: config.get<number>('RATE_LIMIT', 60),
          },
        ],
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST', 'localhost'),
          port: config.get<number>('REDIS_PORT', 6379),
        },
      }),
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    StudentProfilesModule,
    ParentsModule,
    TeachersModule,
    SchoolsModule,
    ClassesModule,
    ExaminationsModule,
    SubjectsModule,
    TopicsModule,
    QuestionsModule,
    ExamPapersModule,
    AttemptsModule,
    ResultsModule,
    AnalyticsModule,
    StudyPlansModule,
    BookmarksModule,
    NotesModule,
    MistakeNotebooksModule,
    FlashcardsModule,
    PaymentsModule,
    SubscriptionsModule,
    CouponsModule,
    VouchersModule,
    NotificationsModule,
    AiGatewayModule,
    FileStorageModule,
    OfflineSyncModule,
    LeaderboardsModule,
    AuditLogsModule,
    AppSettingsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
