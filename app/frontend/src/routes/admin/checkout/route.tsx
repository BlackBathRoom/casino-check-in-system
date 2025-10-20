import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
} from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
import IconLabel from '@/components/ui/IconLabel';

export const Route = createFileRoute('/admin/checkout')({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const isInCheckOutRoot = location.pathname === '/admin/checkout';

  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <IconLabel icon={LogOut} className="gap-4" iconClassName="h-8 w-8">
          <h2 className="text-2xl">退店管理ページ</h2>
        </IconLabel>
        <div className="breadcrumbs h-full">
          <ul>
            <li>
              <Link to="/admin">トップ</Link>
            </li>
            <li>
              {isInCheckOutRoot ? (
                <span>退店処理</span>
              ) : (
                <Link to="/admin/checkout">退店処理</Link>
              )}
            </li>
            {!isInCheckOutRoot && (
              <li>
                <span>ユーザー詳細</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="card card-border bg-base-100 shadow w-full max-w-xl mx-auto">
        <div className="card-body flex flex-col gap-5">
          <div className="card-title flex gap-2">
            <LogOut className="h-6 w-6" />
            <h3 className="text-2xl">退店処理</h3>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
