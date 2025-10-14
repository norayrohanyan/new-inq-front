import { COLORS } from '@/consts/colors';
import { css } from 'styled-components';

export const BOX_SHADOWS = {
  previewAreaShadow: css`
    box-shadow: 0px 4px 16px rgba(56, 102, 255, 0.15);
  `,
  shadow1: css`
    box-shadow: 0px 0px 4px rgba(56, 102, 255, 0.25);
  `,
  shadow2: css`
    box-shadow: 0px 4px 10px rgba(56, 102, 255, 0.15);
  `,
  mobileExpandShadow: css`
    box-shadow: 0px -2px 10px rgba(56, 102, 255, 0.15);
  `,
  darkShadow: css`
    box-shadow: 0px 2px 3px rgba(54, 63, 90, 0.4);
  `,
  headerShadow: css`
    box-shadow: 0px 4px 7px 0px rgba(86, 144, 255, 0.11);
  `,
  cardShadow: css`
    box-shadow: 0px 2px 8px rgba(56, 102, 255, 0.1);
  `,
};

export const ChessGridBackground = css`
  background-image: repeating-conic-gradient(
    ${COLORS.primaryExtraLight} 0 25%,
    ${COLORS.borderColor} 0 50%
  );
  background-size: 23px 23px;
`;

