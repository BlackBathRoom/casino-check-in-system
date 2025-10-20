import type { LucideProps } from 'lucide-react';
import { cn } from '@/utils/cn';

type Props = {
  children: React.ReactNode;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  iconClassName?: string;
  className?: string;
};

const IconLabel: React.FC<Props> = ({
  children,
  icon: Icon,
  iconClassName,
  className,
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Icon className={cn('h-5 w-5', iconClassName)} />
      {children}
    </div>
  );
};

export default IconLabel;
