import type { ChangeEvent } from 'react';

import type { ClassMap, Color, Size } from '@/types/component';
import { cn } from '@/utils/cn';

const sizeClass: ClassMap<Size, 'select'> = {
  xs: 'select-xs',
  sm: 'select-sm',
  md: 'select-md',
  lg: 'select-lg',
  xl: 'select-xl',
};

const colorMap: ClassMap<Color, 'select'> = {
  primary: 'select-primary',
  secondary: 'select-secondary',
  accent: 'select-accent',
  neutral: 'select-neutral',
  success: 'select-success',
  warning: 'select-warning',
  error: 'select-error',
  info: 'select-info',
};

type Option = {
  id: number;
  label: string;
};

type Props = {
  options: Array<Option>;
  setSelectOption: (id: number) => void;
  label?: string | number;
  id?: string;
  size?: Size;
  color?: Color;
  ghost?: boolean;
  osNative?: boolean;
  isDefaultValueDisabled?: boolean;
  className?: string;
};

const Select: React.FC<Props> = ({
  options,
  setSelectOption,
  label,
  size = 'md',
  color = 'neutral',
  ghost = false,
  osNative = false,
  className = '',
  id,
}) => {
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (e.target.value === label) return;
    setSelectOption(parseInt(e.target.value));
  };

  return (
    <select
      id={id}
      defaultValue={label}
      className={cn(
        'select select-primary',
        sizeClass[size],
        colorMap[color],
        ghost && 'select-ghost',
        osNative && 'appearance-none',
        className
      )}
      onChange={handleSelect}
      required
    >
      {label && (
        <option disabled value={label}>
          {label}
        </option>
      )}
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
