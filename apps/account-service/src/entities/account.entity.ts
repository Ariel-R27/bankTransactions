import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column()
    userId: string;

    @Column('decimal', { precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'boolean', default: false})
    isBlocked: boolean;

    @Column({ type: 'boolean', default: true})
    isActive: boolean;
};