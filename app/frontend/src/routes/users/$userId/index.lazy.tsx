import { createLazyFileRoute } from '@tanstack/react-router';
import {
  BadgeJapaneseYen,
  ClipboardList,
  CupSoda,
  HandCoins,
  Timer as TimerIcon,
} from 'lucide-react';
import type { User } from '@/types';
import { Datetime } from '@/utils/time';
import Timer from '@/components/ui/Timer';
import Button from '@/components/ui/Button';
import Divider from '@/components/layout/Divider';

export const Route = createLazyFileRoute('/users/$userId/')({
  component: RouteComponent,
});

const demoUser: Omit<User, 'status'> = {
  id: '1234',
  name: 'hogehoge',
  time: Datetime.now(),
  fee: 1000,
  isNomihodai: true,
  nomihodaiStartAt: Datetime.now(),
};

function RouteComponent() {
  return (
    <div className="card card-border shadow-lg bg-base-100 w-full px-10 py-6 max-w-md md:max-w-3xl">
      <div className="card-title">
        <h2 className="text-3xl font-bold text-info pb-2 flex gap-1 mx-auto md:ml-0">
          <span>{demoUser.name}</span>
          <span>様</span>
        </h2>
      </div>
      <div className="card-body flex flex-col gap-4">
        <div className="flex justify-between gap-4 bg-base-200 px-4 md:px-20 py-3 rounded-sm">
          <div className="flex flex-col gap-1">
            <div className="flex gap-0.5 items-center">
              <TimerIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-lg">経過時間</span>
            </div>
            <span className="text-xl md:text-2xl font-bold">
              <Timer datetime={demoUser.time} isRunning />
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-0.5 items-center">
              <BadgeJapaneseYen className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-lg">料金</span>
            </div>
            <div className="text-xl md:text-2xl font-bold w-full flex items-end">
              <span>¥</span>
              <span>{demoUser.fee}</span>
            </div>
          </div>
        </div>
        <Divider direction="horizontal" />
        <div className="flex flex-col gap-2">
          <Button
            option="outline"
            color="secondary"
            className="flex gap-1 justify-center items-center py-2"
          >
            <CupSoda className="w-7 h-7" />
            <span className="text-xl md:text-2xl">ドリンク購入</span>
          </Button>
          <Button
            option="outline"
            color="secondary"
            className="flex gap-1 justify-center items-center py-2"
          >
            <HandCoins className="w-7 h-7" />
            <span className="text-xl md:text-2xl">チップ購入</span>
          </Button>
        </div>
        <Divider direction="horizontal" />
        <Button
          option="outline"
          color="accent"
          className="flex gap-1 justify-center items-center py-2"
        >
          <ClipboardList className="w-7 h-7" />
          <span className="text-xl md:text-2xl">注文履歴</span>
        </Button>
      </div>
    </div>
  );
}
