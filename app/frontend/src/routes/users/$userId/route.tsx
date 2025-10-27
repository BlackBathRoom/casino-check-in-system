import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useFetchUserOptions } from '@/api/routes/users';

export const Route = createFileRoute('/users/$userId')({
  loader: async ({ params, context: { queryClient } }) =>
    await queryClient.ensureQueryData(useFetchUserOptions(params.userId)),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
