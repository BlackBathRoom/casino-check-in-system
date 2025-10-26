import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { getOrders, switchProvidedStatus } from '@/lib/database/orders';
import {
  orderQuerySchema,
  registerOrderSchema,
  switchProvidedStatusSchema,
} from '@/routes/orders/schema';
import { processOrder } from '@/services/order';

const route = new Hono()
  .get('/', zValidator('query', orderQuerySchema), async (c) => {
    const query = c.req.valid('query');
    return c.json(
      {
        orders: await getOrders(query?.userId, query?.isProvided),
      },
      200
    );
  })
  .post('/', zValidator('json', registerOrderSchema), async (c) => {
    const { userId, productId } = c.req.valid('json');
    await processOrder(userId, productId);
    return c.json({ message: 'Order registered successfully' });
  })
  .patch(
    '/:orderId/',
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
