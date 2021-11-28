import { Api } from '../utils/api';

describe('Expenses Acceptance Tests', () => {
  describe('get-expenses endpoint', () => {
    test('/expense/v1/get-expenses should return a paginated query', async () => {
      const response = await Api.get(
        '/expense/v1/get-expenses'
      );

      const { pagination, expenses } = response.body;
      expect(response.status).toBe(200);
      expect(pagination).toBeDefined();
      expect(Array.isArray(expenses)).toBe(true);
    });
  });

  describe('get-expenses/:id endpoint', () => {
    test('Should expense be an object with property id', async () => {
      const response = await Api.get(
        '/expense/v1/get-expenses'
      );

      const { expenses } = response.body;

      const [expense] = expenses;
      const { body, status } = await Api.get(
        `/expense/v1/get-expense/${expense.id}`
      );

      expect(status).toEqual(200);
      expect(body).toHaveProperty('id');
    });
  });

  test('Should return a not found error', async () => {
    const response = await Api.get(
      '/expense/v1/get-expenses'
    );

    const { expenses } = response.body;

    const [expense] = expenses;
    const { id } = expense;

    const { body, status } = await Api.get(
      `/expense/v1/get-expense/${id.replace('a', '1')}`
    );

    expect(status).toEqual(404);
    expect(body.message).toEqual(`Expense with id ${id.replace('a', '1')} not found`);
  });

  test('Should return a internal error when an internal error happens', async () => {
    const { status } = await Api.get(
      '/expense/v1/get-expense/+sadja'
    );

    expect(status).toEqual(500);
  });
});
