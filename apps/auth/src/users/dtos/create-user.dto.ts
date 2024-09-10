import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  roles?: string[];
}
