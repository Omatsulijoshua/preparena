import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Subscriptions')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private service: SubscriptionsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'FINANCE_ADMIN')
  @ApiOperation({ summary: 'Create a subscription' })
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('SUPER_ADMIN', 'FINANCE_ADMIN')
  @ApiOperation({ summary: 'List subscriptions' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('my-subscription')
  @ApiOperation({ summary: 'Get current user subscription' })
  findByUser(@CurrentUser('id') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subscription by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Put(':id')
  @Roles('SUPER_ADMIN', 'FINANCE_ADMIN')
  @ApiOperation({ summary: 'Update subscription' })
  update(@Param('id') id: string, @Body() dto: any) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN', 'FINANCE_ADMIN')
  @ApiOperation({ summary: 'Delete subscription' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
