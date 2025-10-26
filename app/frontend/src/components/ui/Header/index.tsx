import ThemeToggle from '@/components/ui/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="w-full navbar px-2 md:px-10 lg:px-30 py-2 shadow-md bg-base-100">
      <div className="flex-1">
        <h1 className="text-2xl font-bbh">THE TECH CASINO BAR</h1>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
