import type { ClassMap, Color } from '@/types/component';
import type { PickLiteral } from '@/types/utils';
import { cn } from '@/utils/cn';

type Variant = 'outline' | 'dash' | 'soft';
type AlertColor = PickLiteral<Color, 'success' | 'error' | 'warning' | 'info'>;

const variantMap: ClassMap<Variant, 'alert'> = {
  outline: 'alert-outline',
  dash: 'alert-dash',
  soft: 'alert-soft',
} as const;

const colorMap: ClassMap<AlertColor, 'alert'> = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
} as const;

export type Props = {
  children: React.ReactNode;
  variant?: Variant;
  color?: AlertColor;
  className?: string;
};

const Alert: React.FC<Props> = ({
  children,
  variant,
  color,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'alert',
        variant && variantMap[variant],
        color && colorMap[color],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Alert;
