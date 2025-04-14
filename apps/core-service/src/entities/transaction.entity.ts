import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum TransactionType {
    CASH = 'CASH',
    WEB = 'WEB',
    APP = 'APP',
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    accountId: string; //Cuenta de destino

    @Column('decimal', { precision: 12, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: TransactionType,
    })
    type: TransactionType;

    @Column({
        type: 'enum',
        enum: TransactionStatus,
        default: TransactionStatus.PENDING,
    })
    status: TransactionStatus;

    //@CreateDateColumn()
    //createdAt: Date;
}