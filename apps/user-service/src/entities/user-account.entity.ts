import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ unique: true })
  accountNumber: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isBlocked: boolean;
}