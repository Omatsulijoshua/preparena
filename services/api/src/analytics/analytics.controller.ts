import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
  constructor(private service: AnalyticsService) {}

  @Get('student-stats')
  @ApiOperation({ summary: 'Get student statistics' })
  getStudentStats(@CurrentUser('id') userId: string) {
    return this.service.getStudentStats(userId);
  }

  @Get('performance-overview')
  @ApiOperation({ summary: 'Get performance overview' })
  getPerformanceOverview(@CurrentUser('id') userId: string) {
    return this.service.getPerformanceOverview(userId);
  }

  @Get('subject-performance')
  @ApiOperation({ summary: 'Get subject-wise performance' })
  getSubjectPerformance(@CurrentUser('id') userId: string) {
    return this.service.getSubjectPerformance(userId);
  }

  @Get('topic-performance')
  @ApiOperation({ summary: 'Get topic-wise performance' })
  getTopicPerformance(@CurrentUser('id') userId: string) {
    return this.service.getTopicPerformance(userId);
  }

  @Get('platform')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get platform-wide statistics' })
  getPlatformStats() {
    return this.service.getPlatformStats();
  }
}
