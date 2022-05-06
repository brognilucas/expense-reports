import { Expense } from '../model/Expense';
import { IPaginatedResponse } from './IPaginatedResponse';

export interface IExpenseResponse extends IPaginatedResponse{
  expenses: Expense[]
}
