import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useFetchUserOptions } from '@/api/routes/users';

export const Route = createFileRoute('/checkin/$userId')({
  loader: async ({ params, context: { queryClient } }) =>
    await queryClient.ensureQueryData(useFetchUserOptions(params.userId)),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
