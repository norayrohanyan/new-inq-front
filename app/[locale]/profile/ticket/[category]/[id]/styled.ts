import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${COLORS.darkBg};
  padding-top: 2rem;
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 100px;

  @media (max-width: 968px) {
    position: static;
  }
`;

export const MenuList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MenuItem = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 0.5px solid ${COLORS.borderColor};
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  text-align: left;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};

  &:hover {
    font-weight: 600;
    border-bottom-color: rgba(255, 255, 255, 0.4);
  }
`;

export const MenuIcon = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  text-align: left;

  &:hover {
    background: rgba(255, 59, 48, 0.1);
    border-color: rgba(255, 59, 48, 0.3);
  }
`;

export const MainContent = styled.main`
  min-height: 600px;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

// Ticket Detail Card Styles
export const TicketDetailCard = styled.div`
  background: ${COLORS.darkBgSemi};
  border-radius: 20px;
  padding: 24px;
  max-width: 780px;
  margin-bottom: 2rem;
`;

export const CardHeader = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ImageContainer = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: ${COLORS.white};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlaceholderImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${COLORS.secondaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const RatingBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    color: ${COLORS.brandOrangeMid};
    width: 16px;
    height: 16px;
  }
`;

export const StatusBadge = styled.div<{ $status: string }>`
  padding: 6px 16px;
  border-radius: 8px;
  display: inline-block;
  width: fit-content;
  background: ${({ $status }) => {
    switch ($status) {
      case 'confirmed':
      case 'in_process':
        return COLORS.brandOrangeMid;
      case 'pending':
        return COLORS.secondary;
      case 'cancelled':
        return COLORS.accentRed;
      case 'completed':
      case 'approved':
      case 'finished':
        return '#4CAF50';
      default:
        return COLORS.secondary;
    }
  }};
`;

export const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Guest Information Section
export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const OrangeDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${COLORS.brandOrangeMid};
`;

export const GuestInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// Date/Time Grid
export const DateTimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const DateTimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// Apartment Information
export const ApartmentInfo = styled.div`
  margin-bottom: 24px;
`;

export const ApartmentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 20px;
    height: 20px;
    color: ${COLORS.secondarySemiLight};
  }
`;

// Services List (for Beauty)
export const ServicesList = styled.div`
  margin-bottom: 24px;
`;

export const ServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

// Employee Section
export const EmployeeSection = styled.div`
  margin-bottom: 24px;
`;

export const EmployeeCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
`;

export const EmployeeImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${COLORS.secondaryLight};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const EmployeeInfo = styled.div`
  flex: 1;
`;

// Price Section
export const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

// Actions
export const ActionsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
  padding: 14px 32px;
  background: ${COLORS.brandGradient};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: ${COLORS.white};
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

export const SecondaryButton = styled.button<{ disabled?: boolean }>`
  padding: 14px 32px;
  background: transparent;
  border: 1px solid ${COLORS.borderColor};
  border-radius: 12px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 600;
  font-size: 14px;
  color: ${COLORS.white};
  transition: all 0.3s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background: ${({ disabled }) => (disabled ? 'transparent' : 'rgba(255, 255, 255, 0.05)')};
  }
`;

// Error Message
export const ErrorMessage = styled.div`
  padding: 12px;
  background: rgba(255, 92, 92, 0.1);
  border: 1px solid rgba(255, 92, 92, 0.3);
  border-radius: 8px;
  margin-bottom: 16px;
`;

// Review Section
export const ReviewSection = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
`;

export const StarButton = styled.button<{ $active?: boolean; $clickable?: boolean }>`
  background: none;
  border: none;
  padding: 2px;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: transform 0.15s ease;

  svg {
    fill: ${({ $active }) => ($active ? '#FE7F3B' : 'transparent')};
    stroke: ${({ $active }) => ($active ? '#FE7F3B' : 'rgba(255, 255, 255, 0.4)')};
  }

  ${({ $clickable }) =>
    $clickable &&
    `
    &:hover {
      transform: scale(1.1);
    }
  `}
`;

export const CommentSection = styled.div`
  margin-bottom: 20px;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  margin-top: 8px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #fe7f3b;
  }
`;

export const ExistingReview = styled.div`
  margin-top: 8px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

export const SubmitButton = styled.button`
  background: #fe7f3b;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e5722f;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Loading State
export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

// Error State
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 400px;
  text-align: center;
`;

