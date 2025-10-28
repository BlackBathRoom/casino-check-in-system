import { z } from 'zod';

const postLoginSchema = z.object({
  name: z.string().min(1).max(50),
  password: z.string(),
  role: z.enum(['admin', 'user']),
});

export { postLoginSchema };
