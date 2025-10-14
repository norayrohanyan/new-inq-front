import styled from 'styled-components';
import { COLORS } from '@/consts/colors';

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${COLORS.darkBg};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  backdrop-filter: blur(10px);
`;

// Title and SectionTitle are now replaced by Text component

export const Section = styled.section`
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  > * {
    margin-bottom: 1.5rem;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const InteractiveDemo = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
`;

