import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type Props = {
  children: ReactNode;
  className?: string;
};

const ModalAction: React.FC<Props> = ({ children, className = '' }) => {
  return <div className={cn('modal-action', className)}>{children}</div>;
};

export default ModalAction;
