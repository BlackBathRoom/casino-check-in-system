import ModalAction from './ModalAction';
import type { ReactElement, ReactNode } from 'react';

import type { ClassMap } from '@/types/component';
import type { Props as ModalActionProps } from './ModalAction';
import { cn } from '@/utils/cn';

type ModalVertical = 'top' | 'middle' | 'bottom';
const ModalVertical: ClassMap<ModalVertical, 'modal'> = {
  top: 'modal-top',
  middle: 'modal-middle',
  bottom: 'modal-bottom',
} as const;

type ModalHorizontal = 'start' | 'end';
const ModalHorizontal: ClassMap<ModalHorizontal, 'modal'> = {
  start: 'modal-start',
  end: 'modal-end',
} as const;

type Props = {
  children:
    | ReactNode
    | ReactElement<ModalActionProps>
    | Array<ReactElement<ModalActionProps>>;
  modalId: HTMLElement['id'];
  vertical?: ModalVertical;
  horizontal?: ModalHorizontal | 'center';
  className?: string;
  closeOnBackDrop?: boolean;
};

const Modal: React.FC<Props> & {
  Action: typeof ModalAction;
} = ({
  children,
  modalId,
  vertical = 'middle',
  horizontal = 'center',
  className = '',
  closeOnBackDrop = true,
}) => {
  return (
    <dialog
      id={modalId}
      className={cn(
        'modal',
        ModalVertical[vertical],
        horizontal !== 'center' && ModalHorizontal[horizontal]
      )}
    >
      <div className={cn('modal-box h-fit w-fit', className)}>{children}</div>
      {closeOnBackDrop && (
        <form method="dialog" className="modal-backdrop">
          <button className="h-full w-full" />
        </form>
      )}
    </dialog>
  );
};

Modal.Action = ModalAction;

export default Modal;
