import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import {
  BadgeJapaneseYen,
  CupSoda,
  Timer as TimerIcon,
  User,
} from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Divider from '@/components/layout/Divider';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import { Datetime } from '@/utils/time';
import Modal from '@/components/ui/Modal';
import { useModal } from '@/hooks/useModal';
import Timer from '@/components/ui/Timer';
import IconLabel from '@/components/ui/IconLabel';
import { useFetchUserOptions, useLeaveUser } from '@/api/routes/users';
import Loading from '@/components/ui/Loading';

export const Route = createLazyFileRoute('/admin/checkout/$userId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const modal = useModal('checkout-confirm-modal');
  const { userId } = Route.useParams();
  const { data: user } = useSuspenseQuery(useFetchUserOptions(userId));

  const { mutate, isPending } = useLeaveUser();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(userId);
    modal.closeModal();
    navigate({ to: '/admin/checkout' });
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <Divider direction="horizontal" />
        <h3 className="text-xl font-semibold">退店処理確認</h3>
        <div className="flex flex-col gap-3 text-lg px-6 py-2">
          <div className="flex justify-between">
            <IconLabel
              icon={User}
              iconClassName="h-5 w-5"
              className="flex gap-2 items-center"
            >
              <span>ユーザー名</span>
            </IconLabel>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between">
            <IconLabel
              icon={TimerIcon}
              iconClassName="h-5 w-5"
              className="flex gap-2 items-center"
            >
              <span>滞在時間</span>
            </IconLabel>
            <Timer datetime={Datetime.serialize(user.time)} isRunning={false} />
          </div>
          <div className="flex justify-between">
            <IconLabel
              icon={BadgeJapaneseYen}
              iconClassName="h-5 w-5"
              className="flex gap-2 items-center"
            >
              <span>料金</span>
            </IconLabel>
            <span>¥{user.fee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <IconLabel
              icon={CupSoda}
              iconClassName="h-5 w-5"
              className="flex gap-2 items-center"
            >
              <span>飲み放題</span>
            </IconLabel>
            <span>{user.isNomihodai ? '飲み放題中' : '飲み放題なし'}</span>
          </div>
        </div>
        <Divider direction="horizontal" />
        <Button color="info" onClick={modal.openModal}>
          退店処理を実行
        </Button>
      </div>
      <Modal modalId={modal.id} className="px-5 py-7">
        <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h3 className="w-full text-start text-2xl px-1">退店実行</h3>
          <Divider direction="horizontal" />
          <div className="flex flex-col gap-5 px-3 py-2">
            <p className="text-lg">退店処理を実行します。よろしいですか？</p>
            <div className="flex flex-col gap-1">
              <h4 className="text-lg">退店時チェックリスト</h4>
              <ul className="list-disc list-inside px-3 py-1">
                <li>会計済みですか?</li>
                <li>ランキング登録の可否は確認済みですか?</li>
              </ul>
            </div>
          </div>
          <Divider direction="horizontal" />
          <Form.SubmitBtn color="warning" disabled={isPending}>
            {isPending ? (
              <Loading size="md" color="primary" variety="bars" />
            ) : (
              '退店処理を実行'
            )}
          </Form.SubmitBtn>
        </Form>
      </Modal>
    </>
  );
}
