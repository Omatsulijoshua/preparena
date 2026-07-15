import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FlashcardsService } from './flashcards.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Flashcards')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('flashcards')
export class FlashcardsController {
  constructor(private service: FlashcardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a flashcard' })
  create(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.service.create({ ...dto, userId });
  }

  @Get()
  @ApiOperation({ summary: 'List flashcards' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('my-cards')
  @ApiOperation({ summary: 'Get current user flashcards' })
  findByUser(@CurrentUser('id') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get('due-review')
  @ApiOperation({ summary: 'Get flashcards due for review' })
  findDueForReview(@CurrentUser('id') userId: string) {
    return this.service.findDueForReview(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get flashcard by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update flashcard' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete flashcard' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
