import { z } from 'zod';

const getQuerySchema = z
  .object({
    isProvided: z.coerce.boolean().optional(),
  })
  .optional();

const registerOrderSchema = z.object({
  productId: z.number(),
});

const switchProvidedStatusSchema = z.object({
  isProvided: z.boolean(),
});

export { getQuerySchema, registerOrderSchema, switchProvidedStatusSchema };
