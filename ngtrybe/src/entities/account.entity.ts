import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('accounts')
export class AccountEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    balance: number;
}