import { IsUUID, IsEnum, IsNumber, IsPositive } from 'class-validator';

export class CreateAccountDto {
    @IsUUID()
    userId: string;

    @IsNumber()
    @IsPositive()
    amount: number;
};