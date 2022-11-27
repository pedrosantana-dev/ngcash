import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountEntity } from "./account.entity";

@Entity('transactions')
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => AccountEntity)
    debitedAccountId: number;

    @ManyToOne(type => AccountEntity)
    creditedAccountId: number;

    @Column()
    value: number;

    @CreateDateColumn({ type: 'timestamptz'})
    createdAt: Date;

    @BeforeInsert()
    createTimestamp() {
        this.createdAt = new Date();
    }
}