import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AppSettingsService } from './app-settings.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('App Settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('app-settings')
export class AppSettingsController {
  constructor(private service: AppSettingsService) {}

  @Post(':key')
  @ApiOperation({ summary: 'Set an app setting' })
  set(@Param('key') key: string, @Body() dto: { value: any }, @CurrentUser('id') userId: string) {
    return this.service.set(key, dto.value, userId);
  }

  @Get()
  @ApiOperation({ summary: 'List app settings' })
  findAll(@CurrentUser('id') userId: string) {
    return this.service.findAll(userId);
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get an app setting' })
  get(@Param('key') key: string, @CurrentUser('id') userId: string) {
    return this.service.get(key, userId);
  }

  @Delete(':key')
  @ApiOperation({ summary: 'Delete an app setting' })
  remove(@Param('key') key: string, @CurrentUser('id') userId: string) {
    return this.service.remove(key, userId);
  }
}
