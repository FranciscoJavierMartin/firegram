import React, { InputHTMLAttributes } from 'react';

interface IFormInputProps extends InputHTMLAttributes<any> {
  label: string;
  value: string;
}

const FormInput: React.FC<IFormInputProps> = ({
  onChange,
  label,
  ...otherProps
}: IFormInputProps) => {
  return (
    <div>
      <label>{label}</label>
      <input onChange={onChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
