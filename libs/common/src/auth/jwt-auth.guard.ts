import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';
import { UserDTO } from '../dto';

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;

    if (!jwt) return false;

    return this.authClient
      .send<UserDTO>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          console.log('res====>', res);
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((err) => {
          console.error('err ===>', err);
          return of(false);
        }),
      );
  }
}
