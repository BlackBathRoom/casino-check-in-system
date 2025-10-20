import Input from '@/components/ui/Form/Input';
import Label from '@/components/ui/Form/Label';
import Radio from '@/components/ui/Form/Radio';
import Select from '@/components/ui/Form/Select';
import SubmitBtn from '@/components/ui/Form/SubmitBtn';

type Props = {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  className?: string;
};

const Form: React.FC<Props> & {
  Input: typeof Input;
  Label: typeof Label;
  Select: typeof Select;
  SubmitBtn: typeof SubmitBtn;
  Radio: typeof Radio;
} = ({ children, onSubmit, className = '' }) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

Form.Input = Input;
Form.Label = Label;
Form.Select = Select;
Form.SubmitBtn = SubmitBtn;
Form.Radio = Radio;

export default Form;
