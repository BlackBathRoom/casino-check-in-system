import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { BadgeInfo, CircleX, LogIn } from 'lucide-react';
import React, { useState } from 'react';
import { useNotification } from '@/hooks/useNotification';
import Form from '@/components/ui/Form';
import Divider from '@/components/layout/Divider';
import Notification from '@/components/ui/Notification';
import IconLabel from '@/components/ui/IconLabel';

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
  const param = Route.useSearch();

  const [name, setName] = useState<string>(param.userName ?? '');
  const [selectedOption, setSelectedOption] = useState<Option>(
    param.userName !== null ? options[1] : options[0]
  );

  const { addNotification, notificationItems } = useNotification();

  const handleCheckIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const demoUserId = '1234';

    addNotification({ message: `ユーザーID: ${demoUserId}`, type: 'info' });

    setName('');
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
              <Form.Label htmlFor="customerName">顧客名</Form.Label>
              <Form.Input
                id="name"
                value={name}
                setValue={setName}
                minLength={1}
                maxLength={50}
                className="w-full"
                isRequired
              />
            </div>
            <Divider direction="horizontal" />
            <Form.SubmitBtn color="info">入店処理</Form.SubmitBtn>
          </Form>
        </div>
      </div>
      <Notification>
        {notificationItems.map((item) => (
          <Notification.Alert
            key={item.id}
            color={item.type}
            className="text-xl flex items-center gap-3"
          >
            {item.type === 'info' ? (
              <BadgeInfo className="w-6 h-6" />
            ) : (
              <CircleX className="w-6 h-6" />
            )}
            <span>{item.message}</span>
          </Notification.Alert>
        ))}
      </Notification>
    </>
  );
}
