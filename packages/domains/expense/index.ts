import ExpenseRepository from './repository/ExpenseRepository';
import ExpensesService from './services/ExpensesService';
import { makeExpenseRoutes } from './routes/v1-expense';
import { Router } from 'express';

export const router = Router();

const expenseRepository = new ExpenseRepository();
const expenseService = new ExpensesService(expenseRepository);
const v1 = makeExpenseRoutes(expenseService);

router.use('/v1', v1);
