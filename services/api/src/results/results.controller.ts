import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ResultsService } from './results.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Results')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @Post('generate/:attemptId')
  @ApiOperation({ summary: 'Generate result from attempt' })
  generate(@Param('attemptId') attemptId: string) {
    return this.resultsService.generateFromAttempt(attemptId);
  }
}
