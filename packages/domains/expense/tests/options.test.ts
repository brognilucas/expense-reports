import { makeOptions } from '../utils/makeOptions';

describe('Expense Options Unit', () => {
  test('makeOptions() should return an object with filter and pagination', () => {
    const options = makeOptions({});

    expect(options).toHaveProperty('filter');
    expect(options).toHaveProperty('pagination');
  });

  test('makeOptions should only return the 3 valid filters on the filter property', () => {
    const query = { name: 'Fake', id: '203', merchantName: 'Name', status: 'pending', userId: 'abc' };

    const options = makeOptions(query);

    expect(Object.keys(options.filter)).toEqual([
      'merchant_name', 'status', 'user_id',
    ]);
  });
});
