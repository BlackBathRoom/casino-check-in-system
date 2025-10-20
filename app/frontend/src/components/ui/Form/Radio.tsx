import type { ClassMap, Color, Size } from '@/types/component';
import { cn } from '@/utils/cn';

const colorMap: ClassMap<Color, 'radio'> = {
  neutral: 'radio-neutral',
  primary: 'radio-primary',
  secondary: 'radio-secondary',
  accent: 'radio-accent',
  info: 'radio-info',
  success: 'radio-success',
  warning: 'radio-warning',
  error: 'radio-error',
} as const;

const sizeMap: ClassMap<Size, 'radio'> = {
  xs: 'radio-xs',
  sm: 'radio-sm',
  md: 'radio-md',
  lg: 'radio-lg',
  xl: 'radio-xl',
} as const;

type Items = {
  id: number;
  label: string;
};

type Props = {
  name: string;
  items: Array<Items>;
  value: number;
  setValue: (value: number) => void;
  color?: Color;
  size?: Size;
  className?: string;
};

const Radio: React.FC<Props> = ({
  name,
  items,
  value,
  setValue,
  color = 'primary',
  size = 'md',
  className = '',
}) => {
  return (
    <div className={cn('flex', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setValue(item.id)}
        >
          <input
            key={item.id}
            type="radio"
            name={name}
            className={cn('radio', colorMap[color], sizeMap[size])}
            checked={value === item.id}
            aria-label={item.label}
          />
          <label htmlFor={name}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
