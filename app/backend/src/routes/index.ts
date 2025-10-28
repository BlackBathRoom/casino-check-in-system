import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt';
import { logger } from 'hono/logger';
import { ZodError } from 'zod';
import { AUTH_COOKIE_NAME } from '@/constants';
import { OrderNotFoundError, UserNotFoundError } from '@/error';
import authRoute from '@/routes/auth';
import ordersRoute from '@/routes/orders';
import productsRoute from '@/routes/products';
import usersRoute from '@/routes/users';

const protectedRoutes = new Hono()
  .use('*', async (c, next) => {
    console.log('Cookie header:', c.req.header('cookie'));
    await next();
  })
  .use('*', jwt({ secret: process.env.SECRET_KEY, cookie: AUTH_COOKIE_NAME }))
  .route('/orders', ordersRoute)
  .route('/products', productsRoute)
  .route('/users', usersRoute);

const app = new Hono()
  .basePath('/api')
  .use(
    '*',
    cors({
      origin: ['http://localhost:3157'],
      credentials: true,
    })
  )
  .use('*', logger())
  .route('/auth', authRoute)
  .route('/', protectedRoutes)
  .onError((err, c) => {
    if (err instanceof UserNotFoundError) {
      return c.json({ message: err.message }, 404);
    }

    if (err instanceof OrderNotFoundError) {
      return c.json({ message: err.message }, 404);
    }

    if (err instanceof ZodError) {
      return c.json({ message: 'Validation Error' }, 400);
    }

    if (err instanceof Error) {
      console.error(err.message);
    }

    return c.json({ message: 'Internal Server Error' }, 500);
  });

export type AppType = typeof app;

export default {
  fetch: app.fetch,
  port: 3000,
};
