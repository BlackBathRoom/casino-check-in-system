import type { z } from 'zod';
import type { postLoginSchema } from '@backend/routes/auth/schema';

type PostLoginBody = z.infer<typeof postLoginSchema>;

export type { PostLoginBody };
