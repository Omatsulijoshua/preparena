import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-apple';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('APPLE_CLIENT_ID', ''),
      teamID: configService.get<string>('APPLE_TEAM_ID', ''),
      keyID: configService.get<string>('APPLE_KEY_ID', ''),
      privateKeyString: configService.get<string>('APPLE_PRIVATE_KEY', ''),
      callbackURL: 'http://localhost:4000/api/v1/auth/apple/callback',
      scope: ['email', 'name'],
    });
  }

  async validate(accessToken: string, refreshToken: string, idToken: string, profile: any, done: any) {
    const { email, name, sub } = profile;
    const user = {
      email,
      firstName: name?.firstName || '',
      lastName: name?.lastName || '',
      appleId: sub,
    };
    done(null, user);
  }
}
