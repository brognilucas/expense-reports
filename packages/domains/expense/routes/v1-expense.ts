import { makeOptions } from '../utils/makeOptions';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { getExpenseById, getExpenses } from '../services/get-expenses';

export const router = Router();

router.get('/get-expenses', async (req, res, next) => {
  const options = makeOptions(req.query);
  const [error, response] = await to(getExpenses(options));

  if (error) {
    return next(error);
  }

  return res.send(response);
});

router.get('/get-expense/:id', async (req, res, next) => {
  const { id } = req.params;
  const [error, response] = await to(getExpenseById(id));

  if (error) {
    return next(error);
  }

  return res.send(response);
});
