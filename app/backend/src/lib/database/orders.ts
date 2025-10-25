import { OrderNotFoundError } from '@/error';
import { db } from '@/lib/database';
import { checkExistsUser } from '@/lib/database/utils';

const getOrders = async (userId?: string, isProvided?: boolean) => {
  const query = await (async () => {
    let q = db.selectFrom('orders').selectAll();

    if (userId !== undefined) {
      await checkExistsUser(userId);
      q = q.where('userId', '=', userId);
    }

    if (isProvided !== undefined) {
      q = q.where('isProvided', '=', isProvided);
    }

    return q;
  })();

  return query.execute();
};

const registerOrder = async (userId: string, productId: number) => {
  await db
    .insertInto('orders')
    .values({
      userId,
      productId,
    })
    .execute();
};

const isExitsOrder = async (orderId: number) => {
  const order = await db
    .selectFrom('orders')
    .selectAll()
    .where('id', '=', orderId)
    .executeTakeFirst();
  return order !== undefined;
};

const switchProvidedStatus = async (orderId: number, status: boolean) => {
  if (!(await isExitsOrder(orderId))) {
    throw new OrderNotFoundError(orderId);
  }

  return await db
    .updateTable('orders')
    .set({ isProvided: status })
    .where('id', '=', orderId)
    .executeTakeFirst();
};

export { getOrders, registerOrder, switchProvidedStatus };
