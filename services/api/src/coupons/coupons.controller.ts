import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CouponsService } from './coupons.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Coupons')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('coupons')
export class CouponsController {
  constructor(private service: CouponsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'FINANCE_ADMIN')
  @ApiOperation({ summary: 'Create a coupon' })
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('SUPER_ADMIN', 'FINANCE_ADMIN')
  @ApiOperation({ summary: 'List coupons' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get coupon by code' })
  findByCode(@Param('code') code: string) {
    return this.service.findByCode(code);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get coupon by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @Roles('SUPER_ADMIN', 'FINANCE_ADMIN')
  @ApiOperation({ summary: 'Update coupon' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'FINANCE_ADMIN')
  @ApiOperation({ summary: 'Delete coupon' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
