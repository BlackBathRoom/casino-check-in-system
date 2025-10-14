import type { Props as ButtonProps } from '@/components/ui/Button';
import Button from '@/components/ui/Button';

export type Props = Omit<ButtonProps, 'type'>;

const SubmitBtn: React.FC<Props> = (props) => (
  <Button {...props} type="submit" />
);

export default SubmitBtn;
