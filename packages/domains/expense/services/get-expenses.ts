import { Expense } from '../model/Expense';
import { IOptions } from '../interfaces/IOptions';
import { to } from '@nc/utils/async';
import { InternalError, NotFound } from '@nc/utils/errors';

export async function getExpenses(options: IOptions) {
  const [error, response] = await to(Expense.findAndCount({
    where: options.filter || {},
    take: options.pagination.limit || 10,
    skip: options.pagination.skip || 0,
  }));

  if (error) {
    throw InternalError('Couldn\'t fetch the expenses');
  }

  const [expenses, totalItems] = response;

  return {
    expenses,
    pagination: {
      itemsPerPage: options.pagination.limit,
      currentPage: options.pagination.currentPage,
      numberOfPages: Math.ceil(totalItems / options.pagination.limit),
    },
  };
}

export async function getExpenseById(id: string) {
  const [error, expense] = await to(Expense.findOne(id));

  if (error) {
    throw InternalError(`Couldn't fetch the expense with id ${id}`);
  }

  if (!expense) {
    throw NotFound(`Expense with id ${id} not found`);
  }

  return expense;
}
