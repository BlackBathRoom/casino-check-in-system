import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { CircleX } from 'lucide-react';
import Form from '@/components/ui/Form';
import Divider from '@/components/layout/Divider';
import Button from '@/components/ui/Button';
import { useNotification } from '@/hooks/useNotification';
import Notification from '@/components/ui/Notification';
import { useRegisterUser } from '@/api/routes/users';

export const Route = createLazyFileRoute('/checkin/first/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState<string>('');
  const { mutate, isPending } = useRegisterUser();

  const navigate = useNavigate();
  const notification = useNotification();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (name.trim() === '') {
      notification.addNotification({
        message: 'お名前を入力してください。',
        type: 'error',
      });
      return;
    }

    mutate(name, {
      onSuccess: (data) => {
        navigate({
          to: '/checkin/$userId',
          params: { userId: data },
        });
      },
      onError: (error) => {
        notification.addNotification({ message: error.message, type: 'error' });
      },
    });
  };

  return (
    <>
      <Divider direction="horizontal" />
      <Form onSubmit={handleSubmit} className="py-4 w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-full mt-2">
          <Form.Label htmlFor="name">お名前</Form.Label>
          <Form.Input
            id="name"
            value={name}
            setValue={setName}
            minLength={1}
            maxLength={50}
            errorMessage="お名前は1文字以上50文字以下で入力してください。"
            color="accent"
            className="w-full"
            isRequired
          />
        </div>
        <Divider direction="horizontal" />
        <Form.SubmitBtn color="info" disabled={isPending}>
          Check-In
        </Form.SubmitBtn>
        <Button
          option="outline"
          color="info"
          onClick={() => navigate({ to: '..' })}
          disabled={isPending}
        >
          トップに戻る
        </Button>
      </Form>
      <Notification>
        {notification.notificationItems.map((item) => (
          <Notification.Alert
            key={item.id}
            color="error"
            className="text-xl flex items-center gap-3"
          >
            <CircleX className="w-6 h-6" />
            <span>{item.message}</span>
          </Notification.Alert>
        ))}
      </Notification>
    </>
  );
}
