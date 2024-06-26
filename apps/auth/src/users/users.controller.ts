import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersDocument } from './entities/users.schema';
import { UsersService } from './users.service';
import { CurrentUser } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAuthUser(@CurrentUser() user: UsersDocument) {
    return user;
  }
}
