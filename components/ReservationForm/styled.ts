import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: ${COLORS.darkBgSemi};
  border-radius: 20px;
  padding: 1rem;
  top: 100px;

  @media (max-width: 968px) {
    position: static;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const HostSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${COLORS.borderColor};
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
`;

export const GuestCounter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${COLORS.darkBg};
  border: 1px solid ${COLORS.borderColor};
  border-radius: 12px;
  padding: 0.5rem 1rem;
`;

export const CounterButton = styled.button`
  background: ${COLORS.brandOrangeMid};
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${COLORS.white};
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${COLORS.brandOrangeStart};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CounterValue = styled.span`
  flex: 1;
  text-align: center;
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
  align-items: center;
  padding: 1.5rem 0 0 0;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
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
  
  @media (max-width: 768px) {
    min-width: 300px;
  }
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
