import { Hono } from 'hono';
import { getProducts } from '@/lib/database/products';

const route = new Hono().get('/', async (c) => {
  const products = await getProducts();
  return c.json({ products }, 200);
});

export default route;
