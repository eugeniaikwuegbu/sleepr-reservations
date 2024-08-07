import { CurrentUser, UsersDocument } from '@app/common';
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { LocalAuthGuard } from './guards/local-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @CurrentUser() user: UsersDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response);
    // response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data?.user;
  }
}
