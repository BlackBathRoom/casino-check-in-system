import { Hono } from 'hono';
import { getProducts } from '@/lib/database/products';

const route = new Hono().get('/', async (c) => {
  const products = await getProducts();
  return c.json(products);
});

export default route;
