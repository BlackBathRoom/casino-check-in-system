import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type {
  OrderQueryParams,
  RegisterOrderBody,
} from '@/api/route/orders/type';
import { ordersKey } from '@/api/route/orders/key';
import { fetchOrders, registerOrder } from '@/api/route/orders/functoin';
import { usersKey } from '@/api/route/users/key';

const useFetchOrders = (params?: OrderQueryParams) =>
  queryOptions({
    queryKey: ordersKey.list(params),
    queryFn: async () => await fetchOrders(params),
  });

const useRegisterOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ userId, productId }: RegisterOrderBody) =>
      await registerOrder({ userId, productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ordersKey.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: usersKey.lists(),
      });
    },
  });
};

export { useFetchOrders, useRegisterOrder };
