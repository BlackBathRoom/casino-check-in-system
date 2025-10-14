import { createLazyFileRoute } from '@tanstack/react-router';
import { UserStar } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Datetime } from '@/utils/time';
import Timer from '@/components/ui/Timer';

export const Route = createLazyFileRoute('/admin/')({
  component: RouteComponent,
});

type User = {
  name: string;
  time: Datetime;
  seatNumber: number;
  fee: number;
  tip: number;
  isDrinking: boolean;
  status: 'normal';
};

const users: Array<User> = [
  {
    name: 'hogehoge',
    time: Datetime.serialize('2025-10-15 00:30'),
    seatNumber: 5,
    fee: 3000,
    tip: 500,
    isDrinking: true,
    status: 'normal',
  },
  {
    name: 'fugafuga',
    time: Datetime.serialize('2025-10-15 18:45'),
    seatNumber: 12,
    fee: 2500,
    tip: 0,
    isDrinking: false,
    status: 'normal',
  },
  {
    name: 'piyopiyo',
    time: Datetime.serialize('2025-10-15 19:00'),
    seatNumber: 20,
    fee: 4000,
    tip: 1000,
    isDrinking: true,
    status: 'normal',
  },
];

function RouteComponent() {
  return (
    <div className="flex flex-col items-center py-10 w-full lg:max-w-3xl gap-6 mx-auto">
      <div className="flex justify-between w-full">
        <div className="flex gap-4 pt-1">
          <UserStar className="h-8 w-8" />
          <h2 className="text-2xl">管理者トップページ</h2>
        </div>
        <Button color="info" className="text-lg">
          新規受付
        </Button>
      </div>
      <div className="w-full">
        <table className="table border border-base-300">
          <thead className="table-header-group">
            <tr className="bg-base-200">
              <th>名前</th>
              <th>席番号</th>
              <th>時間</th>
              <th>料金</th>
              <th>チップ</th>
              <th>飲み放題</th>
              <th>ステータス</th>
            </tr>
          </thead>
          <tbody className="table-row-group">
            {users.map((user, index) => (
              <tr
                key={index}
                className="border border-t-1 border-base-200 bg-base-100"
              >
                <td>{user.name}</td>
                <td>{user.seatNumber}</td>
                <td>
                  <Timer datetime={user.time} isRunning />
                </td>
                <td>{user.fee}円</td>
                <td>{user.tip}円</td>
                <td>{user.isDrinking ? 'あり' : 'なし'}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
