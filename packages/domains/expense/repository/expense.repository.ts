import { Expense } from '../model/Expense';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense> {

}
