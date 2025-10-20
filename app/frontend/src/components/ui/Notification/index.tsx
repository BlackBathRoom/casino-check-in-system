import type { Props as AlertProps } from '@/components/ui/Notification/Alert';
import type { ClassMap } from '@/types/component';
import Alert from '@/components/ui/Notification/Alert';
import { cn } from '@/utils/cn';

type Place = 'start' | 'center' | 'end' | 'top' | 'middle' | 'bottom';

const placeMap: ClassMap<Place, 'toast'> = {
  start: 'toast-start',
  center: 'toast-center',
  end: 'toast-end',
  top: 'toast-top',
  middle: 'toast-middle',
  bottom: 'toast-bottom',
} as const;

type Props = {
  children:
    | React.ReactElement<AlertProps>
    | Array<React.ReactElement<AlertProps>>;
  place?: Place;
  className?: string;
};

const Notification: React.FC<Props> & {
  Alert: typeof Alert;
} = ({ children, place, className }) => {
  return (
    <div className={cn('toast', place && placeMap[place], className)}>
      {children}
    </div>
  );
};

Notification.Alert = Alert;

export default Notification;
