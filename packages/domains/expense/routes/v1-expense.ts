// import { getConnection } from '../db/connect';
import { getExpenses } from '../services/get-expenses';
import { makeOptions } from '../utils/makeOptions';
import { Router } from 'express';

export const router = Router();

// getConnection();

router.get('/', async (req, res) => {
  const options = makeOptions(req.query);
  const response = await getExpenses(options);
  return res.send(response);
});
