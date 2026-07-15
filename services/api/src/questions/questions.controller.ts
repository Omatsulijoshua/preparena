import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Questions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'CONTENT_ADMIN', 'TEACHER')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new question' })
  create(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.questionsService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'List questions with filters' })
  findAll(@Query() query: any) {
    return this.questionsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question by ID' })
  findById(@Param('id') id: string) {
    return this.questionsService.findById(id);
  }

  @Put(':id')
  @Roles('SUPER_ADMIN', 'CONTENT_ADMIN', 'TEACHER')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update a question' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.questionsService.update(id, dto);
  }

  @Post(':id/publish')
  @Roles('SUPER_ADMIN', 'CONTENT_ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Publish a question after review' })
  publish(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.questionsService.publish(id, userId);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'CONTENT_ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete a question' })
  delete(@Param('id') id: string) {
    return this.questionsService.delete(id);
  }
}
