import { Link, createLazyFileRoute } from '@tanstack/react-router';
import {
  Angry,
  Check,
  CirclePoundSterling,
  CupSoda,
  Smile,
} from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { cn } from '@/utils/cn';
import { useFetchOrders, useSwitchProvidedStatus } from '@/api/route/orders';

export const Route = createLazyFileRoute('/admin/sale/')({
  component: RouteComponent,
  pendingComponent: () => (
    <div className="flex flex-col gap-10">
      <div className="flex gap-8">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="skelton w-20 h-20" />
        ))}
      </div>
      <div className="mt-10 skeleton h-8 w-1/4 mb-4" />
      <div className="skeleton h-96 w-full" />
    </div>
  ),
});

function RouteComponent() {
  const param = Route.useSearch();

  const { data: orders } = useSuspenseQuery(
    useFetchOrders({
      isProvided: param.isProvided === null ? undefined : param.isProvided,
    })
  );

  const { mutate } = useSwitchProvidedStatus();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center items-center gap-8">
        <div className="card card-border bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-2xl text-error mx-auto">未提供</h3>
            <div className="flex w-full justify-center items-center p-1">
              <span className="text-5xl text-warning">
                {orders.filter((order) => !order.isProvided).length}
              </span>
            </div>
          </div>
        </div>
        <div className="card card-border bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-2xl text-error mx-auto">売上</h3>
            <div className="flex w-full items-center gap-1 p-1">
              <span className="text-5xl text-info">
                {orders.reduce((acc, order) => acc + order.price, 0)}
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
            {orders.map((order, idx) => (
              <tr key={idx} className="border-t-1 border-black">
                <td>{order.productName}</td>
                <td>{order.customerName}</td>
                <td>
                  {order.productCategory === 'drink' ? (
                    <CupSoda className="text-cyan-400" />
                  ) : (
                    <CirclePoundSterling className="text-amber-300" />
                  )}
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    {order.isProvided ? (
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
                      order.isProvided ? 'btn-success' : 'btn-error'
                    )}
                    onClick={() =>
                      mutate({
                        orderId: order.id,
                        isProvided: !order.isProvided,
                      })
                    }
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
  );
}
