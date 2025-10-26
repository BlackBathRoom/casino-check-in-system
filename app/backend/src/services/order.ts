import { registerOrder } from '@/lib/database/orders';
import { getPrice } from '@/lib/database/products';
import { addFee, getNomihodaiEndAt } from '@/lib/database/users';
import { isAvailableNomihodai } from '@/services/nomihodai';

const payment = async (userId: string, productId: number) => {
  const nomihodaiEndAt = await getNomihodaiEndAt(userId);
  if (!isAvailableNomihodai(nomihodaiEndAt)) {
    const price = await getPrice(productId);
    await addFee(userId, price);
  }
};

const processOrder = async (userId: string, productId: number) => {
  await payment(userId, productId);
  await registerOrder(userId, productId);
};

export { processOrder };
