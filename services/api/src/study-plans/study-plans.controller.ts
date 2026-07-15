import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudyPlansService } from './study-plans.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Study Plans')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('study-plans')
export class StudyPlansController {
  constructor(private service: StudyPlansService) {}

  @Post()
  @ApiOperation({ summary: 'Create a study plan' })
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List study plans' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('my-plans')
  @ApiOperation({ summary: 'Get current user study plans' })
  findByUser(@CurrentUser('id') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get study plan by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update study plan' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete study plan' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
