import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import Divider from '@/components/layout/Divider';
import Form from '@/components/ui/Form';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { useConfirmFee, useFindUser } from '@/api/routes/users';
import Loading from '@/components/ui/Loading';

export const Route = createLazyFileRoute('/admin/checkout/')({
  component: RouteComponent,
});

type Message = {
  type: 'info' | 'error';
  message: string;
};

function RouteComponent() {
  const [userId, setUserId] = useState<string>('');
  const [displayMessage, setDisplayMessage] = useState<Message>({
    type: 'info',
    message: 'ユーザーIDで対象ユーザーの検索を行います',
  });
  const navigate = useNavigate();

  const findUserMutation = useFindUser();
  const confirmFeeMutation = useConfirmFee();

  const modal = useModal('checkout-confirm-modal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    findUserMutation.mutate(userId, {
      onSuccess: (data) => {
        if (data.isActive) {
          modal.openModal();
        } else {
          setDisplayMessage({
            type: 'error',
            message: '対象ユーザーは既に退店処理が完了しています。',
          });
        }
      },
      onError: () =>
        setDisplayMessage({
          type: 'error',
          message: 'ユーザーが見つかりません。ユーザーIDをご確認ください。',
        }),
    });
  };

  const confirmCheckout = () => {
    confirmFeeMutation.mutate(userId);
    modal.closeModal();
    navigate({
      to: '/admin/checkout/$userId',
      params: { userId },
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h3 className="text-xl">
          <span
            className={
              displayMessage.type === 'info' ? 'text-info' : 'text-error'
            }
          >
            {displayMessage.message}
          </span>
        </h3>
        <Divider direction="horizontal" />
        <div className="flex flex-col gap-2">
          <Form.Label htmlFor="userId">ユーザーID</Form.Label>
          <Form.Input
            id="userId"
            value={userId}
            setValue={(val) => setUserId(val)}
            placeholder="ユーザーIDを入力してください"
            className="w-full"
          />
        </div>
        <Divider direction="horizontal" />
        <Form.SubmitBtn color="info" disabled={findUserMutation.isPending}>
          {findUserMutation.isPending ? (
            <Loading size="md" color="primary" variety="bars" />
          ) : (
            '検索'
          )}
        </Form.SubmitBtn>
      </Form>
      <Modal modalId={modal.id} className="px-5 py-7">
        <Form onSubmit={confirmCheckout} className="flex flex-col gap-3">
          <h3 className="w-full text-start text-2xl px-1">料金確定</h3>
          <Divider direction="horizontal" />
          <div className="flex flex-col gap-5 px-3 py-2 text-lg">
            <p>ユーザーID: {userId} の滞在料金を確定します。</p>
            <p>よろしいですか？</p>
          </div>
          <Divider direction="horizontal" />
          <div className="flex justify-center items-center gap-3">
            <Form.SubmitBtn color="warning">滞在料金を確定</Form.SubmitBtn>
            <Button option="outline" onClick={() => modal.closeModal()}>
              キャンセル
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
