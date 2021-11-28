import config from 'config';
import { Expense } from '../model/Expense';
import { Connection, createConnection } from 'typeorm';

let db: Connection = null;

export async function getConnection(): Promise<Connection> {
  if (!db) {
    const conn = { ...config.db, entities: [Expense] };

    db = await createConnection(conn as any);
  }

  return db;
}
