import {
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';
import { UserDTO } from '../dto';

export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;

    if (!jwt) return false;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return this.authClient
      .send<UserDTO>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          // todo: modify this by removing the if statement, every endpoint should have a specific role
          if (roles) {
            for (const role of roles) {
              if (!res.roles?.includes(role)) {
                this.logger.error('The user does not have valid roles.');
                throw new UnauthorizedException();
              }
            }
          }
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      );
  }
}
