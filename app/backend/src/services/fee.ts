import { InvalidTimeError } from '@/error';

const FEE_PER_BLOCK = 200;
const BLOCK_MINUTES = 30;
const MS_PER_MINUTE = 60_000;

const calculateElapsedMinutes = (start: Date, end: Date) => {
  const diffMs = end.getTime() - start.getTime();
  if (diffMs <= 0) {
    return 0;
  }
  return Math.ceil(diffMs / MS_PER_MINUTE);
};

export const calculateFee = (start: Date, end: Date = new Date()) => {
  if (end < start) {
    throw new InvalidTimeError('End time must be after start time.');
  }

  const elapsedMinutes = calculateElapsedMinutes(start, end);
  const blocks = Math.ceil(elapsedMinutes / BLOCK_MINUTES);

  return blocks * FEE_PER_BLOCK;
};
