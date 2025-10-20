import { Outlet, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const paramSchema = z.object({
  isActive: z.boolean().nullable().default(null),
  isNomihodai: z.boolean().nullable().default(null),
});

export const Route = createFileRoute('/admin/customer')({
  validateSearch: paramSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
