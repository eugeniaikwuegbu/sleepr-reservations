import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UserRepository) {}

    create(createUserDto: CreateUserDto) {

    }
}
