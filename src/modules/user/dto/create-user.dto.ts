import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  id?: number;
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  second_name: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
