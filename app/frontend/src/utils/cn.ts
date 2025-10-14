import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClassValue } from 'clsx';

export const cn = (...classes: Array<ClassValue>): string =>
  twMerge(clsx(classes));
