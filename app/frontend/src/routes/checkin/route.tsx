import { Outlet, createFileRoute } from '@tanstack/react-router';
import { ClipboardCheck } from 'lucide-react';

export const Route = createFileRoute('/checkin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="card shadow-lg min-w-md bg-base-100 card-border">
      <div className="card-body gap-3 w-full">
        <div className="card-title flex gap-3">
          <ClipboardCheck className="h-7 w-7" />
          <h2 className="text-xl font-bold">受付 / Check-In</h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
