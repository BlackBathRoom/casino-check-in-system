import { cn } from '@/utils/cn';

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
        className={cn('validator input', className)}
        required={isRequired}
        title={errorMessage}
      />
      {errorMessage && <p className="validator-hint">{errorMessage}</p>}
    </div>
  );
};

export default Input;
