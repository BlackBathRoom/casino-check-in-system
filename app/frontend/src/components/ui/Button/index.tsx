import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { ClassMap, Color, Size } from '@/types/component';

import { cn } from '@/utils/cn';

type Option = 'outline' | 'dash' | 'soft' | 'wide';

const optionClassMap: ClassMap<Option, 'btn'> = {
  outline: 'btn-outline',
  dash: 'btn-dash',
  soft: 'btn-soft',
  wide: 'btn-wide',
} as const;

const colorClassMap: ClassMap<Color, 'btn'> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  neutral: 'btn-neutral',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  info: 'btn-info',
} as const;

const sizeClassMap: ClassMap<Size, 'btn'> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
} as const;

export type Props = {
  children: ReactNode;
  color?: Color | null;
  size?: Size | null;
  option?: Option | null;
  className?: string;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  forceActive?: string;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  color = null,
  size = null,
  option = null,
  className = '',
  onClick,
  type = 'button',
  forceActive = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={cn(
        'btn',
        color && colorClassMap[color],
        size && sizeClassMap[size],
        option && optionClassMap[option],
        forceActive && !disabled && 'btn-active',
        disabled && 'btn-disabled',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
