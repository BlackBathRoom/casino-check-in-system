import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';
import { z } from 'zod';
import IconLabel from '@/components/ui/IconLabel';

const paramSchema = z.object({
  isProvided: z.boolean().nullable().default(null),
});

export const Route = createFileRoute('/admin/sale')({
  validateSearch: paramSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <IconLabel
          icon={ShoppingCart}
          className="gap-4"
          iconClassName="h-8 w-8"
        >
          <h2 className="text-2xl">販売管理ページ</h2>
        </IconLabel>
        <div className="breadcrumbs h-full">
          <ul>
            <li>
              <Link to="/admin">トップ</Link>
            </li>
            <li>販売管理</li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}
