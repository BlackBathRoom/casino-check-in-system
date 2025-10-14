import { createLazyFileRoute } from '@tanstack/react-router';
import { ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import Form from '@/components/ui/Form';

export const Route = createLazyFileRoute('/checkin/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState<string>('');
  const [seatNumber, setSeatNumber] = useState<number>(0);
  const [memo, setMemo] = useState<string>('');
  const [time, setTime] = useState<string>('');

  return (
    <div className="flex h-full items-center justify-center text-3xl">
      <div className="card shadow-lg min-w-md bg-base-100 card-border">
        <div className="card-body gap-3 w-full">
          <div className="card-title flex gap-3">
            <ClipboardCheck className="h-7 w-7" />
            <h2 className="text-xl font-bold">受付ページ/checkin</h2>
          </div>
          <Form className="ml-2 py-4 w-full">
            <div className="flex flex-col gap-2 w-full pl-0">
              <Form.Label>お名前</Form.Label>
              <Form.Input
                value={name}
                setValue={setName}
                minLength={1}
                maxLength={50}
                errorMessage="お名前は1字以上50字以内で入力してください"
                isRequired
              />
            </div>
            <details className="collapse collapse-arrow border-base-300 border">
              <summary className="collapse-title after:start-3 after:end-auto pe-4 ps-8">
                <span className="text-sm">オプション項目</span>
              </summary>
              <div className="collapse-content flex flex-col items-center gap-1">
                <div className="flex flex-col gap-2 w-full pl-5">
                  <Form.Label>席番号</Form.Label>
                  <Form.Input
                    value={seatNumber}
                    setValue={(value) => setSeatNumber(Number(value))}
                    min={1}
                    max={50}
                    errorMessage="席番号は1から50の間で入力してください"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full pl-5">
                  <Form.Label>メモ</Form.Label>
                  <Form.Input
                    value={memo}
                    setValue={setMemo}
                    maxLength={200}
                    errorMessage="備考は200字以内で入力してください"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full pl-5">
                  <Form.Label>時間指定</Form.Label>
                  <Form.Input
                    value={time}
                    setValue={setTime}
                    maxLength={200}
                    errorMessage="200字以内で入力してください"
                  />
                </div>
              </div>
            </details>
          </Form>
        </div>
      </div>
    </div>
  );
}
