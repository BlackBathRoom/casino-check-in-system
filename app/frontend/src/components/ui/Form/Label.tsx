export type Props = {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
};

const Label: React.FC<Props> = ({ children, htmlFor, className = '' }) => {
  return (
    <label
      className={['label', className].filter(Boolean).join(' ')}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
