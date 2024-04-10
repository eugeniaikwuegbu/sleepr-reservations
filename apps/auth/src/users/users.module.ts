import { DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { User, UserSchema } from './entities/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';

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
