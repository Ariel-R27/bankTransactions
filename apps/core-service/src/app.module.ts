import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    TypeOrmModule.forFeature([Transaction]),
  ],
  controllers: [AppController, TransactionController],
  providers: [AppService, TransactionService],
})
export class AppModule {}
