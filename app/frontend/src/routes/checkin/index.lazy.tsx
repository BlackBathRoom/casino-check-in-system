import { Link, createLazyFileRoute } from '@tanstack/react-router';
import Divider from '@/components/layout/Divider';
import Button from '@/components/ui/Button';

export const Route = createLazyFileRoute('/checkin/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Divider direction="horizontal" />
      <Link to="/checkin/first" className="w-full">
        <Button color="primary" className="w-full text-xl md:text-3xl">
          新規ご来店の方
        </Button>
      </Link>
      <Link to="/checkin/repeat" className="w-full">
        <Button color="primary" className="w-full text-xl md:text-3xl">
          以前ご来店された方
        </Button>
      </Link>
      <Divider direction="horizontal" />
    </div>
  );
}
