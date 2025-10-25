import { z } from 'zod';

const orderQuerySchema = z
  .object({
    userId: z.string().optional(),
    isProvided: z.coerce.boolean().optional(),
  })
  .optional();

const registerOrderSchema = z.object({
  userId: z.string(),
  productId: z.number(),
});

const switchProvidedStatusSchema = z.object({
  isProvided: z.boolean(),
});

export { orderQuerySchema, registerOrderSchema, switchProvidedStatusSchema };
