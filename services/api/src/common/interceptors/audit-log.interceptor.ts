import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user, ip, headers } = request;

    return next.handle().pipe(
      tap(() => {
        if (user && method !== 'GET') {
          const entity = url.split('/')[3] || 'unknown';
          this.prisma.auditLog
            .create({
              data: {
                userId: user.id,
                action: `${method}`,
                entity,
                entityId: request.params.id,
                ipAddress: ip,
                userAgent: headers['user-agent'],
                details: { method, url },
              },
            })
            .catch(() => {});
        }
      }),
    );
  }
}
