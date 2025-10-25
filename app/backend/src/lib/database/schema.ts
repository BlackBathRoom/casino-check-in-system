import { sql } from 'drizzle-orm';
import type { Kyselify } from 'drizzle-orm/kysely';
import {
  int,
  char,
  mysqlTable,
  boolean,
  datetime,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

const users = mysqlTable('users', {
  id: char('id', { length: 4 }).primaryKey(),
  name: char('name', { length: 50 }).notNull(),
  time: datetime('time')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  fee: int('fee').notNull().default(0),
  nomihodaiEndAt: datetime('nomihodaiEndAt').default(sql`NULL`),
  isActive: boolean('isActive').notNull().default(true),
});

const products = mysqlTable('products', {
  id: int('id').primaryKey().autoincrement(),
  name: char('name', { length: 50 }).notNull(),
  price: int('price').notNull(),
  category: mysqlEnum('category', ['tip', 'drink']).notNull(),
});

const orders = mysqlTable('orders', {
  id: int('id').primaryKey().autoincrement(),
  userId: char('userId', { length: 4 })
    .notNull()
    .references(() => users.id),
  productId: int('productId')
    .notNull()
    .references(() => products.id),
  isProvided: boolean('isProvided').notNull().default(false),
});

const ranking = mysqlTable('ranking', {
  id: int('id').primaryKey().autoincrement(),
  userId: char('userId', { length: 4 })
    .notNull()
    .references(() => users.id),
  tip: int('tip').notNull().default(0),
});

interface Database {
  users: Kyselify<typeof users>;
  products: Kyselify<typeof products>;
  orders: Kyselify<typeof orders>;
  ranking: Kyselify<typeof ranking>;
}

export { users, products, orders, ranking };

export type { Database };
