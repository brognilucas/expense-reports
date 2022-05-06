import { Expense } from '../model/Expense';
import { IExpenseModelPaginated } from './IExpenseModelPaginated';
import { IOptions } from './IOptions';

export interface IExpenseRepository {
  findAndCount(paginatedQuery: IOptions): Promise<IExpenseModelPaginated>
  findOne(id: string): Promise<Expense>
}
