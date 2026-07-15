import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Classes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('classes')
export class ClassesController {
  constructor(private service: ClassesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a class' })
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List classes' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get class by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update class' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete class' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
