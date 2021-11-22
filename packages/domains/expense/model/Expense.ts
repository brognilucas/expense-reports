import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'expenses' })
export class Expense extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    merchant_name!: string;

    @Column()
    amount_in_cents!: number;

    @Column()
    currency: string;

    @Column()
    user_id: string;

    @Column()
    date_created: Date;

    @Column()
    status: string;

}
