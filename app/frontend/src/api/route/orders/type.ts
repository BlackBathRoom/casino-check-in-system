import type z from 'zod';
import type {
  orderQuerySchema,
  registerOrderSchema,
  switchProvidedStatusSchema,
} from '@backend/routes/orders/schema';

type OrderQueryParams = z.infer<typeof orderQuerySchema>;

type RegisterOrderBody = z.infer<typeof registerOrderSchema>;

type SwitchProvidedStatusBody = z.infer<typeof switchProvidedStatusSchema>;

export type { OrderQueryParams, RegisterOrderBody, SwitchProvidedStatusBody };
