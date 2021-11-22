import { Expense } from '../model/Expense';
import { getConnection } from '../db/connect';
import { Router } from 'express';

export const router = Router();

getConnection();

router.get('/', async (req, res) => {
  const expenses = await Expense.find();

  return res.send(expenses);
});
