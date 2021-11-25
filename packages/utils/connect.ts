import config from 'config';
import path from 'path';
import { Connection, createConnection } from 'typeorm';

let db: Connection = null;

export async function getConnection(): Promise<Connection> {
  if (!db) {
    const conn = { ...config.db, entities: [path.resolve(__dirname, '../**/model/*.ts')] };

    db = await createConnection(conn as any);
  }

  return db;
}
