import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    identityCard: string;

    @Column()
    fullName: string;

    @Column({ type: 'boolean', default: false})
    isVerified: boolean;
}
