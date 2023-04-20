import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { genSalt, hash, compare } from 'bcrypt';

import { User } from './user.entity';
import { ServiceError, UserInterface } from "../../interfaces";
import { UserRegister } from '@entities/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
const _ = require('lodash');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, private jwtTokenService: JwtService,
  ) {}

  availableFields = [
    'firstName',
    'lastName',
    'email',
    'username',
    'gender',
    'phone',
    'dob',
  ];

  // User register logic
  public async registerUser(
    @Body() userData: UserRegister,
  ): Promise<User | ServiceError> {
    if (!Object.values(userData || {}).length) {
      return {
        error: {
          message: 'Request body is required.',
        },
      };
    }
    const existingUser: User = await this.userRepository.findOne({
      where: {
        username: userData.username,
      },
    });
    if (existingUser) {
      return {
        error: {
          message: 'User already exist with this username.',
        },
      };
    }

    const salt = await genSalt(10);

    const hashedPassword = await hash(userData.password, salt);

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  // get user data logic
  public async getUserData(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      select: this.availableFields as any,
    });
  }

  // login user logic
  public async loginUser(loginData: UserInterface) {
    if (!loginData.password || !loginData.username) {
      return {
        error: {
          message: 'Username and password is required'
        }
      }
    }

    const user = await this.userRepository.findOne({
      where: {
        username: loginData.username
      }
    })

    if (!user) {
      return {
        error: {
          message: 'User not found'
        }
      }
    }

    const decodedPassword = await compare(loginData.password, user.password);

    if (!decodedPassword) {
      return {
        error: {
          message: 'Failed login attempt: Invalid password.'
        }
      }
    }

    const payload = {
      username: user.username,
      sub: user.id
    }

    return {
      user: _.omit(user, ['password']),
      accessToken: this.jwtTokenService.sign(payload)
    };
  }
}
