import { InputHTMLAttributes } from 'react';

export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: React.ReactNode;
  error?: string;
  fullWidth?: boolean;
}

