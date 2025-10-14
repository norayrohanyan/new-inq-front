'use client';

import React, { useCallback } from 'react';
import * as Styled from './styled';
import { IInputProps } from './types';

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ icon, error, fullWidth = true, ...props }, ref) => {
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

    return (
      <Styled.InputWrapper $fullWidth={fullWidth}>
        {icon && <Styled.IconWrapper>{icon}</Styled.IconWrapper>}
        <Styled.StyledInput ref={setRef} $hasIcon={!!icon} {...props} />
        {error && <Styled.ErrorText>{error}</Styled.ErrorText>}
      </Styled.InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;

