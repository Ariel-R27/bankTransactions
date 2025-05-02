import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from 'src/entities/account.entity';
import { IsNumber } from 'class-validator';
import { updateBalanceDto } from './dto/update-acountamount.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService){}

    @Post('createAccount')
    createAccount(@Body() dto: CreateAccountDto): Promise<Account>{
        return this.accountService.createAccount(dto);
    };

    @Get(':accountId/validate')
    async validateAccount(@Param('accountId') accountId: string){
        const account = await this.accountService.findOne(accountId);

        if(!account || account.isBlocked || !account.isActive) {
            throw new HttpException('Account is not valid', HttpStatus.BAD_REQUEST);
        }
        return { status: 'valid' };
    };

    @Post(':accountId/update-balance')
    async updateBalance(@Param('accountId') accountId: string, @Body() body: updateBalanceDto ){
        const updateAccount = await this.accountService.updateAccountBalance(accountId, body.amount);
        return { status: 'success', updatedBalance: updateAccount.amount };
    };

    /*Event to heard account validation by Kafka
    @EventPattern('account.validate')
    async validateAccountFromKafka(@Payload() message: any){
        //We retrieve the accountID of the message
        console.log('Mensaje recibido de Kafka Account: ', message);
        
        const { accountId } = message;
        
        console.log(`Validando cuenta con ID: ${accountId}`);
        const account = await this.accountService.findOne(accountId);

        //Here you validate whether the account is blocked or active
        if(!account || account.isBlocked || !account.isActive) {
            console.log('Cuenta invalida');
            return { status: 'invalid'}
        }

        console.log('Cuenta valida');
            return { status: 'valid'}
    }

    @EventPattern('account.update-balance')
    async updateBalanceEvent(@Payload() data: { accountId: string; amount: number}){
        console.log(`Recibiendo actualizacion de saldo para la cuenta: ${data.accountId}`);

        //We called the service for update amount
        const updateAccount = await this.accountService.updateAccountBalance(data.accountId, data.amount);

        return { status: 'success', updatedBalance: updateAccount.amount };
    };
    */
}
