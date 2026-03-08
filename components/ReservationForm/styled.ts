import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT, TABLET_SIZE_BREAKPOINT } from '@/consts';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: ${COLORS.darkBgSemi};
  border-radius: 20px;
  padding: 1rem;
  top: 100px;

  @media (max-width: ${TABLET_SIZE_BREAKPOINT}px) {
    position: static;
    order: 2;
  }

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    padding: 1.5rem;
  }
`;

export const HostSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${COLORS.borderColor};

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    order: 1;
  }
`;

export const HostAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${COLORS.brandOrangeMid};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
`;

export const Label = styled.label`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${COLORS.white};
`;

export const Input = styled.input`
  background: ${COLORS.darkBg};
  border: 1px solid ${COLORS.borderColor};
  border-radius: 12px;
  padding: 0.875rem 1rem;
  color: ${COLORS.white};
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${COLORS.brandOrangeMid};
  }

  &::placeholder {
    color: ${COLORS.secondarySemiLight};
  }

  /* Style for datetime-local input */
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

export const TextArea = styled.textarea`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${COLORS.borderColor};
  padding: 0.75rem 0;
  color: ${COLORS.white};
  font-size: 1rem;
  min-height: 40px;
  resize: none;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: ${COLORS.brandOrangeMid};
  }

  &::placeholder {
    color: ${COLORS.secondarySemiLight};
  }

  scrollbar-width: thin;
  scrollbar-color: ${COLORS.brandOrangeMid} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.brandOrangeMid};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.brandOrangeStart};
  }
`;

export const GuestCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-bottom: 1px solid ${COLORS.borderColor};
  padding: 0.5rem 1rem;
`;

export const CounterButton = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: ${COLORS.brandGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${COLORS.white};
  font-size: 18px;
  transition: all 0.3s ease;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 3px;
    background: ${COLORS.darkBgSemi};
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);

    &::before {
      background: ${COLORS.brandGradient};
    }
  }

  &:active {
    transform: scale(0.95);

    &::before {
      background: ${COLORS.brandGradient};
    }
  }
`;

export const CounterValue = styled.span`
  flex: 1;
  color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 600;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;

export const Checkbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  cursor: pointer;
  background: transparent;
  border: 2px solid ${COLORS.brandOrangeMid};
  border-radius: 6px;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${COLORS.white};
    font-size: 14px;
    font-weight: 600;
  }
`;

export const CheckboxLabel = styled.label`
  color: ${COLORS.white};
  font-size: 1rem;
  cursor: pointer;
`;

export const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 0 0 0;
  margin-top: 1rem;
`;

export const TotalPriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

export const OldPriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

export const OldPrice = styled.span`
  color: ${COLORS.secondarySemiLight};
  font-size: 0.9rem;
  font-weight: 400;
  text-decoration: line-through;
`;

export const DateInputButton = styled.button`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${COLORS.borderColor};
  padding: 0.75rem 0;
  color: ${COLORS.white};
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &::after {
    content: '▼';
    color: ${COLORS.secondarySemiLight};
    font-size: 0.75rem;
    margin-left: auto;
  }

  &:hover {
    border-bottom-color: ${COLORS.brandOrangeMid};
  }

  &:focus {
    outline: none;
    border-bottom-color: ${COLORS.brandOrangeMid};
  }
`;

export const CalendarPopover = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  overflow: visible;
  width: max-content;
  min-width: 350px;
`;

export const DateFieldsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const ErrorMessage = styled.div`
  background: rgba(255, 82, 82, 0.1);
  border: 1px solid ${COLORS.accentRed};
  border-radius: 8px;
  padding: 0.75rem 1rem;
`;
