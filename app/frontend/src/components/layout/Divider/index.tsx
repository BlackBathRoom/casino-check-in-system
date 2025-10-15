import React from 'react';

import type { ClassMap, Color } from '@/types/component';
import { cn } from '@/utils/cn';

type TextDirection = 'start' | 'end';

const textDirectionClassesMap: Record<TextDirection, string> = {
  start: 'divider-start',
  end: 'divider-end',
} as const;

const colorClassesMap: ClassMap<Color, 'divider'> = {
  neutral: 'divider-neutral',
  primary: 'divider-primary',
  secondary: 'divider-secondary',
  accent: 'divider-accent',
  info: 'divider-info',
  error: 'divider-error',
  success: 'divider-success',
  warning: 'divider-warning',
} as const;

type Props = {
  direction?: 'horizontal' | 'vertical';
  color?: Color | null;
  text?: string | null;
  textDirection?: TextDirection | null;
  className?: string;
};

const Divider: React.FC<Props> = ({
  direction = 'horizontal',
  color = null,
  text = null,
  textDirection = null,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'divider m-0 p-0 before:p-0 after:p-0',
        direction !== 'horizontal' && 'divider-horizontal',
        color && colorClassesMap[color],
        textDirection && textDirectionClassesMap[textDirection],
        className
      )}
    >
      {text ?? ''}
    </div>
  );
};

export default Divider;
