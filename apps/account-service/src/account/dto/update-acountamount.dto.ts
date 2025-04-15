import { IsNumber } from "class-validator";

export class updateBalanceDto{
    @IsNumber()
    amount: number;
}