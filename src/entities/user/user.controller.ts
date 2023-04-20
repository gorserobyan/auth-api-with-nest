import {
  Controller,
  Get,
  Post,
  Res,
  Param,
  ParseIntPipe, Body
} from "@nestjs/common";
import { Response } from 'express';

import { UserService } from './user.service';
import { User } from '@entities/user/user.entity';
import { ServiceError } from '../../interfaces';
import { UserLogin, UserRegister } from "./dto/user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-user-data/:id')
  async getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const userData = await this.userService.getUserData(id);

    if (!userData) {
      return res.status(400).json({
        message: 'User Data does not exist!',
      });
    }

    return res.status(200).json({ userData });
  }

  @Post('/register')
  async registerUser(@Body() body: UserRegister, @Res() res: Response) {
    try {
      const response: User | ServiceError = await this.userService.registerUser(
        body,
      );

      if ('error' in response) {
        return res.status(400).json({
          message: response.error.message,
        });
      }

      return res.status(200).json({ message: 'Successfully registered' });
    } catch (e) {
      console.log('error', e);
      return res.status(500).json({
        message: 'Internal server error.',
      });
    }
  }

  @Post('/login')
  async loginUser(@Body() body: UserLogin, @Res() res: Response) {
    try {
      const response = await this.userService.loginUser(body);

      if (response.error) {
        return res.status(400).json({ message: response.error.message })
      }

      return res.status(200).json(response);
    } catch (e) {
      console.log("error", e);
      return res.status(500).json({
        message: 'Internal server error.',
      });
    }
  }
}
