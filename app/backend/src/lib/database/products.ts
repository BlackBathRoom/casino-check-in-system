import { db } from '@/lib/database';

const getProducts = async () =>
  await db.selectFrom('products').selectAll().execute();

export { getProducts };
