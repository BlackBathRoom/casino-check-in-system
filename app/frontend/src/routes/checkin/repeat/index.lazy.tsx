import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import Divider from '@/components/layout/Divider';
import Form from '@/components/ui/Form';
import Button from '@/components/ui/Button';

export const Route = createLazyFileRoute('/checkin/repeat/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    navigate({
      to: '/checkin/$userId',
      params: {
        userId,
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
            className="w-full"
            isRequired
          />
        </div>
        <Divider direction="horizontal" />
        <Form.SubmitBtn color="info">Check-In</Form.SubmitBtn>
        <Button option="outline" color="neutral">
          トップに戻る
        </Button>
      </Form>
    </>
  );
}
