import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserAccountService } from './user-account/user-account.service';
import { UserAccountController } from './user-account/user-account.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController, UserController, UserAccountController],
  providers: [AppService, UserService, UserAccountService],
})
export class AppModule {}
