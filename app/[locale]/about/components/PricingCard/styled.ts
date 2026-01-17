import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '@/consts/colors';

export const CardContainer = styled(motion.div)<{ $highlighted?: boolean }>`
  background: ${COLORS.darkBgSemi};
  border-radius: 22px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 2px solid transparent;
  min-width: 250px;
  flex: 1;

  ${({ $highlighted }) =>
    $highlighted &&
    css`
      border-color: ${COLORS.brandOrangeMid};
      box-shadow: 0px 8px 24px rgba(254, 127, 59, 0.2);
    `}

  @media (max-width: 768px) {
    padding: 24px;
    gap: 20px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const CardSubHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const FeatureItem = styled(motion.li)<{ $included: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${({ $included }) => ($included ? 1 : 0.5)};
`;

export const FeatureBullet = styled.span`
  color: ${COLORS.white};
  font-size: 20px;
  line-height: 1.2;
  flex-shrink: 0;
`;

export const PriceSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: end;
`;
