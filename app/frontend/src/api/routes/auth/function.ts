import type { PostLoginBody } from '@/api/routes/auth/type';
import { client } from '@/api/shared/apiClient';
import { ApiError } from '@/api/shared/apiError';

const login = async (body: PostLoginBody) => {
  const res = await client.auth.login.$post({
    json: { ...body },
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to login');
  }

  return;
};

const checkAuth = async () => {
  const res = await client.auth.me.$get();

  if (!res.ok) {
    return null;
  }
  return await res.json();
};

export { checkAuth, login };
