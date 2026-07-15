import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuditLogsService } from './audit-logs.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Audit Logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('audit-logs')
export class AuditLogsController {
  constructor(private service: AuditLogsService) {}

  @Get()
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'List audit logs' })
  findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get('user/:userId')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get audit logs by user' })
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get audit log by ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
