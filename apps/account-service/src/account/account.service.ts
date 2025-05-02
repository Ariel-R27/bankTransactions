import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>
    ) {}

    async createAccount(data: {
        userId: string;
        amount: number;
    }): Promise<Account>{
        const account = this.accountRepository.create({
            userId: data.userId,
            amount: data.amount
        });

        return await this.accountRepository.save(account);
    };

    async findOne(accountId: string): Promise<Account | null> {
        return this.accountRepository.findOne({ where: { id: accountId} });
    };

    async updateAccountBalance(accountId: string, addedAmount: number): Promise<Account>{
        const account = await this.accountRepository.findOne({ where: { id: accountId} });
        if(!account) {
            throw new Error('Account not found');
        }

        const currentAmount = parseFloat(account.amount.toString());
        //Update account amount
        account.amount = parseFloat(( currentAmount + addedAmount).toFixed(2));
        return await this.accountRepository.save(account);
    };
}
