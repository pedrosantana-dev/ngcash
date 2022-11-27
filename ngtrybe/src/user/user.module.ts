import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AccountEntity } from 'src/entities/account.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccountEntity]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService]  
})
export class UserModule {}
