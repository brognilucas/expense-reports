import { Expense } from '../model/Expense';

export interface IExpenseModelPaginated {
  totalItems: number
  expenses: Expense[]
}
