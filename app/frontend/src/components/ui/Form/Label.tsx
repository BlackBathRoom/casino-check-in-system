import { cn } from '@/utils/cn';

export type Props = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
};

const Label: React.FC<Props> = ({ children, htmlFor, className = '' }) => {
  return (
    <label className={cn('label', className)} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
