import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const CalendarContainer = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 20px;
  padding: 1.25rem;
  width: 100%;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const MonthNavButton = styled.button`
  background: transparent;
  border: none;
  color: ${COLORS.brandOrangeMid};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(254, 127, 59, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const DaysOfWeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.35rem;
  margin-bottom: 0.5rem;
`;

export const DayOfWeekCell = styled.div`
  text-align: center;
  padding: 0.3rem 0;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.35rem;
`;

export const DayCell = styled.div<{
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $isSelected: boolean;
  $isDisabled?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.25rem;
  border-radius: 6px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $isCurrentMonth, $isDisabled }) =>
    !$isCurrentMonth || $isDisabled ? 0.4 : 1};
  background: ${({ $isSelected }) =>
    $isSelected ? COLORS.brandOrangeMid : 'transparent'};
  transition: all 0.2s ease;
  position: relative;
  min-height: 50px;
  overflow: hidden;

  &:hover {
    background: ${({ $isDisabled, $isSelected }) =>
      $isDisabled
        ? 'transparent'
        : $isSelected
        ? COLORS.brandOrangeMid
        : 'rgba(255, 255, 255, 0.05)'};
  }
`;

export const DayNumber = styled.div<{ $isToday: boolean }>`
  color: ${COLORS.white};
  font-size: 0.8rem;
  font-weight: ${({ $isToday }) => ($isToday ? '600' : '400')};
  text-decoration: ${({ $isToday }) => ($isToday ? 'underline' : 'none')};
  text-decoration-color: ${({ $isToday }) =>
    $isToday ? COLORS.brandOrangeMid : 'transparent'};
  margin-bottom: 0.15rem;
  line-height: 1.1;
`;

export const DayPrice = styled.div<{ $isDiscounted?: boolean }>`
  color: ${({ $isDiscounted }) =>
    $isDiscounted ? COLORS.accentRed : COLORS.brandOrangeMid};
  font-size: 0.5rem;
  font-weight: 500;
  text-decoration: ${({ $isDiscounted }) =>
    $isDiscounted ? 'line-through' : 'none'};
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

