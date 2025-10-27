import type {
  OrderQueryParams,
  RegisterOrderBody,
} from '@/api/route/orders/type';
import { client } from '@/api/shared/apiClient';
import { ApiError } from '@/api/shared/apiError';
import { convertBoolToStr } from '@/api/shared/convertQueryParam';

const fetchOrders = async (queryParams: OrderQueryParams) => {
  const res = await client.orders.$get({
    query: {
      userId: queryParams?.userId,
      isProvided: convertBoolToStr(queryParams?.isProvided),
    },
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to fetch orders');
  }

  return (await res.json()).orders;
};

const registerOrder = async (body: RegisterOrderBody) => {
  const res = await client.orders.$post({
    json: { userId: body.userId, productId: body.productId },
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to register order');
  }

  return;
};

const switchProvidedStatus = async (orderId: number, isProvided: boolean) => {
  const res = await client.orders[':orderId'].$patch({
    param: { orderId: orderId.toString() },
    json: { isProvided },
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to switch provided status');
  }

  return;
};
export { fetchOrders, registerOrder, switchProvidedStatus };
