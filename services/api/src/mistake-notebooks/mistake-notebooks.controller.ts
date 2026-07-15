import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MistakeNotebooksService } from './mistake-notebooks.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Mistake Notebooks')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('mistake-notebooks')
export class MistakeNotebooksController {
  constructor(private service: MistakeNotebooksService) {}

  @Post()
  @ApiOperation({ summary: 'Add a mistake entry' })
  create(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.service.create({ ...dto, userId });
  }

  @Get()
  @ApiOperation({ summary: 'List mistake entries' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('my-mistakes')
  @ApiOperation({ summary: 'Get current user mistakes' })
  findByUser(@CurrentUser('id') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get mistake entry by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete mistake entry' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
