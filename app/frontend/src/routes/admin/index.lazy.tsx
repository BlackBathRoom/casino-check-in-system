import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { LogIn, LogOut, ShoppingCart, User, UserStar } from 'lucide-react';
import type { LinkProps } from '@tanstack/react-router';
import { cn } from '@/utils/cn';
import IconLabel from '@/components/ui/IconLabel';

export const Route = createLazyFileRoute('/admin/')({
  component: RouteComponent,
});

type Menu = {
  name: string;
  description: string;
  icon: React.ReactNode;
  link: Pick<LinkProps, 'to'>;
};

function RouteComponent() {
  const menus: Array<Menu> = [
    {
      name: '販売管理',
      description: 'ドリンク・チップの提供確認',
      icon: <ShoppingCart className="h-8 w-8" />,
      link: {
        to: '/admin/sale',
      },
    },
    {
      name: '顧客管理',
      description: '顧客の情報確認・編集',
      icon: <User className="h-8 w-8" />,
      link: {
        to: '/admin/customer',
      },
    },
    {
      name: '入店処理',
      description: '新規入店・再入店処理',
      icon: <LogIn className="h-8 w-8" />,
      link: {
        to: '/admin/checkin',
      },
    },
    {
      name: '退店処理',
      description: '退店処理・精算処理',
      icon: <LogOut className="h-8 w-8" />,
      link: {
        to: '/admin/checkout',
      },
    },
  ];

  return (
    <>
      <IconLabel icon={UserStar} className="gap-4" iconClassName="h-8 w-8">
        <h2 className="text-2xl">管理者トップページ</h2>
      </IconLabel>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-between gap-4 px-5">
        {menus.map((menu, idx) => (
          <Link
            key={idx}
            to={menu.link.to}
            className={cn(
              'card card-border bg-base-100 shadow-md min-w-52 min-h-34',
              'transition duration-300 hover:shadow-xl hover:scale-[1.01]'
            )}
          >
            <div className="card-body flex flex-col gap-3">
              <div className="card-title">
                {menu.icon}
                <h3 className="text-2xl">{menu.name}</h3>
              </div>
              <div className="flex flex-col gap-2 text-md">
                <p>{menu.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
