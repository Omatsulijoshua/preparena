import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AttemptsService } from './attempts.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Attempts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('attempts')
export class AttemptsController {
  constructor(private attemptsService: AttemptsService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start a new examination attempt' })
  start(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.attemptsService.start({ ...dto, userId });
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit an examination attempt' })
  submit(@Param('id') id: string, @Body() dto: any) {
    return this.attemptsService.submit(id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get attempt by ID' })
  findById(@Param('id') id: string) {
    return this.attemptsService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'List user attempts' })
  findByUser(@CurrentUser('id') userId: string, @Query() query: any) {
    return this.attemptsService.findByUser(userId, query);
  }
}
