import Input from '@/components/ui/Form/Input';
import Label from '@/components/ui/Form/Label';
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

export default Form;
