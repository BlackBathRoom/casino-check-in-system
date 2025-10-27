import type {
  registerUserSchema,
  userQuerySchema,
} from '@backend/routes/users/schema';
import type { z } from 'zod';

type UserQueryParams = z.infer<typeof userQuerySchema>;

type RegisterUserBody = z.infer<typeof registerUserSchema>;

export type { RegisterUserBody, UserQueryParams };
