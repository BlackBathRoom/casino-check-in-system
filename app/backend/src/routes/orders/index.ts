import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
  getOrders,
  getOrdersByUserId,
  registerOrder,
  switchProvidedStatus,
} from '@/lib/database/orders';
import {
  getQuerySchema,
  registerOrderSchema,
  switchProvidedStatusSchema,
} from '@/routes/orders/schema';

const route = new Hono()
  .get('/', zValidator('query', getQuerySchema), async (c) => {
    const query = c.req.valid('query');
    return c.json(
      {
        orders: await (async () =>
          query === undefined
            ? await getOrders()
            : await getOrders(query.isProvided))(),
      },
      200
    );
  })
  .post('/:userId', zValidator('json', registerOrderSchema), async (c) => {
    const { userId } = c.req.param();
    const { productId } = c.req.valid('json');

    await registerOrder(userId, productId);

    return c.json({ message: 'Order registered successfully' });
  })
  .get('/:userId', async (c) => {
    const { userId } = c.req.param();
    return c.json(await getOrdersByUserId(userId));
  })
  .patch(
    '/:orderId/isProvided',
    zValidator('json', switchProvidedStatusSchema),
    async (c) => {
      const { orderId } = c.req.param();
      const orderIdNumber = Number(orderId);
      if (isNaN(orderIdNumber)) {
        return c.json({ message: 'Invalid order ID' }, 400);
      }

      const { isProvided } = c.req.valid('json');
      await switchProvidedStatus(orderIdNumber, isProvided);
      return c.json(
        {
          message: 'Order status updated successfully',
        },
        200
      );
    }
  );

export default route;
