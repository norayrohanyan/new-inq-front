import styled, { keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.darkBg};
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    gap: 2rem;
  }
`;

/* Progress Steps */
export const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  width: 100%;
  max-width: 1000px;
  padding: 2rem 0;

  @media (max-width: 768px) {
    gap: 0;
    padding: 1.5rem 0;
  }
`;

export const StepWrapper = styled.div`
  display: flex;
  align-items: baseline;
  flex: 1;
  
  &:last-child {
    flex: 0;
  }
`;

export const StepItem = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  position: relative;
`;

export const StepIcon = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $active, $completed }) =>
    $completed ? 'linear-gradient(92.57deg, #F6572F 0%, #FE7F3B 49.5%, #FEB245 100%)' :
    $active ? 'linear-gradient(92.57deg, #F6572F 0%, #FE7F3B 49.5%, #FEB245 100%)' : 
    COLORS.darkBgSemi};
  border: 2px solid ${({ $active, $completed }) =>
    $completed || $active ? 'none' : COLORS.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  font-weight: 600;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    font-size: 1rem;
  }
`;

export const StepIconInner = styled.div`
  width: 20px;
  height: 20px;
  background: ${COLORS.white};
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
    border-radius: 3px;
  }
`;

export const StepLine = styled.div<{ $completed: boolean }>`
  flex: 1;
  height: 2px;
  background: ${({ $completed }) => $completed ? COLORS.brandOrangeMid : COLORS.borderColor};
  margin: 0 1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin: 0 0.5rem;
  }
`;

export const StepLabel = styled.div<{ $active?: boolean }>`
  color: ${({ $active }) => $active ? COLORS.white : COLORS.secondarySemiLight};
  font-size: 0.95rem;
  font-weight: ${({ $active }) => $active ? '600' : '500'};
  white-space: nowrap;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

/* Content Area */
export const ContentArea = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

/* Selection List */
export const SelectionList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SelectionItem = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: ${COLORS.darkBgSemi};
  border: 2px solid ${({ $selected }) => $selected ? COLORS.brandOrangeMid : 'transparent'};
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${COLORS.brandOrangeMid};
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Checkbox = styled.div<{ $checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid ${({ $checked }) => $checked ? 'none' : COLORS.borderColor};
  background: ${({ $checked }) => $checked ? COLORS.brandGradient : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${({ $checked }) => $checked && `
    &::after {
      content: '✓';
      color: ${COLORS.white};
      font-size: 14px;
      font-weight: bold;
    }
  `}
`;

/* Employee Selection */
export const EmployeeGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const EmployeeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 450px;
  overflow-y: auto;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${COLORS.darkBgSemi};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.borderColor};
    border-radius: 2px;
  }
`;

export const EmployeeItem = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${COLORS.darkBgSemi};
  border: 2px solid ${({ $selected }) => $selected ? COLORS.brandOrangeMid : 'transparent'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${COLORS.brandOrangeMid};
  }
`;

export const EmployeeAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const PreSelectedBanner = styled.div`
  width: 100%;
  padding: 1.5rem;
  background: rgba(254, 127, 59, 0.1);
  border: 2px solid ${COLORS.brandOrangeMid};
  border-radius: 16px;
  margin-bottom: 2rem;
`;

export const PreSelectedEmployee = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  ${EmployeeAvatar} {
    width: 56px;
    height: 56px;
  }
`;

export const AdditionalServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 450px;
  overflow-y: auto;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${COLORS.darkBgSemi};
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.borderColor};
    border-radius: 2px;
  }
`;

export const AdditionalServiceItem = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: ${COLORS.darkBgSemi};
  border: 2px solid ${({ $selected }) => $selected ? COLORS.brandOrangeMid : 'transparent'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: ${COLORS.brandOrangeMid};
  }
`;

export const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ServiceCheckbox = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${({ $checked }) => $checked ? COLORS.brandOrangeMid : COLORS.borderColor};
  background: ${({ $checked }) => $checked ? COLORS.brandGradient : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${({ $checked }) => $checked && `
    &::after {
      content: '✓';
      color: ${COLORS.white};
      font-size: 12px;
      font-weight: bold;
    }
  `}
`;

/* Booking Summary Section */
export const BookingSummarySection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

export const SummaryTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${COLORS.borderColor};
`;

export const SummaryActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    justify-content: end;
  }
`;

/* Date/Time Selection */
export const DateTimeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 700px;
`;

export const TimeSlotsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const EmptyMessage = styled.div`
  width: 100%;
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid ${COLORS.borderColor};
  margin-top: 2rem;
`;

export const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

export const TimeSlotButton = styled.button<{ $selected: boolean }>`
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 0.5px solid ${({ $selected }) => $selected ? 'none' : COLORS.borderColor};
  background: ${({ $selected }) => $selected ? COLORS.brandGradient : COLORS.darkBgSemi};
  : COLORS.darkBgSemi};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${COLORS.brandOrangeMid};
    background: ${({ $selected }) => $selected ? COLORS.brandGradient : 'rgba(255, 255, 255, 0.05)'};
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
  }
`;

/* Booking Info */
export const BookingInfoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${COLORS.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem 0;
`;

export const GuestSection = styled.div<{ $expanded: boolean }>`
  display: grid;
  grid-template-rows: ${({ $expanded }) => ($expanded ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease;

  > div {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${COLORS.darkBgSemi};
  border: 1px solid ${COLORS.borderColor};
  border-radius: 12px;
  color: ${COLORS.white};
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${COLORS.secondarySemiLight};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.brandOrangeMid};
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem 1.5rem;
  background: transparent;
  border: 1px solid ${COLORS.borderColor};
  border-radius: 12px;
  color: ${COLORS.white};
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  resize: none;
  min-height: 150px;
  max-height: 300px;

  margin-top: 1rem;

  &::placeholder {
    color: ${COLORS.secondarySemiLight};
  }

  &:focus {
    outline: none;
    border-color: ${COLORS.brandOrangeMid};
    background: rgba(255, 255, 255, 0.02);
  }
`;

/* Action Buttons */
export const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  width: 100%;
  max-width: 800px;
`;

/* Success Screen */
export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 600px;
  padding: 4rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

export const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  color: ${COLORS.brandOrangeMid};
  animation: scaleIn 0.5s ease-out;

  @keyframes scaleIn {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const SuccessButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

/* Loading */
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid ${COLORS.brandOrangeMid};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

/* Company Selection */
export const CompanySelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
`;

export const CompanySelectionCard = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${({ $selected }) => $selected ? COLORS.brandOrangeMid : 'rgba(255, 255, 255, 0.05)'};
  border: 2px solid ${({ $selected }) => $selected ? COLORS.brandOrangeMid : 'transparent'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $selected }) => $selected ? COLORS.brandOrangeMid : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
  }
`;

export const CompanyLogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CompanyPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
`;

export const CompanyInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const CompanyRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    fill: ${COLORS.brandOrangeMid};
  }
`;

export const IndividualTag = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
  width: fit-content;
`;

export const EmptyStateMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  width: 100%;
`;

