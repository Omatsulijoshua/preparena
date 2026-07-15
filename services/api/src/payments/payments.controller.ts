import { Controller, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { Public } from '../common/decorators/public.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('initialize')
  @ApiOperation({ summary: 'Initialize a payment' })
  initialize(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.paymentsService.initializePayment(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('verify')
  @ApiOperation({ summary: 'Verify a payment' })
  verify(@Body() dto: any) {
    return this.paymentsService.verifyPayment(dto);
  }

  @Public()
  @Post('webhook/:provider')
  @ApiOperation({ summary: 'Payment provider webhook' })
  webhook(@Param('provider') provider: string, @Body() body: any, @Headers('stripe-signature') signature: string) {
    return this.paymentsService.handleWebhook(provider, body, signature);
  }
}
