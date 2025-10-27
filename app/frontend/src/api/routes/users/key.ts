import type { UserQueryParams } from '@/api/routes/users/type';

export const usersKey = {
  all: ['users'] as const,
  lists: () => [...usersKey.all, 'list'] as const,
  list: (params: UserQueryParams) => [...usersKey.lists(), params] as const,
  details: () => [...usersKey.all, 'detail'] as const,
  detail: (id: string) => [...usersKey.details(), id] as const,
} as const;
