import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import Divider from '@/components/layout/Divider';
import Form from '@/components/ui/Form';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export const Route = createLazyFileRoute('/admin/checkout/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();

  const modal = useModal('checkout-confirm-modal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    modal.openModal();
  };

  const confirmCheckout = () => {
    modal.closeModal();
    navigate({ to: '/admin/checkout/$userId', params: { userId } });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h3 className="text-xl">ユーザーIDで対象ユーザーの検索を行います</h3>
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
        <Form.SubmitBtn color="info">検索</Form.SubmitBtn>
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
            <Button option="outline" onClick={() => modal.closeModal()}>
              キャンセル
            </Button>
            <Form.SubmitBtn color="warning">滞在料金を確定</Form.SubmitBtn>
          </div>
        </Form>
      </Modal>
    </>
  );
}
