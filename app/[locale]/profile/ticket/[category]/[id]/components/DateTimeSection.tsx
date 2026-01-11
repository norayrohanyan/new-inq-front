import Text from '@/components/Text';
import * as Styled from '../styled';

interface IDateTimeSectionProps {
  startLabel: string;
  endLabel: string;
  startDateTime: string;
  endDateTime: string;
}

// Date/time formatting utilities
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const formatDayOfWeek = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const DateTimeSection = ({
  startLabel,
  endLabel,
  startDateTime,
  endDateTime,
}: IDateTimeSectionProps) => {
  return (
    <Styled.DateTimeGrid>
      <Styled.DateTimeBlock>
        <Text type="h5" color="white" fontWeight="500">
          {startLabel}
        </Text>
        <Text type="body" customColor="#999999">
          {formatDate(startDateTime)}
        </Text>
        <Text type="body" customColor="#999999">
          {formatTime(startDateTime)}
        </Text>
        <Text type="caption" customColor="#999999">
          {formatDayOfWeek(startDateTime)}
        </Text>
      </Styled.DateTimeBlock>
      <Styled.DateTimeBlock>
        <Text type="h5" color="white" fontWeight="500">
          {endLabel}
        </Text>
        <Text type="body" customColor="#999999">
          {formatDate(endDateTime)}
        </Text>
        <Text type="body" customColor="#999999">
          {formatTime(endDateTime)}
        </Text>
        <Text type="caption" customColor="#999999">
          {formatDayOfWeek(endDateTime)}
        </Text>
      </Styled.DateTimeBlock>
    </Styled.DateTimeGrid>
  );
};

// Export utilities for reuse
export { formatDate, formatTime, formatDayOfWeek };

