import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OfflineSyncService } from './offline-sync.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Offline Sync')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('offline-sync')
export class OfflineSyncController {
  constructor(private service: OfflineSyncService) {}

  @Post('pull')
  @ApiOperation({ summary: 'Pull data for offline sync' })
  syncPull(@CurrentUser('id') userId: string, @Body() dto: { lastSyncAt: string }) {
    return this.service.syncPull(userId, dto.lastSyncAt);
  }

  @Post('push')
  @ApiOperation({ summary: 'Push offline data to server' })
  syncPush(@CurrentUser('id') userId: string, @Body() dto: any) {
    return this.service.syncPush(userId, dto);
  }
}
