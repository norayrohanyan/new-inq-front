import { css, keyframes } from 'styled-components';
import { COLORS } from '@/consts/colors';
import { MOBILE_SIZE_BREAKPOINT } from '@/consts';
import { BOX_SHADOWS } from './consts';

export type TBoxShadowTypes =
  | 'previewAreaShadow'
  | 'shadow1'
  | 'shadow2'
  | 'mobileExpandShadow'
  | 'darkShadow'
  | 'headerShadow'
  | 'cardShadow';

/**
 * Common scrollbar styles shared between vertical and horizontal scrollbars
 */
const commonScrollbarStyles = css`
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${COLORS.secondaryLight};

    @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
      outline: none;
    }
  }
`;

/**
 * Customizes the vertical scrollbar appearance
 */
export const customizeVerticalScrollbarThumbMixin = (width: number = 3) => {
  return css`
    &::-webkit-scrollbar {
      width: ${width}px;

      @media (max-width: ${MOBILE_SIZE_BREAKPOINT}px) {
        width: 3px;
      }
    }
    ${commonScrollbarStyles}
  `;
};

/**
 * Customizes the horizontal scrollbar appearance
 */
export const customizeHorizontalScrollbarThumbMixin = (width: number = 3) => {
  return css`
    &::-webkit-scrollbar {
      height: ${width}px;
    }
    ${commonScrollbarStyles}
  `;
};

export const disableImageDraggableStyleMixin = () => css`
  user-drag: none;
  user-select: none;
`;

export const hideScrollbarMixin = () => {
  return css`
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  `;
};

export const flexCenterMixin = () => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
};

export const absoluteElementJustifyCenterMixin = () => {
  return css`
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: auto;
  `;
};

export const absoluteElementAlignCenterMixin = () => {
  return css`
    position: absolute;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
  `;
};

export const absoluteElementToCenterMixin = () => {
  return css`
    ${absoluteElementAlignCenterMixin()}
    ${absoluteElementJustifyCenterMixin()}
  `;
};

export const boxShadowStyles = (type: TBoxShadowTypes) => BOX_SHADOWS[type];

export const disableSomeContentStyles = (opacity = 0.4) => {
  return css`
    pointer-events: none;
    opacity: ${opacity} !important;
  `;
};

export const setCommonBorderStyles = (
  isError?: boolean,
  isFocusing?: boolean
) => {
  if (isError) {
    return css`
      border: 1px solid ${COLORS.accentRed};
    `;
  }

  if (isFocusing) {
    return css`
      border: 1px solid ${COLORS.primaryDark};
    `;
  }

  return css`
    border: 1px solid ${COLORS.borderColor};

    &:hover {
      border: 1px solid ${COLORS.secondarySemiLight};
      box-shadow: 0 0 0 1px #dfeaff;
    }

    &:focus {
      border: 1px solid ${COLORS.primaryDark};
    }
  `;
};
