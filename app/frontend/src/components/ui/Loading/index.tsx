import type { ClassMap, Color, Size } from '@/types/component';
import { cn } from '@/utils/cn';

type Variety = 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';

const varietyClassesMap: ClassMap<Variety, 'loading'> = {
  spinner: 'loading-spinner',
  dots: 'loading-dots',
  ring: 'loading-ring',
  ball: 'loading-ball',
  bars: 'loading-bars',
  infinity: 'loading-infinity',
};

const sizeClassesSizeMap: ClassMap<Size, 'loading'> = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
  xl: 'loading-xl',
} as const;

const colorClassesMap: ClassMap<Color, 'text'> = {
  neutral: 'text-neutral',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  info: 'text-info',
  error: 'text-error',
  success: 'text-success',
  warning: 'text-warning',
};

type Props = {
  variety?: Variety;
  size?: Size;
  color?: Color;
  className?: string;
};

const Loading: React.FC<Props> = ({
  variety = 'spinner',
  size = 'md',
  color = 'neutral',
  className = undefined,
}) => {
  return (
    <span
      className={cn(
        'loading',
        varietyClassesMap[variety],
        sizeClassesSizeMap[size],
        colorClassesMap[color],
        className
      )}
    ></span>
  );
};

export default Loading;
