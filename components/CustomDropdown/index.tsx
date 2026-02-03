'use client';

import { useState, useRef } from 'react';
import { useEventListener } from '@/hooks/useEventListener';
import * as Styled from './styled';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  /** Visual variant of the dropdown */
  variant?: 'default' | 'filled';
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  required = false,
  error = false,
  variant = 'default',
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEventListener(
    'mousedown',
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    isOpen ? document : null
  );

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <Styled.DropdownContainer ref={dropdownRef}>
      <Styled.DropdownButton
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        $hasError={error}
        $hasValue={!!value}
        $variant={variant}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <Styled.DropdownArrow $isOpen={isOpen}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Styled.DropdownArrow>
      </Styled.DropdownButton>

      <Styled.DropdownList $isOpen={isOpen} $variant={variant}>
        {options.map((option) => (
          <Styled.DropdownOption
            key={option.value}
            onClick={() => handleSelect(option.value)}
            $isSelected={value === option.value}
          >
            {option.label}
          </Styled.DropdownOption>
        ))}
      </Styled.DropdownList>
    </Styled.DropdownContainer>
  );
}
