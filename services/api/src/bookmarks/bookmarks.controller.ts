import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookmarksService } from './bookmarks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Bookmarks')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('bookmarks')
export class BookmarksController {
  constructor(private service: BookmarksService) {}

  @Post()
  @ApiOperation({ summary: 'Bookmark a question' })
  create(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.service.create({ ...dto, userId });
  }

  @Get()
  @ApiOperation({ summary: 'List bookmarks' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('my-bookmarks')
  @ApiOperation({ summary: 'Get current user bookmarks' })
  findByUser(@CurrentUser('id') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bookmark by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove bookmark' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
