import { Link, createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Beer,
  BeerOff,
  Coins,
  CupSoda,
  JapaneseYen,
  ListFilter,
  LogIn,
  LogOut,
  ShoppingBasket,
  User as UserIcon,
  X,
} from 'lucide-react';
import { useState } from 'react';
import type { Product, User } from '@/types';
import type { PickLiteral } from '@/types/utils';
import { Datetime } from '@/utils/time';
import Timer from '@/components/ui/Timer';
import { useModal } from '@/hooks/useModal';
import Modal from '@/components/ui/Modal';
import { cn } from '@/utils/cn';
import Divider from '@/components/layout/Divider';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import IconLabel from '@/components/ui/IconLabel';

export const Route = createLazyFileRoute('/admin/customer/')({
  component: RouteComponent,
});

const users: Array<User> = [
  {
    id: '1234',
    name: 'hogehoge',
    time: Datetime.now(),
    fee: 3000,
    isNomihodai: true,
    status: true,
  },
  {
    id: '5678',
    name: 'fugafuga',
    time: Datetime.now(),
    fee: 2500,
    isNomihodai: false,
    status: true,
  },
  {
    id: '9101',
    name: 'piyopiyo',
    time: Datetime.now(),
    fee: 4000,
    isNomihodai: true,
    status: false,
  },
];

const products: Array<Product> = [
  {
    id: 'a1',
    name: 'コーラ',
    price: 100,
    category: 'drink',
  },
  {
    id: 'a2',
    name: 'ジンジャーエール',
    price: 100,
    category: 'drink',
  },
  {
    id: 'a3',
    name: '烏龍茶',
    price: 100,
    category: 'drink',
  },
  {
    id: 'b1',
    name: '200チップ',
    price: 100,
    category: 'chip',
  },
  {
    id: 'b2',
    name: '800チップ',
    price: 300,
    category: 'chip',
  },
];

type Filter = {
  kind: 'isActive' | 'isNomihodai';
  label: string;
};

function RouteComponent() {
  const param = Route.useSearch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const filterModal = useModal('customer-filter-modal');
  const exitConfirmModal = useModal('customer-exit-confirm-modal');
  const productModal = useModal('customer-product-modal');

  const availableFilters: Array<Filter> = [];

  if (param.isActive !== null) {
    availableFilters.push({
      kind: 'isActive',
      label: `ステータス: ${param.isActive ? '来店中' : '退店済み'}`,
    });
  }
  if (param.isNomihodai !== null) {
    availableFilters.push({
      kind: 'isNomihodai',
      label: `飲み放題: ${param.isNomihodai ? 'あり' : 'なし'}`,
    });
  }

  const filteredUsers = (() => {
    let result = users;
    if (param.isActive !== null) {
      result = result.filter((user) => user.status === param.isActive);
    }
    if (param.isNomihodai !== null) {
      result = result.filter((user) => user.isNomihodai === param.isNomihodai);
    }
    return result;
  })();

  const handleOrder = (product: Product) => {
    if (selectedUser === null) return;

    // API Calling
    console.log(product.price);

    productModal.closeModal();
  };

  const handleConfirmExit = () => {
    if (selectedUser === null) return;

    exitConfirmModal.closeModal();
    navigate({
      to: '/admin/checkout/$userId',
      params: { userId: selectedUser.id },
    });
  };

  const splitProducts = (() => {
    const result: {
      [key in PickLiteral<
        Product['category'],
        'drink' | 'chip'
      >]: Array<Product>;
    } = {
      drink: [],
      chip: [],
    };

    products.forEach((product) => {
      if (product.category === 'plan') return;
      result[product.category].push(product);
    });

    return result;
  })();

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
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className="border border-t-1 border-base-200 bg-base-100"
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <Timer datetime={user.time} isRunning />
                </td>
                <td>{user.fee}円</td>
                <td>
                  {user.isNomihodai ? (
                    <Beer className="h-5 w-5 text-success ml-5" />
                  ) : (
                    <BeerOff className="h-5 w-5 text-error ml-5" />
                  )}
                </td>
                <td>
                  {user.status ? (
                    <span className="text-success">ご来店中</span>
                  ) : (
                    <span className="text-error">退店済み</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-square btn-info"
                    disabled={!user.status}
                    onClick={() => {
                      setSelectedUser(user);
                      productModal.openModal();
                    }}
                  >
                    <ShoppingBasket className="h-5 w-5 text-white" />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-square btn-success"
                    disabled={user.status}
                    onClick={() =>
                      navigate({
                        to: '/admin/checkin',
                        search: {
                          userName: user.name,
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
                    disabled={!user.status}
                    onClick={() => {
                      setSelectedUser(user);
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
      </div>
      <Modal modalId={filterModal.id} className="flex flex-col gap-5">
        <h3 className="text-center text-3xl">フィルター</h3>
        <div className="flex flex-col gap-3 w-full">
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
                  param.isActive === null && status === '全て' && 'btn-active',
                  param.isActive === true &&
                    status === '来店中' &&
                    'btn-active',
                  param.isActive === false &&
                    status === '退店済み' &&
                    'btn-active'
                )}
              >
                {status}
              </Link>
            ))}
          </div>
          <Divider direction="horizontal" />
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
                    param.isNomihodai === null &&
                      drink === '全て' &&
                      'btn-active',
                    param.isNomihodai === true &&
                      drink === 'あり' &&
                      'btn-active',
                    param.isNomihodai === false &&
                      drink === 'なし' &&
                      'btn-active'
                  )}
                >
                  {drink}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      <Modal modalId={exitConfirmModal.id} className="px-5 py-7">
        <Form onSubmit={handleConfirmExit} className="flex flex-col gap-5">
          <h3 className="text-2xl text-accent">退店確認</h3>
          <Divider direction="horizontal" />
          <div className="flex flex-col gap-2 text-lg px-3 py-2">
            <p>滞在料金の確定を行います。</p>
            <p className="flex gap-2">
              <span>ユーザーID:</span>
              <span className="font-bold">{selectedUser?.id}</span>
            </p>
            <p className="font-bold">よろしいですか？</p>
          </div>
          <Divider direction="horizontal" />
          <div className="flex justify-center items-center gap-3">
            <Form.SubmitBtn color="warning">料金確定</Form.SubmitBtn>
            <Button
              option="outline"
              onClick={() => {
                exitConfirmModal.closeModal();
                setSelectedUser(null);
              }}
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
                className="px-1 text-accent"
              >
                <span className="text-lg">
                  {category === 'drink' ? 'ドリンク' : 'チップ'}
                </span>
              </IconLabel>
              <div className="flex flex-col gap-3">
                {items.map((product) => (
                  <Button
                    key={product.id}
                    color="secondary"
                    option="outline"
                    size="lg"
                    className="w-full flex justify-between px-24"
                    onClick={() => handleOrder(product)}
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
    </>
  );
}
