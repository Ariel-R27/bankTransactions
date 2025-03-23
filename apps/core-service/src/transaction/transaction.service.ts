import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionStatus, TransactionType } from 'src/entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) {}

    async createTemporalTransaction(data: {
        userId: string;
        accountId: string;
        amount: number;
        type: TransactionType;
    }): Promise<Transaction> {
        const transaction = this.transactionRepository.create({
            userId: data.userId,
            accountId: data.accountId,
            amount: data.amount,
            type: data.type,
            status: TransactionStatus.PENDING,
        });

        return await this.transactionRepository.save(transaction);
    }
}
