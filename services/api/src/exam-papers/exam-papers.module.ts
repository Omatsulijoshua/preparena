import { Module } from '@nestjs/common';
import { ExamPapersController } from './exam-papers.controller';
import { ExamPapersService } from './exam-papers.service';

@Module({
  controllers: [ExamPapersController],
  providers: [ExamPapersService],
  exports: [ExamPapersService],
})
export class ExamPapersModule {}
