import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionStatus, TransactionType } from 'src/entities/transaction.entity';
import { Repository } from 'typeorm';
import { firstValueFrom, timeout } from 'rxjs';
import { parse } from 'path';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TransactionService { 
//export class TransactionService implements OnModuleInit {
    private readonly logger = new Logger(TransactionService.name);

    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
        //@Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
        private httpService: HttpService
    ) { }

    //This method works for an API's based architecture with
    //synchronous communication
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
        //Step 2: Validate user (user-service)
        const userValid = await this.validateUserAccount(data.userId);

        if (!userValid) {
            //If the user isn't valid, we update transacction state to REJECTED 
            await this.updateTransactionStatus(savedTransaction.id, TransactionStatus.REJECTED);
            return savedTransaction;
        }

        //Step 3: Validate account (account-service)
        const accountValid = await this.validateAccount(data.accountId);

        if (!accountValid) {
            //If the account isn't valid, we update transacction state to REJECTED
            await this.updateTransactionStatus(savedTransaction.id, TransactionStatus.REJECTED);
            return savedTransaction;
        }

        //IF account is valid, increase account amount
        await this.updateAccountBalance(data.accountId, data.amount);

        //Step 4: If is all OK, we update the transacction state to APROVED
        await this.updateTransactionStatus(savedTransaction.id, TransactionStatus.APPROVED);
        return savedTransaction;
    };

    async updateAccountBalance(accountId: string, amount: number) {
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    `http://account-service:3002/account/${accountId}/update-balance`, 
                    { amount: parseFloat(amount.toString()) },
                )
            );
            return response.data;
        } catch(error) {
            console.error('Error in update account amount', error);
            throw new Error('Error in update account amount');
        }
    }

    async validateUserAccount(userId: string): Promise<boolean>{
        try {
            const response = await firstValueFrom(
                this.httpService.get(`http://user-service:3001/user/${userId}/validate`)
            );
            return response?.status === 200;
        } catch (error) {
            return false;
        }
    };

    async validateAccount(accountId: string): Promise<boolean>{
        try {
            const response = await firstValueFrom(
            this.httpService.get(`http://account-service:3002/account/${accountId}/validate`)
            );
            return response?.status === 200;
        } catch (error) {
            return false;
        }
    };

    //Method to update transacction state
    async updateTransactionStatus(transactionId: string, status: TransactionStatus){
        await this.transactionRepository.update(transactionId, { status });    
    }
    
    /*
    async onModuleInit() {
        //Subscribe to reply necesary topics
        this.kafkaClient.subscribeToResponseOf('user.validate');
        this.kafkaClient.subscribeToResponseOf('account.validate');
        this.kafkaClient.subscribeToResponseOf('account.update-balance');
        
        await this.kafkaClient.connect();
    } */

    //THis method works for an Event based architecture
    //with asynchronous communication and Kafka
    /*
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

        //Step 2: Emit validation events to Kafka
        //await this.kafkaClient.emit('user.validate', { userId: data.userId });
        //await this.kafkaClient.emit('account.validate', { accountId: data.accountId });

        //Step 3: Based on responses, update the transaction status
        // In this case, we need to wait for validation responses, so will use listeners in user-service and account-service 
        const userValid = await this.waitForUserValidation(data.userId);

        console.log("Pase de la validacion del usuario por el evento");

        if (!userValid) {
            //If the user isn't valid, we update transacction state to REJECTED 
            await this.updateTransactionStatus(savedTransaction.id, TransactionStatus.REJECTED);
            return savedTransaction;
        }

        console.log("Pase de la validacion del usuario y no me quede en el If");

        const accountValid = await this.waitForAccountValidation(data.accountId);

        console.log("Pase de la validacion de la cuenta por el evento");

        if (!accountValid) {
            //If the account isn't valid, we update transacction state to REJECTED
            await this.updateTransactionStatus(savedTransaction.id, TransactionStatus.REJECTED);
            return savedTransaction;
        }

        //Step 4: If all is valid, we increase the account amount and mark the transaction as APROVED 
        //IF account is valid, increase account amount
        await this.updateAccountBalance(data.accountId, data.amount);
        await this.updateTransactionStatus(savedTransaction.id, TransactionStatus.APPROVED);
        return savedTransaction;
    };

    private async waitForUserValidation(userId: string): Promise<boolean> {
        this.logger.log(`Esperando la validacion de usuario para userId: ${userId}`);

        try {
            const response = await firstValueFrom(
                this.kafkaClient.send('user.validate', { userId }).pipe(
                    timeout(5000)
                )
            )
            return response[0].status === 'valid';
        } catch (error) {
            this.logger.error('Error al validar usuario via Kafka', error);
            return false;
        }
    };

    private async waitForAccountValidation(accountId: string): Promise<boolean> {
        this.logger.log(`Esperando la validacion de la cuenta para accountId: ${accountId}`);

        try {
            const response = await firstValueFrom(
                this.kafkaClient.send('account.validate', { accountId })
            )
            return response[0].status === 'valid';
        } catch (error) {
            this.logger.error('Error al validar la cuenta via Kafka', error);
            return false;
        }
    };

    async updateAccountBalance(accountId: string, amount: number) {
        try {
            const response = await firstValueFrom(
                this.kafkaClient.send('account.update-balance', {
                    accountId,
                    amount: parseFloat(amount.toString())
                })
            );
            return response;
        } catch (error) {
            console.error('Error in update account amount', error);
            throw new Error('Error in update account amount');
        }
    }

    //Method to update transacction state
    async updateTransactionStatus(transactionId: string, status: TransactionStatus) {
        await this.transactionRepository.update(transactionId, { status });
    }
    */
}
