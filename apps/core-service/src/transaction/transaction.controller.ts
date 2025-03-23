import {  Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from 'src/entities/transaction.entity';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post('deposit')
    createTemporal(@Body() dto: CreateTransactionDto): Promise<Transaction>{
        return this.transactionService.createTemporalTransaction(dto)
    }
}
