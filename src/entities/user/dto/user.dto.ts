import {
  IsEmail,
  IsString,
  IsISO8601,
  IsNotEmpty,
  IsEnum,
  MinLength,
} from 'class-validator';

import { E_Gender } from '../types';

export class UserRegister {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsISO8601()
  dob: Date;

  @IsNotEmpty()
  @IsEnum(E_Gender)
  gender: E_Gender;
}

export class UserLogin {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}