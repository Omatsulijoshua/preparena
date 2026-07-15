import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiGatewayService } from './ai-gateway.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('AI Gateway')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('ai')
export class AiGatewayController {
  constructor(private aiGatewayService: AiGatewayService) {}

  @Post('process')
  @ApiOperation({ summary: 'Process an AI request' })
  process(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.aiGatewayService.processRequest(dto, userId);
  }
}
