import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col h-full py-10 w-full lg:max-w-3xl gap-6 mx-auto">
      <Outlet />
    </div>
  );
}
