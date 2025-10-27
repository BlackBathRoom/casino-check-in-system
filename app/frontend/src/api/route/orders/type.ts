import type z from 'zod';
import type { orderQuerySchema, registerOrderSchema } from '@backend/routes/orders/schema';

type OrderQueryParams = z.infer<typeof orderQuerySchema>;

type RegisterOrderBody = z.infer<typeof registerOrderSchema>;

export type { OrderQueryParams, RegisterOrderBody };
