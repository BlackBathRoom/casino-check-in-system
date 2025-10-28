import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { sign, decode } from 'hono/jwt';
import { AUTH_COOKIE_NAME } from '@/constants';
import { db } from '@/lib/database';
import { postLoginSchema } from '@/routes/auth/schema';
import type { Payload } from '@/types';

const route = new Hono()
  .post('/login', zValidator('json', postLoginSchema), async (c) => {
    const req = c.req.valid('json');

    switch (req.role) {
      case 'admin':
        if (
          req.name !== process.env.ADMIN_NAME ||
          req.password !== process.env.ADMIN_PASSWORD
        ) {
          return c.json({ message: 'Invalid credentials' }, 401);
        }
        break;
      case 'user': {
        const user = await db
          .selectFrom('users')
          .selectAll()
          .where('id', '=', req.password)
          .where('name', '=', req.name)
          .executeTakeFirst();

        if (user === undefined) {
          return c.json({ message: 'Invalid credentials' }, 401);
        }
        break;
      }
    }

    const payload: Payload = {
      name: req.name,
      password: req.password,
      role: req.role,
      exp: Math.floor(Date.now() / 1000) + process.env.EXPIRATION_TIME,
    };
    const token = await sign(payload, process.env.SECRET_KEY);

    setCookie(c, AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: process.env.EXPIRATION_TIME,
      sameSite: 'None',
      secure: true,
      path: '/',
    });

    return c.json({ message: 'Login successful' });
  })
  .get('/me', (c) => {
    const token = getCookie(c, AUTH_COOKIE_NAME);
    if (!token) {
      return c.json({ message: 'Not authenticated' }, 401);
    }
    const jwt = decode(token);
    if (
      typeof jwt.payload.password === 'string' &&
      typeof jwt.payload.role === 'string'
    ) {
      return c.json({ password: jwt.payload.password, role: jwt.payload.role });
    }
    return c.json({ message: 'Invalid token payload' }, 401);
  });

export default route;
