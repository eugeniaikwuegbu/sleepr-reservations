import { DatabaseModule, LoggerModule, User, UserSchema } from '@app/common';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
