import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Beer,
  BeerOff,
  Coins,
  CupSoda,
  JapaneseYen,
  LogIn,
  LogOut,
  ShoppingBasket,
} from 'lucide-react';
import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Datetime } from '@/utils/time';
import Timer from '@/components/ui/Timer';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/ui/Modal';
import Divider from '@/components/layout/Divider';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import IconLabel from '@/components/ui/IconLabel';
import {
  useConfirmFee,
  useEnableNomihodai,
  useFetchUsersOptions,
} from '@/api/routes/users';
import { useFetchProductsOptions } from '@/api/routes/products';
import { useRegisterOrder } from '@/api/routes/orders';

export const Route = createLazyFileRoute('/admin/customer/')({
  pendingComponent: () => <div className="w-full h-60 skeleton"></div>,
  component: RouteComponent,
});

function RouteComponent() {
  const searchParam = Route.useSearch();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data: users } = useSuspenseQuery(
    useFetchUsersOptions({
      isActive: searchParam.isActive ?? undefined,
      isNomihodai: searchParam.isNomihodai ?? undefined,
    })
  );
  const { data: products } = useSuspenseQuery(useFetchProductsOptions());

  const confirmFeeMutation = useConfirmFee();
  const orderMutation = useRegisterOrder();
  const enableNomihodaiMutation = useEnableNomihodai();

  const exitConfirmModal = useModal('exit-confirm-modal');
  const productModal = useModal('product-modal');
  const confirmEnableNomihodai = useModal('confirm-enable-nomihodai');

  const handleOrder = (productId: number) => {
    if (selectedUserId === null) return;

    orderMutation.mutate({
      userId: selectedUserId,
      productId,
    });

    productModal.closeModal();
  };

  const handleConfirmExit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedUserId === null) return;
    confirmFeeMutation.mutate(selectedUserId);
    exitConfirmModal.closeModal();
    navigate({
      to: '/admin/checkout/$userId',
      params: { userId: selectedUserId },
    });
  };

  const handleConfirmEnableNomihodai = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedUserId === null) return;
    enableNomihodaiMutation.mutate(selectedUserId);
    confirmEnableNomihodai.closeModal();
  };

  const splitProducts = (() => ({
    drink: products.filter((p) => p.category === 'drink'),
    tip: products.filter((p) => p.category === 'tip'),
  }))();

  return (
    <>
      <table className="table border border-base-300">
        <thead className="table-header-group">
          <tr className="bg-base-200">
            <th>ID</th>
            <th>名前</th>
            <th>時間</th>
            <th>料金</th>
            <th>飲み放題</th>
            <th>ステータス</th>
            <th>購入</th>
            <th>入店</th>
            <th>退店</th>
          </tr>
        </thead>
        <tbody className="table-row-group">
          {users.map((user, index) => (
            <tr
              key={index}
              className="border border-t-1 border-base-200 bg-base-100"
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <Timer
                  datetime={Datetime.serialize(user.time)}
                  isRunning={user.isActive}
                />
              </td>
              <td>{user.fee}円</td>
              <td>
                <button
                  className="btn btn-sm btn-square btn-ghost ml-3"
                  disabled={user.isNomihodai || !user.isActive}
                  onClick={() => {
                    setSelectedUserId(user.id);
                    confirmEnableNomihodai.openModal();
                  }}
                >
                  {user.isNomihodai && user.isActive ? (
                    <Beer className="h-5 w-5 text-success" />
                  ) : (
                    <BeerOff className="h-5 w-5 text-error" />
                  )}
                </button>
              </td>
              <td>
                {user.isActive ? (
                  <span className="text-success">ご来店中</span>
                ) : (
                  <span className="text-error">退店済み</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-square btn-info"
                  disabled={!user.isActive}
                  onClick={() => {
                    setSelectedUserId(user.id);
                    productModal.openModal();
                  }}
                >
                  <ShoppingBasket className="h-5 w-5 text-white" />
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-square btn-success"
                  disabled={user.isActive}
                  onClick={() =>
                    navigate({
                      to: '/admin/checkin',
                      search: {
                        userId: user.id,
                      },
                    })
                  }
                >
                  <LogIn className="h-5 w-5 text-white" />
                </button>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-square btn-warning"
                  disabled={!user.isActive}
                  onClick={() => {
                    setSelectedUserId(user.id);
                    exitConfirmModal.openModal();
                  }}
                >
                  <LogOut className="h-5 w-5 text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal modalId={exitConfirmModal.id} className="px-5 py-7">
        <Form onSubmit={handleConfirmExit} className="flex flex-col gap-5">
          <h3 className="text-2xl text-accent">退店確認</h3>
          <Divider direction="horizontal" />
          <div className="flex flex-col gap-2 text-lg px-3 py-2">
            <p>滞在料金の確定を行います。</p>
            <p className="flex gap-2">
              <span>ユーザーID:</span>
              <span className="font-bold">{selectedUserId ?? ''}</span>
            </p>
            <p className="font-bold">よろしいですか？</p>
          </div>
          <Divider direction="horizontal" />
          <div className="flex justify-center items-center gap-3">
            <Form.SubmitBtn
              color="warning"
              disabled={confirmFeeMutation.isPending}
            >
              料金確定
            </Form.SubmitBtn>
            <Button
              option="outline"
              onClick={() => {
                exitConfirmModal.closeModal();
                setSelectedUserId(null);
              }}
              disabled={confirmFeeMutation.isPending}
            >
              キャンセル
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        modalId={productModal.id}
        className="flex flex-col gap-5 px-5 py-7"
      >
        <h4 className="text-2xl">商品購入モーダル</h4>
        {Object.entries(splitProducts).map(([category, items], i) => (
          <div
            key={`${category}-${i}`}
            className="flex flex-col gap-5 min-w-md"
          >
            <Divider direction="horizontal" />
            <div className="flex flex-col gap-3 px-5">
              <IconLabel
                icon={category === 'drink' ? CupSoda : Coins}
                className="px-1 text-primary"
              >
                <span className="text-lg">
                  {category === 'drink' ? 'ドリンク' : 'チップ'}
                </span>
              </IconLabel>
              <div className="flex flex-col gap-3">
                {items.map((product) => (
                  <Button
                    key={product.id}
                    color="info"
                    option="outline"
                    size="lg"
                    className="w-full flex justify-between px-24"
                    onClick={() => handleOrder(product.id)}
                    disabled={orderMutation.isPending}
                  >
                    <span className="flex gap-0.5 items-center">
                      <JapaneseYen className="w-4 h-4" />
                      <span>{product.price}</span>
                    </span>
                    <span>{product.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ))}
        <Divider direction="horizontal" />
      </Modal>
      <Modal modalId={confirmEnableNomihodai.id} className="px-5 py-7">
        <Form
          className="flex flex-col items-center gap-5"
          onSubmit={handleConfirmEnableNomihodai}
        >
          <h3 className="text-2xl text-warning">確認</h3>
          <Divider direction="horizontal" />
          <p className="text-lg px-3 py-2">
            飲み放題を有効にします。
            <br />
            よろしいですか？
          </p>
          <Divider direction="horizontal" />
          <div className="flex justify-center items-center gap-3">
            <Form.SubmitBtn
              color="info"
              disabled={enableNomihodaiMutation.isPending}
            >
              有効化
            </Form.SubmitBtn>
            <Button
              option="outline"
              onClick={() => {
                confirmEnableNomihodai.closeModal();
              }}
              disabled={enableNomihodaiMutation.isPending}
            >
              キャンセル
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
