import { Expense } from '../model/Expense';
import { IExpenseModelPaginated } from '../interfaces/IExpenseModelPaginated';
import { IExpenseRepository } from '../interfaces/IExpenseRepository';
import { IOptions } from '../interfaces/IOptions';

export default class ExpenseRepository implements IExpenseRepository {
  findOne(id: string): Promise<Expense> {
    return Expense.findOne(id);
  }

  async findAndCount(options: IOptions): Promise<IExpenseModelPaginated> {
    const response = await Expense.findAndCount({
      where: options.filter || {},
      take: options.pagination.limit || 10,
      skip: options.pagination.skip || 0,
    });

    const [expenses, totalItems] = response;

    return {
      expenses: expenses as Expense[],
      totalItems,
    };
  }
}
