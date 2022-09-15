import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
@Module({
  controllers: [UserController],
  providers: [UserService, JwtService, AuthService],
  exports: [UserService],
})
export class UserModule {}
