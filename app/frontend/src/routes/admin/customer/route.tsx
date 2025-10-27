import { Link, Outlet, createFileRoute } from '@tanstack/react-router';
import { ListFilter, UserIcon, X } from 'lucide-react';
import { z } from 'zod';
import { cn } from '@/utils/cn';
import IconLabel from '@/components/ui/IconLabel';
import Divider from '@/components/layout/Divider';
import Modal from '@/components/ui/Modal';
import { useModal } from '@/hooks/useModal';
import Button from '@/components/ui/Button';

const paramSchema = z.object({
  isActive: z.boolean().nullable().default(null),
  isNomihodai: z.boolean().nullable().default(null),
});

export const Route = createFileRoute('/admin/customer')({
  validateSearch: paramSchema,
  component: RouteComponent,
});

type Filter = {
  kind: 'isActive' | 'isNomihodai';
  label: string;
};

function RouteComponent() {
  const searchParam = Route.useSearch();

  const filterModal = useModal('customer-filter-modal');

  const availableFilters: Array<Filter> = [];

  if (searchParam.isActive !== null) {
    availableFilters.push({
      kind: 'isActive',
      label: `ステータス: ${searchParam.isActive ? '来店中' : '退店済み'}`,
    });
  }

  if (searchParam.isNomihodai !== null) {
    availableFilters.push({
      kind: 'isNomihodai',
      label: `飲み放題: ${searchParam.isNomihodai ? 'あり' : 'なし'}`,
    });
  }

  return (
    <>
      <div className="flex flex-col gap-5 w-full">
        <IconLabel icon={UserIcon} className="gap-4" iconClassName="h-8 w-8">
          <h2 className="text-2xl">顧客管理ページ</h2>
        </IconLabel>
        <div className="breadcrumbs h-full">
          <ul>
            <li>
              <Link to="/admin">トップ</Link>
            </li>
            <li>顧客管理</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 w-full justify-start items-center px-3 h-10">
          <button className="mr-4" onClick={filterModal.openModal}>
            <ListFilter
              className={cn(
                'h-7 w-7',
                availableFilters.length > 0 && 'text-primary'
              )}
            />
          </button>
          {availableFilters.length > 0 &&
            availableFilters.map((filter, idx) => (
              <Link
                key={idx}
                className={cn(
                  'h-fit text-sm border-2 px-2 py-1 rounded-full flex items-center gap-1',
                  'border-sky-500 bg-white text-sky-500 hover:bg-sky-500 hover:text-white',
                  'transform transition-colors duration-200'
                )}
                to="/admin/customer"
                search={(old) => {
                  switch (filter.kind) {
                    case 'isActive':
                      return { ...old, isActive: null };
                    case 'isNomihodai':
                      return { ...old, isNomihodai: null };
                  }
                }}
              >
                <span>{filter.label}</span>
                <X className="h-4 w-4" />
              </Link>
            ))}
        </div>
        <Outlet />
      </div>
      <Modal modalId={filterModal.id} className="flex flex-col gap-5">
        <h3 className="text-center text-3xl">フィルター</h3>
        <div className="flex flex-col gap-3 w-full">
          <Divider direction="horizontal" />
          <p className="text-xl">来店ステータス</p>
          <div className="join join-horizontal mx-auto">
            {['全て', '来店中', '退店済み'].map((status, idx) => (
              <Link
                key={idx}
                to="/admin/customer"
                search={(old) => ({
                  ...old,
                  isActive:
                    status === '全て'
                      ? null
                      : status === '来店中'
                        ? true
                        : false,
                })}
                onClick={filterModal.closeModal}
                className={cn(
                  'btn btn-outline join-item btn-primary',
                  searchParam.isActive === null &&
                    status === '全て' &&
                    'btn-active',
                  searchParam.isActive === true &&
                    status === '来店中' &&
                    'btn-active',
                  searchParam.isActive === false &&
                    status === '退店済み' &&
                    'btn-active'
                )}
              >
                {status}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <p className="text-xl">飲み放題</p>
            <div className="join join-horizontal mx-auto">
              {['全て', 'あり', 'なし'].map((drink, idx) => (
                <Link
                  key={idx}
                  to="/admin/customer"
                  search={(old) => ({
                    ...old,
                    isNomihodai:
                      drink === '全て' ? null : drink === 'あり' ? true : false,
                  })}
                  onClick={filterModal.closeModal}
                  className={cn(
                    'btn btn-outline join-item btn-primary',
                    searchParam.isNomihodai === null &&
                      drink === '全て' &&
                      'btn-active',
                    searchParam.isNomihodai === true &&
                      drink === 'あり' &&
                      'btn-active',
                    searchParam.isNomihodai === false &&
                      drink === 'なし' &&
                      'btn-active'
                  )}
                >
                  {drink}
                </Link>
              ))}
            </div>
            <Divider direction="horizontal" />
            <Button
              option="outline"
              color="accent"
              onClick={filterModal.closeModal}
              className="w-full"
            >
              閉じる
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
