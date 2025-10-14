import { Link } from '@tanstack/react-router';
import { ClipboardCheck, UserStar } from 'lucide-react';
import Button from '@/components/ui/Button';

const Header: React.FC = () => {
  return (
    <header className="w-full navbar px-5 md:px-10 lg:px-30 py-2 shadow-md bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost">
          <h1 className="text-2xl">チェックインシステム</h1>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-5">
          <li>
            <Button color="secondary" className="text-lg">
              <Link to="/checkin" className="flex gap-1">
                <ClipboardCheck className="h-6 w-6 pt-1" />
                <span>チェックイン</span>
              </Link>
            </Button>
          </li>
          <li>
            <Button color="primary" className="text-lg">
              <Link to="/admin" className="flex gap-1">
                <UserStar className="h-6 w-6 pt-1" />
                <span>管理者</span>
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
