import { Outlet, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const paramSchema = z.object({
  isProvided: z.boolean().nullable().default(null),
});

export const Route = createFileRoute('/admin/sale')({
  validateSearch: paramSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
