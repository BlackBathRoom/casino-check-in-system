import { cn } from '@/utils/cn';

export type Props<T> = {
  value: T;
  setValue: (value: string) => void;
  id?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  errorMessage?: string;
  isRequired?: boolean;
  className?: string;
};

const Input = <T extends string | number>({
  value,
  setValue,
  min = undefined,
  max = undefined,
  minLength = undefined,
  maxLength = undefined,
  errorMessage = '',
  isRequired = false,
  className = '',
  id,
}: Props<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={typeof value === 'number' ? 'number' : 'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        className={cn('validator input', className)}
        required={isRequired}
        title={errorMessage}
      />
      {errorMessage && <p className="validator-hint">{errorMessage}</p>}
    </div>
  );
};

export default Input;
