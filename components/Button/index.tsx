'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import * as Styled from './styled';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  rounded?: boolean;
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  rounded = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <Styled.Button
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      $rounded={rounded}
      disabled={disabled || isLoading}
      className={className}
      {...props}
    >
      {isLoading ? <Styled.Spinner /> : children}
    </Styled.Button>
  );
}

