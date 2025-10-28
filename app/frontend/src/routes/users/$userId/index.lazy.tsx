import { createLazyFileRoute } from '@tanstack/react-router';
import {
  BadgeJapaneseYen,
  ClipboardList,
  Coins,
  CupSoda,
  JapaneseYen,
  ShoppingCart,
  Timer as TimerIcon,
} from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Timer from '@/components/ui/Timer';
import Button from '@/components/ui/Button';
import Divider from '@/components/layout/Divider';
import { useFetchUserOptions } from '@/api/routes/users';
import { Datetime } from '@/utils/time';
import IconLabel from '@/components/ui/IconLabel';
import Modal from '@/components/ui/Modal';
import { useFetchOrders, useRegisterOrder } from '@/api/routes/orders';
import { useFetchProductsOptions } from '@/api/routes/products';
import { useModal } from '@/hooks/useModal';

export const Route = createLazyFileRoute('/users/$userId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();

  const { data: user } = useSuspenseQuery(useFetchUserOptions(userId));
  const { data: products } = useSuspenseQuery(useFetchProductsOptions());
  const { data: orders } = useSuspenseQuery(useFetchOrders({ userId }));

  const orderMutation = useRegisterOrder();

  const productModal = useModal('product-modal');
  const orderModal = useModal('order-modal');

  const handleOrder = (productId: number) => {
    orderMutation.mutate({
      userId,
      productId,
    });

    productModal.closeModal();
  };

  const splitProducts = (() => ({
    drink: products.filter((p) => p.category === 'drink'),
    tip: products.filter((p) => p.category === 'tip'),
  }))();

  return (
    <>
      <div className="card card-border shadow-lg bg-base-100 w-full px-10 py-6 max-w-md md:max-w-3xl">
        <div className="card-title">
          <h2 className="text-3xl font-bold text-info pb-2 flex gap-1 mx-auto md:ml-0">
            <span>{user.name}</span>
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
                <Timer
                  datetime={Datetime.serialize(user.time)}
                  isRunning={user.isActive}
                />
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5 items-center">
                <BadgeJapaneseYen className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-lg">料金</span>
              </div>
              <div className="text-xl md:text-2xl font-bold w-full flex items-end">
                <span>¥</span>
                <span>{user.fee}</span>
              </div>
            </div>
          </div>
          <Divider direction="horizontal" />
          <div className="flex flex-col gap-2">
            <Button
              option="outline"
              color="primary"
              className="flex gap-1 justify-center items-center py-2"
              onClick={productModal.openModal}
              disabled={!user.isActive}
            >
              <ShoppingCart className="w-7 h-7" />
              <span className="text-xl md:text-2xl">商品購入</span>
            </Button>
          </div>
          <Button
            option="outline"
            color="accent"
            className="flex gap-1 justify-center items-center py-2"
            onClick={orderModal.openModal}
          >
            <ClipboardList className="w-7 h-7" />
            <span className="text-xl md:text-2xl">注文履歴</span>
          </Button>
        </div>
      </div>
      <Modal
        modalId={productModal.id}
        className="flex flex-col gap-5 px-3 py-5 md:px-5 md:py-7"
      >
        <h4 className="text-2xl">商品購入モーダル</h4>
        {Object.entries(splitProducts).map(([category, items], i) => (
          <div
            key={`${category}-${i}`}
            className="flex flex-col gap-3 min-w-72 md:min-w-md"
          >
            <Divider direction="horizontal" />
            <div className="flex flex-col gap-2 px-2 md:gap-2 md:px-5">
              <IconLabel
                icon={category === 'drink' ? CupSoda : Coins}
                className="md:px-1 text-primary"
              >
                <span className="md:text-lg">
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
                    className="w-full flex justify-between px-2 md:px-24"
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
      <Modal
        modalId={orderModal.id}
        className="flex flex-col min-w-72 gap-5 px-5"
      >
        <h4 className="text-2xl">注文履歴</h4>
        <Divider direction="horizontal" />
        <div className="flex flex-col gap-3 overflow-y-auto">
          {orders.map((order) => {
            const product = products.find((p) => p.id === order.productId);
            if (!product) return null;

            return (
              <div
                key={order.id}
                className="flex justify-between items-center px-3 py-2 border border-base-300 rounded-md"
              >
                <span className="flex flex-col">
                  <span className="font-bold">{product.name}</span>
                </span>
                <span className="flex gap-0.5 items-center">
                  <JapaneseYen className="w-4 h-4" />
                  <span>{product.price}</span>
                </span>
              </div>
            );
          })}
        </div>
        <Divider direction="horizontal" />
        <Button
          option="outline"
          color="secondary"
          className="flex gap-1 justify-center items-center py-2"
          onClick={orderModal.closeModal}
        >
          <span className="text-xl md:text-2xl">閉じる</span>
        </Button>
      </Modal>
    </>
  );
}
