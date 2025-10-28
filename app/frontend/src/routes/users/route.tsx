import { useSuspenseQuery } from '@tanstack/react-query';
import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuthOptions } from '@/api/routes/auth';

export const Route = createFileRoute('/users')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { data: auth } = useSuspenseQuery(useAuthOptions());

  if (auth !== null) {
    navigate({
      to: '/users/$userId',
      params: { userId: auth.password },
    });
  } else {
    navigate({
      to: '/users/login',
    });
  }

  return <Outlet />;
}
