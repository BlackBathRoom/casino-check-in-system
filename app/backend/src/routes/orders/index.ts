import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { UserNotFoundError } from '@/error';
import { getOrders, switchProvidedStatus } from '@/lib/database/orders';
import { getProducts } from '@/lib/database/products';
import { getUsers } from '@/lib/database/users';
import {
  orderQuerySchema,
  registerOrderSchema,
  switchProvidedStatusSchema,
} from '@/routes/orders/schema';
import { processOrder } from '@/services/order';

const route = new Hono()
  .get('/', zValidator('query', orderQuerySchema), async (c) => {
    const query = c.req.valid('query');
    const orders = await getOrders(query?.userId, query?.isProvided);
    const users = await getUsers();
    const products = await getProducts();

    return c.json(
      {
        orders: orders.map((order) => ({
          ...order,
          customerName:
            users.find((user) => user.id === order.userId)?.name ?? '不明',
          ...(() => {
            const product = products.find(
              (product) => product.id === order.productId
            );
            return !product
              ? {
                  productName: '不明',
                  productCategory: 'other',
                  price: 0,
                }
              : {
                  productName: product.name,
                  productCategory: product.category,
                  price: product.price,
                };
          })(),
        })),
      },
      200
    );
  })
  .post('/', zValidator('json', registerOrderSchema), async (c) => {
    const { userId, productId } = c.req.valid('json');
    try {
      await processOrder(userId, productId);
      return c.json({ message: 'Order registered successfully' });
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return c.json({ message: error.message }, 404);
      }
      return c.json({ message: 'Failed to register order' }, 400);
    }
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
