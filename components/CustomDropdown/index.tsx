'use client';

import { useState, useRef, useEffect } from 'react';
import * as Styled from './styled';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  error?: boolean;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder,
  required = false,
  error = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

      {isOpen && (
        <Styled.DropdownList>
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
      )}
    </Styled.DropdownContainer>
  );
}
