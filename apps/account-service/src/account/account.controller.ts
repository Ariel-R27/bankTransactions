import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from 'src/entities/account.entity';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService){}

    @Post('createAccount')
    createAccount(@Body() dto: CreateAccountDto): Promise<Account>{
        return this.accountService.createAccount(dto);
    };

    @Get(':accountId/validate')
    async validateAccount(@Param('accountId') accountId: string){

        console.log("Estoy en servicio Account: ");

        const account = await this.accountService.findOne(accountId);

        console.log("Account: ",account);
        
        if(!account || account.isBlocked || !account.isActive) {
            throw new HttpException('Account is not valid', HttpStatus.BAD_REQUEST);
        }
        return { status: 'valid' };
    };
}
