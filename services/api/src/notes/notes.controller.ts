import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Notes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('notes')
export class NotesController {
  constructor(private service: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a note' })
  create(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.service.create({ ...dto, userId });
  }

  @Get()
  @ApiOperation({ summary: 'List notes' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('my-notes')
  @ApiOperation({ summary: 'Get current user notes' })
  findByUser(@CurrentUser('id') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get note by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update note' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete note' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
