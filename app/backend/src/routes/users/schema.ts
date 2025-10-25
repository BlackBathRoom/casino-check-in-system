import { z } from 'zod';

const booleanSchema = z
  .enum(['true', 'false'])
  .transform((val) => val === 'true');

const userQuerySchema = z
  .object({
    isActive: booleanSchema.optional(),
    isNomihodai: booleanSchema.optional(),
  })
  .optional();

const registerUserSchema = z.object({
  name: z.string().min(1).max(50),
});

const patchUserSchema = z.object({
  isActive: z.boolean().optional(),
  time: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .optional(),
});

export { patchUserSchema, registerUserSchema, userQuerySchema };
