import styled from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';
import Text from '@/components/Text';

export const ErrorPageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${COLORS.darkBg};
`;

export const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: center;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    gap: 24px;
  }
`;

export const ErrorCode = styled(Text)`
  font-size: 180px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -4px;
  background: linear-gradient(135deg, #F6572F 0%, #FE7F3B 50%, #FEB245 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    font-size: 120px;
  }
`;

export const ErrorTitle = styled(Text)`
  font-size: 76px;
  font-weight: 600;
  line-height: 145px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #999999;
  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    font-size: 32px;
  }
`;

export const ErrorDescription = styled(Text)`
  font-size: 33px;
  line-height: 61px;
  max-width: 1200px;
  color: #F7F7F7;
  @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
    font-size: 16px;
  }
`;

export const ErrorButtonWrapper = styled.div`
  margin-top: 16px;
  
  button {
    min-width: 200px;
  }
`;