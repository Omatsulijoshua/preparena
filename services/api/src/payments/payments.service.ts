import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async initializePayment(dto: {
    plan: string;
    provider: string;
    currency: string;
    couponCode?: string;
    metadata?: Record<string, unknown>;
  }, userId: string) {
    const planPrices: Record<string, Record<string, number>> = {
      WEEKLY: { NGN: 1500, USD: 5, GHS: 30 },
      MONTHLY: { NGN: 5000, USD: 15, GHS: 100 },
      ANNUAL: { NGN: 45000, USD: 120, GHS: 900 },
      FAMILY: { NGN: 75000, USD: 200, GHS: 1500 },
      SCHOOL: { NGN: 500000, USD: 1500, GHS: 10000 },
    };

    let amount = planPrices[dto.plan]?.[dto.currency];
    if (!amount) throw new BadRequestException(`Invalid plan or currency`);

    if (dto.couponCode) {
      const coupon = await this.prisma.coupon.findUnique({
        where: { code: dto.couponCode },
      });

      if (!coupon || !coupon.isActive) throw new BadRequestException('Invalid coupon');
      if (coupon.expiresAt && coupon.expiresAt < new Date()) throw new BadRequestException('Coupon expired');
      if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) throw new BadRequestException('Coupon usage limit reached');

      if (coupon.type === 'FIXED') {
        amount = Math.max(0, amount - coupon.value);
      } else if (coupon.type === 'PERCENTAGE') {
        amount = amount * (1 - coupon.value / 100);
      }

      await this.prisma.coupon.update({
        where: { id: coupon.id },
        data: { currentUses: { increment: 1 } },
      });
    }

    const reference = `PREP-${Date.now()}-${userId.substring(0, 8)}`;

    if (dto.provider === 'PAYSTACK') {
      return this.initiatePaystack(userId, amount, dto.currency, reference, dto.plan);
    } else if (dto.provider === 'FLUTTERWAVE') {
      return this.initiateFlutterwave(userId, amount, dto.currency, reference, dto.plan);
    } else if (dto.provider === 'STRIPE') {
      return this.initiateStripe(userId, amount, dto.currency, reference, dto.plan);
    } else if (dto.provider === 'BANK_TRANSFER') {
      return this.initiateBankTransfer(userId, amount, dto.currency, reference, dto.plan);
    }

    throw new BadRequestException('Unsupported payment provider');
  }

  private async initiatePaystack(userId: string, amount: number, currency: string, reference: string, plan: string) {
    const secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    if (!secretKey) throw new BadRequestException('Paystack not configured');

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `user-${userId}@preparena.com`,
        amount: Math.round(amount * 100),
        currency,
        reference,
        metadata: { userId, plan },
      }),
    });

    const data = await response.json();
    if (!data.status) throw new BadRequestException(data.message);

    await this.prisma.payment.create({
      data: {
        userId,
        provider: 'PAYSTACK',
        providerReference: reference,
        amount,
        currency,
        status: 'PENDING',
        metadata: { plan, authorizationUrl: data.data.authorization_url },
      },
    });

    return { reference, authorizationUrl: data.data.authorization_url };
  }

  private async initiateFlutterwave(userId: string, amount: number, currency: string, reference: string, plan: string) {
    const secretKey = this.configService.get<string>('FLUTTERWAVE_SECRET_KEY');
    if (!secretKey) throw new BadRequestException('Flutterwave not configured');

    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref: reference,
        amount,
        currency,
        redirect_url: `${this.configService.get<string>('APP_URL', 'http://localhost:3000')}/payment/callback`,
        customer: {
          email: `user-${userId}@preparena.com`,
        },
        meta: { userId, plan },
      }),
    });

    const data = await response.json();
    if (data.status !== 'success') throw new BadRequestException(data.message);

    await this.prisma.payment.create({
      data: {
        userId,
        provider: 'FLUTTERWAVE',
        providerReference: reference,
        amount,
        currency,
        status: 'PENDING',
        metadata: { plan, link: data.data.link },
      },
    });

    return { reference, link: data.data.link };
  }

  private async initiateStripe(userId: string, amount: number, currency: string, reference: string, plan: string) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) throw new BadRequestException('Stripe not configured');

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'subscription',
        'line_items[0][price_data][currency]': currency.toLowerCase(),
        'line_items[0][price_data][product_data][name]': `PrepArena ${plan} Plan`,
        'line_items[0][price_data][unit_amount]': String(Math.round(amount * 100)),
        'line_items[0][price_data][recurring][interval]': plan === 'ANNUAL' ? 'year' : 'month',
        'line_items[0][quantity]': '1',
        'client_reference_id': userId,
        'metadata[plan]': plan,
        'metadata[reference]': reference,
      }),
    });

    const data = await response.json();
    if (data.error) throw new BadRequestException(data.error.message);

    await this.prisma.payment.create({
      data: {
        userId,
        provider: 'STRIPE',
        providerReference: reference,
        amount,
        currency,
        status: 'PENDING',
        metadata: { plan, sessionId: data.id },
      },
    });

    return { reference, sessionId: data.id, url: data.url };
  }

  private async initiateBankTransfer(userId: string, amount: number, currency: string, reference: string, plan: string) {
    await this.prisma.payment.create({
      data: {
        userId,
        provider: 'BANK_TRANSFER',
        providerReference: reference,
        amount,
        currency,
        status: 'PENDING',
        metadata: { plan, bankDetails: 'PrepArena - GTBank 0123456789' },
      },
    });

    return {
      reference,
      bankDetails: {
        bank: 'GTBank',
        accountName: 'PrepArena',
        accountNumber: '0123456789',
        amount,
      },
    };
  }

  async verifyPayment(dto: { provider: string; reference: string; transactionId?: string }) {
    if (dto.provider === 'PAYSTACK') {
      return this.verifyPaystack(dto.reference);
    } else if (dto.provider === 'FLUTTERWAVE') {
      return this.verifyFlutterwave(dto.transactionId || dto.reference);
    } else if (dto.provider === 'STRIPE') {
      return this.verifyStripe(dto.transactionId || dto.reference);
    } else if (dto.provider === 'BANK_TRANSFER') {
      return this.verifyBankTransfer(dto.reference);
    }
    throw new BadRequestException('Unsupported payment provider');
  }

  private async verifyPaystack(reference: string) {
    const secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });

    const data = await response.json();
    if (!data.status || data.data.status !== 'success') {
      throw new BadRequestException('Payment verification failed');
    }

    return this.completePayment(reference, data.data.id.toString());
  }

  private async verifyFlutterwave(transactionId: string) {
    const secretKey = this.configService.get<string>('FLUTTERWAVE_SECRET_KEY');
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });

    const data = await response.json();
    if (data.status !== 'success') throw new BadRequestException('Payment verification failed');

    return this.completePayment(data.data.tx_ref, transactionId);
  }

  private async verifyStripe(sessionId: string) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });

    const data = await response.json();
    if (data.payment_status !== 'paid') throw new BadRequestException('Payment not completed');

    return this.completePayment(data.metadata.reference, sessionId);
  }

  private async verifyBankTransfer(reference: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { providerReference: reference },
    });

    if (!payment) throw new NotFoundException('Payment not found');

    return {
      status: 'PENDING',
      message: 'Bank transfer verification pending. Please allow 1-2 business days for confirmation.',
      payment,
    };
  }

  private async completePayment(reference: string, transactionId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { providerReference: reference },
    });

    if (!payment) throw new NotFoundException('Payment not found');

    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'VERIFIED',
        transactionId,
        verifiedAt: new Date(),
      },
    });

    const planDuration: Record<string, number> = {
      WEEKLY: 7,
      MONTHLY: 30,
      ANNUAL: 365,
      FAMILY: 365,
      SCHOOL: 365,
    };

    const plan = (payment.metadata as any)?.plan || 'MONTHLY';
    const duration = planDuration[plan] || 30;

    const existingSubscription = await this.prisma.subscription.findUnique({
      where: { userId: payment.userId },
    });

    if (existingSubscription) {
      await this.prisma.subscription.update({
        where: { userId: payment.userId },
        data: {
          plan: plan as any,
          status: 'ACTIVE',
          startDate: new Date(),
          endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
          paymentProvider: payment.provider,
        },
      });
    } else {
      await this.prisma.subscription.create({
        data: {
          userId: payment.userId,
          plan: plan as any,
          status: 'ACTIVE',
          startDate: new Date(),
          endDate: new Date(Date.now() + duration * 24 * 60 * 60 * 1000),
          paymentProvider: payment.provider,
        },
      });
    }

    return { status: 'VERIFIED', message: 'Payment verified and subscription activated' };
  }

  async handleWebhook(provider: string, body: any, signature: string) {
    if (provider === 'stripe') {
      const secret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
      return this.handleStripeWebhook(body, signature, secret!);
    } else if (provider === 'paystack') {
      return this.handlePaystackWebhook(body);
    } else if (provider === 'flutterwave') {
      return this.handleFlutterwaveWebhook(body);
    }
    return { received: true };
  }

  private async handleStripeWebhook(body: any, signature: string, secret: string) {
    const event = body;
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await this.completePayment(session.metadata.reference, session.id);
    }
    return { received: true };
  }

  private async handlePaystackWebhook(body: any) {
    if (body.event === 'charge.success') {
      await this.completePayment(body.data.reference, body.data.id.toString());
    }
    return { received: true };
  }

  private async handleFlutterwaveWebhook(body: any) {
    if (body.event === 'charge.completed' && body.data.status === 'successful') {
      await this.completePayment(body.data.tx_ref, body.data.id.toString());
    }
    return { received: true };
  }
}
