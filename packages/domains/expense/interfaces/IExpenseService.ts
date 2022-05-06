import { Expense } from '../model/Expense';
import { IExpenseRepository } from './IExpenseRepository';
import { IExpenseResponse } from './IExpensesResponse';
import { IOptions } from './IOptions';

export interface IExpenseService {
  expenseRepository: IExpenseRepository
  getExpenses(options: IOptions): Promise<IExpenseResponse>
  getExpenseById(id: string): Promise<Expense>
}
