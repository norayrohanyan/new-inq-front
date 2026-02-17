import React, { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import * as Styled from './styled';
import { SearchIcon } from '@/components/icons';

interface ISearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showIcon?: boolean;
  maxWidth?: string;
  children?: React.ReactNode;
  debounceMs?: number;
}

const SearchInput = React.forwardRef<HTMLDivElement, ISearchInputProps>(
  ({ showIcon = true, maxWidth, children, debounceMs = 500, onChange, value, ...inputProps }, ref) => {
    const [localValue, setLocalValue] = useState(value ?? '');

    useEffect(() => {
      if (value !== undefined) setLocalValue(value);
    }, [value]);

    const debouncedOnChange = useMemo(
      () => (debounceMs ? debounce(onChange!, debounceMs) : onChange),
      [onChange, debounceMs]
    );

    useEffect(() => () => {
      if (debounceMs) (debouncedOnChange as ReturnType<typeof debounce>)?.cancel?.();
    }, [debouncedOnChange, debounceMs]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      debouncedOnChange?.(e);
    };

    return (
      <Styled.SearchWrapper ref={ref} $maxWidth={maxWidth}>
        {showIcon && <Styled.SearchIcon><SearchIcon /></Styled.SearchIcon>}
        <Styled.StyledSearchInput
          $hasIcon={showIcon}
          {...inputProps}
          value={debounceMs ? localValue : value}
          onChange={handleChange}
        />
        {children}
      </Styled.SearchWrapper>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
export { Styled as SearchInputStyled };
