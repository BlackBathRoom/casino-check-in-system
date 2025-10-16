import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import Divider from '@/components/layout/Divider';
import Form from '@/components/ui/Form';

export const Route = createLazyFileRoute('/checkin/repeat/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [userId, setUserId] = useState<string>('');

  return (
    <>
      <Divider direction="horizontal" />
      <Form className="py-4 w-full flex flex-col gap-3">
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
      </Form>
    </>
  );
}
