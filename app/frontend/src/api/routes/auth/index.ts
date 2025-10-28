import { queryOptions, useMutation } from '@tanstack/react-query';
import type { PostLoginBody } from '@/api/routes/auth/type';
import { checkAuth, login } from '@/api/routes/auth/function';
import { authKey } from '@/api/routes/auth/key';

const useLogin = () =>
  useMutation({
    mutationFn: async (body: PostLoginBody) => await login(body),
  });

const useAuthOptions = () =>
  queryOptions({
    queryKey: authKey.me(),
    queryFn: async () => await checkAuth(),
  });

const useCheckAuth = () =>
  useMutation({
    mutationFn: async () => await checkAuth(),
  });

export { useAuthOptions, useCheckAuth, useLogin };
