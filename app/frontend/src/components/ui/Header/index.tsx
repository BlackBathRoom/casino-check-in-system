import { Link } from '@tanstack/react-router';

const Header: React.FC = () => {
  return (
    <header className="w-full navbar px-2 md:px-10 lg:px-30 py-2 shadow-md bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost">
          <h1 className="text-2xl font-bbh">THE TECH CASINO BAR</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
