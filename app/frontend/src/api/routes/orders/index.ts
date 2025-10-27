import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type {
  OrderQueryParams,
  RegisterOrderBody,
} from '@/api/routes/orders/type';
import { ordersKey } from '@/api/routes/orders/key';
import {
  fetchOrders,
  registerOrder,
  switchProvidedStatus,
} from '@/api/routes/orders/function';
import { usersKey } from '@/api/routes/users/key';

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

const useSwitchProvidedStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      isProvided,
    }: {
      orderId: number;
      isProvided: boolean;
    }) => await switchProvidedStatus(orderId, isProvided),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ordersKey.lists(),
      });
    },
  });
};

export { useFetchOrders, useRegisterOrder, useSwitchProvidedStatus };
