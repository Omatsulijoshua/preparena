import { Injectable, UnauthorizedException, ConflictException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: {
    email?: string;
    phone?: string;
    password: string;
    firstName: string;
    lastName: string;
    authProvider: 'EMAIL' | 'PHONE' | 'GOOGLE' | 'APPLE';
    providerId?: string;
  }) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          ...(dto.email ? [{ email: dto.email }] : []),
          ...(dto.phone ? [{ phone: dto.phone }] : []),
        ],
      },
    });

    if (existing) {
      throw new ConflictException('User already exists with this email or phone');
    }

    const passwordHash = dto.password ? await bcrypt.hash(dto.password, 12) : null;

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        authProvider: dto.authProvider,
        providerId: dto.providerId,
        studentProfile: {
          create: {},
        },
      },
    });

    const tokens = await this.generateTokens(user.id, user.email);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async login(dto: { email?: string; phone?: string; password: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          ...(dto.email ? [{ email: dto.email }] : []),
          ...(dto.phone ? [{ phone: dto.phone }] : []),
        ],
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (user.passwordHash && dto.password) {
      const valid = await bcrypt.compare(dto.password, user.passwordHash);
      if (!valid) throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: tokens.refreshToken,
        lastLoginAt: new Date(),
      },
    });

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'dev-refresh-secret'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.generateTokens(user.id, user.email);

      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
      });

      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async googleLogin(profile: { email: string; firstName: string; lastName: string; googleId: string }) {
    let user = await this.prisma.user.findUnique({ where: { email: profile.email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          authProvider: 'GOOGLE',
          providerId: profile.googleId,
          isEmailVerified: true,
          studentProfile: { create: {} },
        },
      });
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken, lastLoginAt: new Date() },
    });

    return { user: this.sanitizeUser(user), ...tokens };
  }

  async appleLogin(profile: { email?: string; firstName?: string; lastName?: string; appleId: string }) {
    let user = await this.prisma.user.findFirst({
      where: { authProvider: 'APPLE', providerId: profile.appleId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: profile.email,
          firstName: profile.firstName || 'Apple',
          lastName: profile.lastName || 'User',
          authProvider: 'APPLE',
          providerId: profile.appleId,
          isEmailVerified: !!profile.email,
          studentProfile: { create: {} },
        },
      });
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken, lastLoginAt: new Date() },
    });

    return { user: this.sanitizeUser(user), ...tokens };
  }

  private async generateTokens(userId: string, email: string | null) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(
      { sub: userId, jti: uuid() },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'dev-refresh-secret'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRY', '7d'),
      },
    );

    return { accessToken, refreshToken };
  }

  sanitizeUser(user: any) {
    const { passwordHash, refreshToken, deletedAt, ...rest } = user;
    return rest;
  }
}
