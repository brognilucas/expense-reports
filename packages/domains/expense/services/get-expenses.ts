import { Expense } from '../model/Expense';
import { IOptions } from '../model/IOptions';

export async function getExpenses(options: IOptions) {
  const [expenses, totalItems] = await Expense.findAndCount({
    where: options.filter || {},
    take: options.pagination.limit || 10,
    skip: options.pagination.skip || 0,
  });

  return {
    expenses,
    pagination: {
      itemsPerPage: options.pagination.limit,
      currentPage: options.pagination.currentPage,
      numberOfPages: Math.ceil(totalItems / options.pagination.limit),
    },
  };
}
