import { Module } from '@nestjs/common';
import { AuthMailController } from './auth-mail.controller';
import { AuthMailService } from './auth-mail.service';

@Module({
  controllers: [AuthMailController],
  providers: [AuthMailService]
})
export class AuthMailModule {}
