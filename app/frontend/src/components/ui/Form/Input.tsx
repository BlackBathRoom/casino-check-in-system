import type { ClassMap, Color } from '@/types/component';
import { cn } from '@/utils/cn';

const colorMap: ClassMap<Color, 'input'> = {
  neutral: 'input-neutral',
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  info: 'input-info',
  success: 'input-success',
  warning: 'input-warning',
  error: 'input-error',
} as const;

export type Props<T> = {
  type?: 'text' | 'number';
  value: T;
  setValue: (value: string) => void;
  id?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  errorMessage?: string;
  isRequired?: boolean;
  color?: Color;
  className?: string;
};

const Input = <T extends string | number>({
  type,
  value,
  setValue,
  min = undefined,
  max = undefined,
  minLength = undefined,
  maxLength = undefined,
  placeholder = '',
  errorMessage = '',
  isRequired = false,
  color = 'neutral',
  className = '',
  id,
}: Props<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type && (typeof value === 'number' ? 'number' : 'text')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        className={cn('validator input', colorMap[color], className)}
        required={isRequired}
        title={errorMessage}
      />
      {errorMessage && <p className="validator-hint">{errorMessage}</p>}
    </div>
  );
};

export default Input;
