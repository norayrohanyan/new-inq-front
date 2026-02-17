'use client';

import React, { useCallback, useState } from 'react';
import * as Styled from './styled';
import { IInputProps } from './types';
import { EyeIcon, EyeOffIcon } from '@/components/icons';

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ icon, prefix, error, fullWidth = true, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    const setRef = useCallback(
      (node: HTMLInputElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setShowPassword((prev) => !prev);
    };

    if (prefix) {
      return (
        <Styled.InputWrapper $fullWidth={fullWidth}>
          <Styled.PrefixWrapper>
            <Styled.PrefixText>{prefix}</Styled.PrefixText>
            <Styled.PrefixInput
              ref={setRef}
              type={inputType}
              {...props}
            />
          </Styled.PrefixWrapper>
          {error && <Styled.ErrorText>{error}</Styled.ErrorText>}
        </Styled.InputWrapper>
      );
    }

    return (
      <Styled.InputWrapper $fullWidth={fullWidth}>
        {icon && <Styled.IconWrapper>{icon}</Styled.IconWrapper>}
        <Styled.StyledInput
          ref={setRef}
          $hasIcon={!!icon}
          $hasEyeIcon={isPasswordType}
          type={inputType}
          {...props}
        />
        {isPasswordType && (
          <Styled.EyeIconWrapper onClick={(e: React.MouseEvent<HTMLDivElement>) => togglePasswordVisibility(e)}>
            {showPassword ? (
              <EyeOffIcon width="20" height="20" />
            ) : (
              <EyeIcon width="20" height="20" />
            )}
          </Styled.EyeIconWrapper>
        )}
        {error && <Styled.ErrorText>{error}</Styled.ErrorText>}
      </Styled.InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;
