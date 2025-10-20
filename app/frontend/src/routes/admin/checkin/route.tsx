import { Outlet, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const paramSchema = z.object({
  userName: z.string().nullable().default(null),
});

export const Route = createFileRoute('/admin/checkin')({
  validateSearch: paramSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
