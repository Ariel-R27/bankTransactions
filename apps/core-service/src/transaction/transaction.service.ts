import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionStatus, TransactionType } from 'src/entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        private httpService: HttpService
    ) { }

    async createTemporalTransaction(data: {
        userId: string;
        accountId: string;
        amount: number;
        type: TransactionType;
    }): Promise<Transaction> {

        // Step 1: Create temp transacction
        const transaction = this.transactionRepository.create({
            userId: data.userId,
            accountId: data.accountId,
            amount: data.amount,
            type: data.type,
            status: TransactionStatus.PENDING,
        });

        const savedTransaction = await this.transactionRepository.save(transaction);

        console.log("SavedTransaction: ", savedTransaction);

        //Step 2: Validate user (user-service)
        const userValid = await this.validateUserAccount(data.userId);

        console.log("userValid: ", userValid);

        if (!userValid) {
            //If the user isn't valid, we update transacction state to REJECTED 
            await this.updateTransactionStatus(savedTransaction.id, TransactionStatus.REJECTED);
            return savedTransaction;
        }

        //Step 3: Validate account (account-service)
        const accountValid = await this.validateAccount(data.accountId);

        console.log("accountValid: ", accountValid);

        if (!accountValid) {
            //If the account isn't valid, we update transacction state to REJECTED
            await this.updateTransactionStatus(savedTransaction.id, TransactionStatus.REJECTED);
            return savedTransaction;
        }

        //Step 4: If is all OK, we update the transacction state to APROVED
        await this.updateTransactionStatus(savedTransaction.id, TransactionStatus.APPROVED);
        return savedTransaction;
    };

    async validateUserAccount(userId: string): Promise<boolean>{
        try {
            const response = await this.httpService
            .get(`http://user-service:3001/user/${userId}/validate`)
            .toPromise();
            return response?.status === 200;
        } catch (error) {
            return false;
        }
    };

    async validateAccount(accountId: string): Promise<boolean>{
        try {
            const response = await this.httpService
            .get(`http://account-service:3002/account/${accountId}/validate`)
            .toPromise();
            return response?.status === 200;
        } catch (error) {
            return false;
        }
    };

    //Method to update transacction state
    async updateTransactionStatus(transactionId: string, status: TransactionStatus){
        await this.transactionRepository.update(transactionId, { status });    
    }
}
