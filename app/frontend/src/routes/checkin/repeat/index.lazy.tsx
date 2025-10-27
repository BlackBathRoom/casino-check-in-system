import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { CircleX } from 'lucide-react';
import Divider from '@/components/layout/Divider';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';
import { useReenterUser } from '@/api/route/users';
import { useNotification } from '@/hooks/useNotification';
import Notification from '@/components/ui/Notification';

export const Route = createLazyFileRoute('/checkin/repeat/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [userId, setUserId] = useState<string>('');
  const { mutate, isPending } = useReenterUser();
  const navigate = useNavigate();

  const notification = useNotification();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    mutate(userId, {
      onSuccess: () => {
        navigate({
          to: '/checkin/$userId',
          params: { userId },
        });
      },
      onError: () => {
        notification.addNotification({
          message: 'ユーザーIDが見つかりません。再度ご確認ください。',
          type: 'error',
        });
      },
    });
  };

  return (
    <>
      <Divider direction="horizontal" />
      <Form onSubmit={handleSubmit} className="py-4 w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-full mt-2">
          <Form.Label htmlFor="userID">ユーザーID</Form.Label>
          <Form.Input
            id="userID"
            value={userId}
            setValue={setUserId}
            minLength={1}
            maxLength={4}
            errorMessage="ユーザーIDは1字以上4字以内で入力してください"
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
