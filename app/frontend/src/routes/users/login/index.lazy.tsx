import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { LogIn } from 'lucide-react';
import React, { useState } from 'react';
import Form from '@/components/ui/Form';
import Divider from '@/components/layout/Divider';
import { useLogin } from '@/api/routes/auth';

export const Route = createLazyFileRoute('/users/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();

  const { mutate, isPending, error } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        name: userName,
        password: userId,
        role: 'user',
      },
      {
        onSuccess: () => {
          navigate({
            to: '/users/$userId',
            params: { userId },
          });
        },
      }
    );
  };

  return (
    <div className="card card-border shadow-lg bg-base-100 px-5 py-8 w-full max-w-xl">
      <div className="card-title flex gap-3 justify-center">
        <LogIn className="w-10 h-10 text-info" />
        <h2 className="text-5xl font-bold text-info pb-2">ログイン</h2>
        <span>{error !== null && error.code}</span>
      </div>
      <div className="card-body">
        <Form className="flex flex-col gap-3" onSubmit={onSubmit}>
          <Divider direction="horizontal" />
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Form.Label htmlFor="userId">ユーザー名</Form.Label>
              <Form.Input
                id="userId"
                value={userName}
                setValue={(val) => setUserName(val)}
                minLength={1}
                maxLength={50}
                placeholder="Your user name"
                color="primary"
                className="w-full"
                isRequired
              />
            </div>
            <div className="flex flex-col gap-1">
              <Form.Label htmlFor="userId">ユーザーID</Form.Label>
              <Form.Input
                id="userId"
                value={userId}
                setValue={(val) => setUserId(val)}
                minLength={4}
                maxLength={4}
                placeholder="Your user ID"
                color="primary"
                className="w-full"
                isRequired
              />
            </div>
          </div>
          <Divider direction="horizontal" />
          <Form.SubmitBtn className="btn-info" disabled={isPending}>
            Log In
          </Form.SubmitBtn>
        </Form>
      </div>
    </div>
  );
}
