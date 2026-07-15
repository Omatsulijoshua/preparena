import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExaminationsService } from './examinations.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Examinations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('examinations')
export class ExaminationsController {
  constructor(private service: ExaminationsService) {}

  @Post('bodies')
  @ApiOperation({ summary: 'Create an examination body' })
  createBody(@Body() dto: any) {
    return this.service.createBody(dto);
  }

  @Get('bodies')
  @ApiOperation({ summary: 'List examination bodies' })
  findAllBodies(@Query() query: any) {
    return this.service.findAllBodies(query);
  }

  @Get('bodies/:id')
  @ApiOperation({ summary: 'Get examination body by ID' })
  findBodyById(@Param('id') id: string) {
    return this.service.findBodyById(id);
  }

  @Put('bodies/:id')
  @ApiOperation({ summary: 'Update examination body' })
  updateBody(@Param('id') id: string, @Body() dto: any) {
    return this.service.updateBody(id, dto);
  }

  @Delete('bodies/:id')
  @ApiOperation({ summary: 'Delete examination body' })
  removeBody(@Param('id') id: string) {
    return this.service.removeBody(id);
  }

  @Post('types')
  @ApiOperation({ summary: 'Create an examination type' })
  createType(@Body() dto: any) {
    return this.service.createType(dto);
  }

  @Get('types/:id')
  @ApiOperation({ summary: 'Get examination type by ID' })
  findTypeById(@Param('id') id: string) {
    return this.service.findTypeById(id);
  }

  @Put('types/:id')
  @ApiOperation({ summary: 'Update examination type' })
  updateType(@Param('id') id: string, @Body() dto: any) {
    return this.service.updateType(id, dto);
  }

  @Delete('types/:id')
  @ApiOperation({ summary: 'Delete examination type' })
  removeType(@Param('id') id: string) {
    return this.service.removeType(id);
  }
}
