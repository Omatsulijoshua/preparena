import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TopicsService } from './topics.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Topics')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('topics')
export class TopicsController {
  constructor(private service: TopicsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'CONTENT_ADMIN')
  @ApiOperation({ summary: 'Create a topic' })
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List topics' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('by-subject/:subjectId')
  @ApiOperation({ summary: 'Get topics by subject' })
  findBySubject(@Param('subjectId') subjectId: string) {
    return this.service.findBySubject(subjectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get topic by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @Roles('SUPER_ADMIN', 'CONTENT_ADMIN')
  @ApiOperation({ summary: 'Update topic' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'CONTENT_ADMIN')
  @ApiOperation({ summary: 'Delete topic' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
