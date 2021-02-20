import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from 'src/auth/jwt.contants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtContants.secret,
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
