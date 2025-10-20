import { Link, createLazyFileRoute } from '@tanstack/react-router';
import {
  Angry,
  Check,
  CirclePoundSterling,
  CupSoda,
  ShoppingCart,
  Smile,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import IconLabel from '@/components/ui/IconLabel';

export const Route = createLazyFileRoute('/admin/sale/')({
  component: RouteComponent,
});

type Item = {
  name: string;
  customerName: string;
  kind: 'drink' | 'tip';
  isProvided: boolean;
  price: number;
};

const _items: Array<Item> = [
  {
    name: 'ビール',
    customerName: 'hogehoge',
    kind: 'drink',
    isProvided: true,
    price: 600,
  },
  {
    name: '800チップ',
    customerName: 'fugafuga',
    kind: 'tip',
    isProvided: false,
    price: 800,
  },
  {
    name: 'カクテル',
    customerName: 'piyopiyo',
    kind: 'drink',
    isProvided: true,
    price: 700,
  },
  {
    name: '500チップ',
    customerName: 'hogehoge',
    kind: 'tip',
    isProvided: false,
    price: 500,
  },
];

function RouteComponent() {
  const param = Route.useSearch();
  const [items, setItems] = useState<Array<Item>>(_items);

  const displayItems =
    param.isProvided !== null
      ? items.filter((item) => item.isProvided === param.isProvided)
      : items;

  const switchIsProvided = (item: Item) => {
    setItems((prev) =>
      prev.map((i) => (i === item ? { ...i, isProvided: !i.isProvided } : i))
    );
  };

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
      <div className="flex flex-col gap-10">
        <div className="flex justify-center items-center gap-8">
          <div className="card card-border bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title text-2xl text-error mx-auto">未提供</h3>
              <div className="flex w-full justify-center items-center p-1">
                <span className="text-5xl text-warning">
                  {items.filter((item) => !item.isProvided).length}
                </span>
              </div>
            </div>
          </div>
          <div className="card card-border bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title text-2xl text-error mx-auto">総売上</h3>
              <div className="flex w-full items-center gap-1 p-1">
                <span className="text-5xl text-info">
                  {items.reduce((acc, item) => acc + item.price, 0)}
                </span>
                <span className="text-xl mt-auto mb-0">円</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full flex gap-2 items-center justify-start">
            <Link
              to="/admin/sale"
              search={(old) => ({ ...old, isProvided: null })}
              className={cn(
                'btn btn-sm',
                param.isProvided === null ? 'btn-primary' : 'btn-outline'
              )}
            >
              全て
            </Link>
            <Link
              to="/admin/sale"
              search={(old) => ({ ...old, isProvided: false })}
              className={cn(
                'btn btn-sm',
                param.isProvided === false ? 'btn-primary' : 'btn-outline'
              )}
            >
              未提供
            </Link>
            <Link
              to="/admin/sale"
              search={(old) => ({ ...old, isProvided: true })}
              className={cn(
                'btn btn-sm',
                param.isProvided === true ? 'btn-primary' : 'btn-outline'
              )}
            >
              提供済み
            </Link>
          </div>
          <table className="table border">
            <thead className="table-header-group bg-base-300">
              <tr>
                <th>商品名</th>
                <th>顧客名</th>
                <th>種別</th>
                <th>提供状況</th>
                <th>提供状況変更</th>
              </tr>
            </thead>
            <tbody className="table-row-group border-t-2 bg-base-100">
              {displayItems.map((item, idx) => (
                <tr key={idx} className="border-t-1 border-black">
                  <td>{item.name}</td>
                  <td>{item.customerName}</td>
                  <td>
                    {item.kind === 'drink' ? (
                      <CupSoda className="text-cyan-400" />
                    ) : (
                      <CirclePoundSterling className="text-amber-300" />
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2 items-center">
                      {item.isProvided ? (
                        <>
                          <Smile className="text-success" />
                          <span className="text-success">提供済み</span>
                        </>
                      ) : (
                        <>
                          <Angry className="text-error" />
                          <span className="text-error">未提供</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      className={cn(
                        'btn btn-sm btn-square ml-7',
                        item.isProvided ? 'btn-success' : 'btn-error'
                      )}
                      onClick={() => switchIsProvided(item)}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
