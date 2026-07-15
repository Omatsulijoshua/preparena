import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeaderboardsService } from './leaderboards.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Leaderboards')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('leaderboards')
export class LeaderboardsController {
  constructor(private service: LeaderboardsService) {}

  @Get('global')
  @ApiOperation({ summary: 'Get global leaderboard' })
  getGlobalLeaderboard(@Query() query: any) {
    return this.service.getGlobalLeaderboard(query);
  }

  @Get('subject/:subjectId')
  @ApiOperation({ summary: 'Get subject leaderboard' })
  getSubjectLeaderboard(@Param('subjectId') subjectId: string, @Query() query: any) {
    return this.service.getSubjectLeaderboard(subjectId, query);
  }

  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Get school leaderboard' })
  getSchoolLeaderboard(@Param('schoolId') schoolId: string, @Query() query: any) {
    return this.service.getSchoolLeaderboard(schoolId, query);
  }

  @Get('streaks')
  @ApiOperation({ summary: 'Get streak leaderboard' })
  getStreakLeaderboard(@Query() query: any) {
    return this.service.getStreakLeaderboard(query);
  }
}
