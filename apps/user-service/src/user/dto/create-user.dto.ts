import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  identityCard: string;

  @IsString()
  fullName: string;
}