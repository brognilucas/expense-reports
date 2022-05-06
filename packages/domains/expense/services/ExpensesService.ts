import { IExpenseRepository } from '../interfaces/IExpenseRepository';
import { IExpenseService } from '../interfaces/IExpenseService';
import { IOptions } from '../interfaces/IOptions';
import { to } from '@nc/utils/async';
import { InternalError, NotFound } from '@nc/utils/errors';

export default class ExpensesService implements IExpenseService {
  expenseRepository: IExpenseRepository;

  constructor(expenseRespository: IExpenseRepository) {
    this.expenseRepository = expenseRespository;
  }

  async getExpenses(options: IOptions) {
    const [error, response] = await to(this.expenseRepository.findAndCount(options));

    if (error) {
      throw InternalError('Couldn\'t fetch the expenses');
    }

    const { expenses, totalItems } = response;

    return {
      expenses,
      pagination: {
        itemsPerPage: options.pagination.limit,
        currentPage: options.pagination.currentPage,
        numberOfPages: Math.ceil(totalItems / options.pagination.limit),
      },
    };
  }

  async getExpenseById(id: string) {
    const [error, expense] = await to(this.expenseRepository.findOne(id));

    if (error) {
      throw InternalError(`Couldn't fetch the expense with id ${id}`);
    }

    if (!expense) {
      throw NotFound(`Expense with id ${id} not found`);
    }

    return expense;
  }
}
