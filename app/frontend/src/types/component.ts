type Color =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'info'
  | 'error';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ClassMap<TKey extends string, TPrefix extends string> = {
  [key in TKey]: `${TPrefix}-${key}`;
};

export type { ClassMap, Color, Size };
