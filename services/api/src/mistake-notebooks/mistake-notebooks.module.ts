import { Module } from '@nestjs/common';
import { MistakeNotebooksController } from './mistake-notebooks.controller';
import { MistakeNotebooksService } from './mistake-notebooks.service';

@Module({
  controllers: [MistakeNotebooksController],
  providers: [MistakeNotebooksService],
  exports: [MistakeNotebooksService],
})
export class MistakeNotebooksModule {}
