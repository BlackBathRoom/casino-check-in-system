import { registerOrder } from '@/lib/database/orders';
import { getProduct } from '@/lib/database/products';
import { addFee, getNomihodaiEndAt } from '@/lib/database/users';
import { isAvailableNomihodai } from '@/services/nomihodai';
import { notificationOrderManager } from '@/services/notificationOrder';

const processOrder = async (userId: string, productId: number) => {
  const nomihodaiEndAt = await getNomihodaiEndAt(userId);
  const product = await getProduct(productId);

  if (!isAvailableNomihodai(nomihodaiEndAt)) {
    await addFee(userId, product.price);
  }

  notificationOrderManager.notifyAdmins({
    productType: product.category,
    itemName: product.name,
  });

  await registerOrder(userId, productId);
};

export { processOrder };
