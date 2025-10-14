import { useEffect, useMemo, useState } from 'react';
import type { Datetime } from '@/utils/time';

const toDate = (dt: Datetime) =>
  new Date(dt.year, dt.month - 1, dt.day, dt.hours, dt.minutes, dt.seconds);

const getElapsed = (start: Date) => {
  const diffMs = Math.max(0, Date.now() - start.getTime());
  const totalMinutes = Math.floor(diffMs / 60_000);

  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
};

type Props = {
  datetime: Datetime;
  isRunning: boolean;
  className?: string;
};

const Timer: React.FC<Props> = ({ datetime, isRunning, className }) => {
  const startDate = useMemo(() => toDate(datetime), [datetime]);
  const [elapsed, setElapsed] = useState(() => getElapsed(startDate));

  useEffect(() => {
    setElapsed(getElapsed(startDate));
  }, [startDate]);

  useEffect(() => {
    if (!isRunning) {
      setElapsed(getElapsed(startDate));
      return;
    }

    const updateElapsed = () => setElapsed(getElapsed(startDate));

    updateElapsed();
    const timerId = window.setInterval(updateElapsed, 1_000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [isRunning, startDate]);

  const hoursLabel = elapsed.hours.toString().padStart(2, '0');
  const minutesLabel = elapsed.minutes.toString().padStart(2, '0');

  return <span className={className}>{`${hoursLabel}:${minutesLabel}`}</span>;
};

export default Timer;
