import { IOptions } from '../interfaces/IOptions';
import { Like } from 'typeorm';

export function makeOptions(query: unknown): IOptions {
  return {
    filter: makeFilters(query),
    pagination: makePagination(query),
  };
}

function makePagination(query): IOptions['pagination'] {
  const page = query.page || 1;
  const limit = query.limit || 10;
  return {
    skip: ((page - 1) * limit) || 0,
    limit,
    currentPage: page,
  };
}

function makeFilters(query): IOptions['filter'] {
  const filter = {
    merchant_name: query.merchantName ? Like(`%${query.merchantName}%`) : null,
    status: query.status || null,
    user_id: query.userId || null,
  };

  for (const key of Object.keys(filter)) {
    if (!filter[key]) {
      delete filter[key];
    }
  }

  return filter;
}
