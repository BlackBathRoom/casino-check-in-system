import type { OrderQueryParams } from '@/api/route/orders/type';

export const ordersKey = {
  all: ['orders'] as const,
  lists: () => [...ordersKey.all, 'list'],
  list: (params: OrderQueryParams) => [...ordersKey.lists(), params] as const,
};
