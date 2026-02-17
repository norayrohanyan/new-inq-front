import { InputHTMLAttributes } from 'react';

export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: React.ReactNode;
  prefix?: string;
  error?: string;
  fullWidth?: boolean;
}

