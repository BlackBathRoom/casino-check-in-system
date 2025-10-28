import type { z } from 'zod';
import type { postLoginSchema } from '@/routes/auth/schema';

type Payload = z.infer<typeof postLoginSchema> & {
  exp: number;
};

export { Payload };
