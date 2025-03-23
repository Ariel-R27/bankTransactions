import { Controller, Get, Param } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { UserAccount } from 'src/entities/user-account.entity';

@Controller('user-account')
export class UserAccountController {
    constructor(private readonly service: UserAccountService) { }

    @Get(':id/validate')
    validateAccount(@Param('id') id: string): Promise<UserAccount> {
        return this.service.validateUserAccount(id);
    }
}
