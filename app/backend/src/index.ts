import { Hono } from 'hono';
import { db } from './services/database';

const app = new Hono();

app.get('/', async (c) => {
  const products = await db.selectFrom('products').selectAll().execute();
  return c.text(JSON.stringify(products));
});

export default {
  fetch: app.fetch,
  port: 3000,
};
