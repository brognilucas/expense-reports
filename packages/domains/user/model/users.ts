import orm from '@nc/utils/db';
const { BaseEntity, Column, Entity, PrimaryGeneratedColumn } = orm;

@Entity({ name: 'users' })
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    first_name!: string;

    @Column()
    last_name!: number;

    @Column()
    company_name: string;

    @Column()
    ssn: number;
}
