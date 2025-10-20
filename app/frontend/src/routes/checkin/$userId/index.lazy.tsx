import { Link, createLazyFileRoute } from '@tanstack/react-router';
import { CircleCheck } from 'lucide-react';
import Button from '@/components/ui/Button';

export const Route = createLazyFileRoute('/checkin/$userId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();

  return (
    <div className="card-body flex flex-col items-center gap-5">
      <div className="card-title flex gap-2 items-center">
        <CircleCheck className="w-7 h-7 md:w-10 md:h-10 text-success" />
        <h2 className="text-success text-xl md:text-4xl pb-1">受付完了</h2>
      </div>
      <div className="flex flex-col items-center gap-3 text-lg md:text-xl bg-info/30 px-5 py-7 rounded-sm w-full">
        <p className="flex gap-1 items-center">
          <span>いらっしゃいませ</span>
          <span className="font-bold text-xl md:text-2xl">hogehoge</span>
          <span>様</span>
        </p>
        <p className="flex gap-1 items-center">
          <span>ユーザーIDは</span>
          <span className="pb-2 text-info font-bold text-4xl md:text-5xl">
            {params.userId}
          </span>
          <span>です。</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 text-center text-lg w-full md:text-lg">
        <p>
          ドリンク、チップの購入は
          <br className="md:hidden" />
          スタッフまでお声がけください。
        </p>
        <p>
          下記QRコードからログインの上、
          <br className="md:hidden" />
          マイページから注文も可能です。
        </p>
      </div>
      <div className="flex flex-col text-center text-lg">
        <p className="text-lg md:text-xl text-error">
          ※ユーザーIDは再発行できません。大切に保管してください。
        </p>
      </div>
      <Link to="/checkin" className="w-full flex items-center">
        <Button color="primary" className="w-full py-2 text-xl md:text-3xl">
          受付トップへ戻る
        </Button>
      </Link>
    </div>
  );
}
