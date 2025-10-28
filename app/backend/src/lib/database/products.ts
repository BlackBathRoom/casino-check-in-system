import { db } from '@/lib/database';

const getProduct = async (productId: number) =>
  await db
    .selectFrom('products')
    .selectAll()
    .where('id', '=', productId)
    .executeTakeFirstOrThrow();

const getProducts = async () =>
  await db.selectFrom('products').selectAll().execute();

const getPrice = async (productId: number) =>
  (
    await db
      .selectFrom('products')
      .select('price')
      .where('id', '=', productId)
      .executeTakeFirstOrThrow()
  ).price;

export { getPrice, getProduct, getProducts };
