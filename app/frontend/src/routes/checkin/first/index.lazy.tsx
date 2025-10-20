import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import Form from '@/components/ui/Form';
import Divider from '@/components/layout/Divider';
import Button from '@/components/ui/Button';

export const Route = createLazyFileRoute('/checkin/first/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    navigate({
      to: '/checkin/$userId',
      params: {
        userId: '1234',
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
            errorMessage="お名前は1字以上50字以内で入力してください"
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
