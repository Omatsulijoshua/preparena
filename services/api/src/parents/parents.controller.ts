import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ParentsService } from './parents.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Parents')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('parents')
export class ParentsController {
  constructor(private service: ParentsService) {}

  @Post('link')
  @ApiOperation({ summary: 'Link a parent to a student' })
  linkChild(@Body() dto: any) {
    return this.service.linkChild(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List parent-child relations' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('my-children')
  @ApiOperation({ summary: 'Get children for current parent' })
  findByParent(@CurrentUser('id') userId: string) {
    return this.service.findByParent(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get parent relation by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove parent-child relation' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
