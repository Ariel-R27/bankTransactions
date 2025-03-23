import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccount } from 'src/entities/user-account.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserAccountService {
    constructor(
        @InjectRepository(UserAccount)
        private readonly accountRepo: Repository<UserAccount>,
    ) { }


    async validateUserAccount(accountId: string): Promise<UserAccount> {
        const account = await this.accountRepo.findOne({ where: { id: accountId } });

        if (!account) {
            throw new NotFoundException('Cuenta no encontrada');
        }

        if (!account.isActive) {
            throw new BadRequestException('La cuenta no está activa');
        }

        if (account.isBlocked) {
            throw new BadRequestException('La cuenta está bloqueada');
        }

        return account;
    };
}
