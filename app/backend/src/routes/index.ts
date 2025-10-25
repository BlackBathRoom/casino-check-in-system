import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { ZodError } from 'zod';
import {
  OrderNotFoundError,
  UserNameAlreadyExistsError,
  UserNotFoundError,
} from '@/error';
import ordersRoute from '@/routes/orders';
import productsRoute from '@/routes/products';
import usersRoute from '@/routes/users';

const app = new Hono()
  .basePath('/api')
  .use(
    '*',
    cors({
      origin: ['http://localhost:3157'],
      credentials: true,
    })
  )
  .route('/products', productsRoute)
  .route('/orders', ordersRoute)
  .route('/users', usersRoute)
  .onError((err, c) => {
    if (err instanceof UserNotFoundError) {
      return c.json({ message: err.message }, 404);
    }

    if (err instanceof UserNameAlreadyExistsError) {
      return c.json({ message: err.message }, 409);
    }

    if (err instanceof OrderNotFoundError) {
      return c.json({ message: err.message }, 404);
    }

    if (err instanceof ZodError) {
      return c.json({ message: 'Validation Error' }, 400);
    }

    return c.json({ message: 'Internal Server Error' }, 500);
  });

export type AppType = typeof app;

export default {
  fetch: app.fetch,
  port: 3000,
};
