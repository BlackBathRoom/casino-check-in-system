import type {
  RegisterUserBody,
  UserQueryParams,
} from '@/api/routes/users/type';
import { client } from '@/api/shared/apiClient';
import { ApiError } from '@/api/shared/apiError';
import { convertBoolToStr } from '@/api/shared/convertQueryParam';

const fetchUser = async (userId: string) => {
  const res = await client.users[':userId'].$get({
    param: { userId },
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to fetch user');
  }

  return (await res.json()).user;
};

const fetchUsers = async (queryParams?: UserQueryParams) => {
  const res = await client.users.$get({
    query: {
      isActive: convertBoolToStr(queryParams?.isActive),
      isNomihodai: convertBoolToStr(queryParams?.isNomihodai),
    },
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to fetch users');
  }

  return (await res.json()).users;
};

const registerUser = async (body: RegisterUserBody) => {
  const res = await client.users.$post({
    json: { name: body.name },
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'その名前は既に使用されています');
  }

  return (await res.json()).userId;
};

const reenter = async (userId: string) => {
  const res = await client.users[':userId'].reenter.$post({
    param: { userId },
  });

  if (res.ok) return;

  throw new ApiError(res.status, 'Failed to reenter user');
};

const confirmFee = async (userId: string) => {
  const res = await client.users[':userId']['confirm-fee'].$post({
    param: { userId },
  });

  if (res.ok) {
    return;
  }

  if (res.status === 404) {
    throw new ApiError(res.status, 'User not found');
  } else {
    throw new ApiError(500, 'Failed to confirm fee');
  }
};

const leave = async (userId: string) => {
  const res = await client.users[':userId'].$patch({
    param: { userId },
    json: {
      isActive: false,
    },
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to leave user');
  }
};

const enableNomihodai = async (userId: string) => {
  const res = await client.users[':userId'].nomihodai.$post({
    param: { userId },
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'Failed to enable nomihodai');
  }
};

export {
  confirmFee,
  enableNomihodai,
  fetchUser,
  fetchUsers,
  registerUser,
  reenter,
  leave,
};
