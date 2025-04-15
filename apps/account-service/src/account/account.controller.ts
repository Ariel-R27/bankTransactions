import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from 'src/entities/account.entity';
import { IsNumber } from 'class-validator';
import { updateBalanceDto } from './dto/update-acountamount.dto';

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
}
