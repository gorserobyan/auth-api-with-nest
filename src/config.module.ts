import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [NestConfigModule.forRoot()],
})
export class ConfigModule {}
