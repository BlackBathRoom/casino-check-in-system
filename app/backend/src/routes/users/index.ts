import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
  addFee,
  getEnterTime,
  getNomihodaiEndAt,
  getUser,
  getUsers,
  isActiveUser,
  registerUser,
  switchUserStatus,
  updateNomihodaiEndAt,
  updateTime,
} from '@/lib/database/users';
import {
  patchUserSchema,
  registerUserSchema,
  userQuerySchema,
} from '@/routes/users/schema';
import { calculateFee } from '@/services/fee';
import { calcNomihodaiEndAt, isAvailableNomihodai } from '@/services/nomihodai';

const route = new Hono()
  .get('/', zValidator('query', userQuerySchema), async (c) => {
    const query = c.req.valid('query');
    return c.json(
      {
        users: await (async () =>
          query === undefined
            ? await getUsers()
            : await getUsers(query.isActive, query.isNomihodai))(),
      },
      200
    );
  })
  .post('/', zValidator('json', registerUserSchema), async (c) => {
    const { name } = c.req.valid('json');

    return c.json(
      {
        id: await registerUser(name),
      },
      201
    );
  })
  .get('/:userId', async (c) => {
    const { userId } = c.req.param();
    return c.json({ user: await getUser(userId) }, 200);
  })
  .patch('/:userId', zValidator('json', patchUserSchema), async (c) => {
    const { userId } = c.req.param();
    const resource = c.req.valid('json');

    if (resource.time !== undefined) {
      await updateTime(userId, new Date(resource.time));
    }

    if (resource.isActive !== undefined) {
      await switchUserStatus(userId, resource.isActive);
    }

    return c.json(
      {
        message: 'User updated successfully',
      },
      200
    );
  })
  .post('/:userId/confirm-fee', async (c) => {
    const { userId } = c.req.param();

    const time = await getEnterTime(userId);
    const stayFee = calculateFee(time);

    await addFee(userId, stayFee);

    return c.json(
      {
        message: 'Fee confirmed successfully',
        fee: stayFee,
      },
      200
    );
  })
  .post('/:userId/nomihodai', async (c) => {
    const { userId } = c.req.param();

    if (!(await isActiveUser(userId))) {
      return c.json(
        {
          message: 'User is not active',
        },
        400
      );
    }

    if (isAvailableNomihodai(await getNomihodaiEndAt(userId))) {
      return c.json(
        {
          message: 'Nomihodai is already active',
        },
        400
      );
    }

    await updateNomihodaiEndAt(userId, calcNomihodaiEndAt());

    return c.json(
      {
        message: 'Nomihodai started successfully',
      },
      200
    );
  });

export default route;
