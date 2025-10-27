import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { LogIn } from 'lucide-react';
import React, { useState } from 'react';
import Form from '@/components/ui/Form';
import Divider from '@/components/layout/Divider';
import IconLabel from '@/components/ui/IconLabel';
import { useReenterUser, useRegisterUser } from '@/api/route/users';
import { useAdminNotification } from '@/contexts/adminNotification';

export const Route = createLazyFileRoute('/admin/checkin/')({
  component: RouteComponent,
});

type Option = {
  id: number;
  label: string;
};

const options: Array<Option> = [
  { id: 1, label: '初回来店' },
  { id: 2, label: '再来店' },
];

function RouteComponent() {
  const searchParam = Route.useSearch();
  const { addNotification } = useAdminNotification();

  const [info, setInfo] = useState<string>(searchParam.userId ?? '');
  const [selectedOption, setSelectedOption] = useState<Option>(
    searchParam.userId !== null ? options[1] : options[0]
  );

  const registerMutation = useRegisterUser();
  const reenterMutation = useReenterUser();

  const handleCheckIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedOption.id === 1) {
      registerMutation.mutate(info, {
        onSuccess: (data) =>
          addNotification({
            type: 'info',
            message: `ユーザーID: ${data} のお客様を登録、入店処理が完了しました。`,
          }),
        onError: () =>
          addNotification({
            type: 'error',
            message:
              'ユーザー名の登録に失敗しました。ユーザー名が使用済みである可能性があります。',
          }),
      });
    } else {
      reenterMutation.mutate(info, {
        onSuccess: () =>
          addNotification({
            type: 'info',
            message: `ユーザーID: ${info} のお客様の入店処理が完了しました。`,
          }),
        onError: (error) => {
          if (error.code === 400) {
            addNotification({
              type: 'error',
              message: `ユーザーID: ${info} のお客様は既に入店中です。`,
            });
          } else {
            addNotification({
              type: 'error',
              message: 'ユーザーIDが見つかりません。再度ご確認ください。',
            });
          }
        },
      });
    }
    setInfo('');
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <IconLabel icon={LogIn} className="gap-4" iconClassName="h-8 w-8">
          <h2 className="text-2xl">入店管理ページ</h2>
        </IconLabel>
        <div className="breadcrumbs">
          <ul>
            <li>
              <Link to="/admin">トップ</Link>
            </li>
            <li>入店管理</li>
          </ul>
        </div>
      </div>
      <div className="card card-border bg-base-100 shadow w-xl mx-auto">
        <div className="card-body">
          <div className="card-title flex gap-2">
            <LogIn className="h-6 w-6" />
            <h3 className="text-2xl">入店処理</h3>
          </div>
          <Form
            onSubmit={handleCheckIn}
            className="flex flex-col gap-5 px-2 py-5"
          >
            <Divider direction="horizontal" />
            <Form.Radio
              name="checkInOption"
              items={options}
              value={selectedOption.id}
              setValue={(id) =>
                setSelectedOption(options.find((option) => option.id === id)!)
              }
              className="flex items-center gap-8 text-xl"
            />
            <div className="flex flex-col gap-3 mt-2">
              <Form.Label htmlFor="customer">
                {selectedOption.id === 1 ? '顧客名' : '顧客ID'}
              </Form.Label>
              <Form.Input
                id="customer"
                value={info}
                setValue={setInfo}
                minLength={1}
                maxLength={selectedOption.id === 1 ? 50 : 4}
                className="w-full"
                isRequired
              />
            </div>
            <Divider direction="horizontal" />
            <Form.SubmitBtn color="info">入店処理</Form.SubmitBtn>
          </Form>
        </div>
      </div>
    </>
  );
}
