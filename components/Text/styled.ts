import { COLORS } from '@/consts/colors';
import styled, { css } from 'styled-components';
import { TTextType, ITextProps } from './types';
import { TEXT_STYLES } from './consts';

const ellipsisStyles = css`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
`;

const numericStyles = css`
  font-variant-numeric: tabular-nums;
`;

const getTextTypeStyles = (type: TTextType) => {
  return css`
    font-size: ${TEXT_STYLES[type].size};
    font-weight: ${TEXT_STYLES[type].weight};
  `;
};

export const Text = styled.p<ITextProps>`
  ${(props) => getTextTypeStyles(props.$type)}
  letter-spacing: ${(props) => props?.$letterSpacing};
  line-height: ${(props) => props?.$lineHeight};
  text-align: ${(props) => props?.$align};
  font-weight: ${(props) => props?.$fontWeight};
  color: ${(props) => {
    if (props.$customColor) return props.$customColor;
    if (props.$color) return COLORS[props.$color];
    return 'inherit';
  }};
  ${(props) => props?.$ellipsis && ellipsisStyles}
  ${(props) => props?.$isNumeric && numericStyles}
  margin: 0;
`;

