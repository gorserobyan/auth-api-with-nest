import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: {expiresIn: '60s'}
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
