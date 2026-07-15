import { Controller, Get, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('teachers')
export class TeachersController {
  constructor(private service: TeachersService) {}

  @Get()
  @ApiOperation({ summary: 'List teachers' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get teacher by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update teacher' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(id, dto);
  }
}
