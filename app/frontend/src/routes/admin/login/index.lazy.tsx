import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import Form from '@/components/ui/Form';
import Divider from '@/components/layout/Divider';
import { useLogin } from '@/api/routes/auth';

export const Route = createLazyFileRoute('/admin/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        name,
        password,
        role: 'admin',
      },
      {
        onSuccess: () => {
          navigate({
            to: '..',
          });
        },
      }
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="card card-border bg-base-100 shadow-md w-full max-w-md m-auto"
    >
      <div className="card-body flex flex-col gap-5 px-5 py-7">
        <h2 className="card-title text-primary text-3xl mx-auto">
          Admin Login
        </h2>
        <span></span>
        <Divider />
        <div className="flex flex-col gap-3 px-3">
          <div className="flex flex-col gap-1">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Input
              id="name"
              type="text"
              value={name}
              color="info"
              setValue={(val) => setName(val)}
              placeholder="Enter admin name"
              className="w-full"
              isRequired
            />
          </div>
          <div className="flex flex-col gap-1">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Input
              id="password"
              type="text"
              value={password}
              color="info"
              setValue={(val) => setPassword(val)}
              placeholder="Enter admin password"
              className="w-full"
              isRequired
            />
          </div>
        </div>
        <Divider direction="horizontal" />
        <Form.SubmitBtn
          color="primary"
          className="w-full py-2 text-xl"
          disabled={isPending}
        >
          Login
        </Form.SubmitBtn>
      </div>
    </Form>
  );
}
