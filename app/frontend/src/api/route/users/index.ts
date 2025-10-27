import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { UserQueryParams } from '@/api/route/users/type';
import { usersKey } from '@/api/route/users/key';
import {
  confirmFee,
  fetchUser,
  fetchUsers,
  leave,
  reenter,
  registerUser,
} from '@/api/route/users/functions';

const useFetchUserOptions = (userId: string) =>
  queryOptions({
    queryKey: usersKey.detail(userId),
    queryFn: async () => await fetchUser(userId),
  });

const useFetchUsersOptions = (params?: UserQueryParams) =>
  queryOptions({
    queryKey: usersKey.list(params),
    queryFn: async () => await fetchUsers(params),
  });

const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => await registerUser({ name }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: usersKey.lists(),
      }),
  });
};

const useReenterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => await reenter(userId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: usersKey.lists(),
      }),
  });
};

const useConfirmFee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => await confirmFee(userId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: usersKey.lists(),
      }),
  });
};

const useFindUser = () =>
  useMutation({
    mutationFn: async (userId: string) => await fetchUser(userId),
  });

const useLeaveUser = () =>
  useMutation({
    mutationFn: async (userId: string) => await leave(userId),
  });

export {
  useConfirmFee,
  useFetchUserOptions,
  useFetchUsersOptions,
  useFindUser,
  useLeaveUser,
  useReenterUser,
  useRegisterUser,
};
