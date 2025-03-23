import { IsUUID, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { TransactionType } from '../../entities/transaction.entity';

export class CreateTransactionDto {
    @IsUUID()
    userId: string;

    @IsUUID()
    accountId: string;

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsEnum(TransactionType)
    type: TransactionType;
}