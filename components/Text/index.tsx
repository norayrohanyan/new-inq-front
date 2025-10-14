'use client';

import * as Styled from './styled';
import { TProps } from './types';
import { memo, Ref } from 'react';

const Text: React.FC<TProps> = ({
  children,
  type = 'p',
  customColor,
  color,
  className,
  letterSpacing,
  lineHeight,
  elementRef,
  align,
  dangerouslySetInnerHTML,
  fontWeight,
  isNumeric,
  ellipsis,
  ...rest
}) => {
  return (
    <Styled.Text
      ref={elementRef as Ref<HTMLParagraphElement>}
      className={className}
      $customColor={customColor}
      $color={color}
      $letterSpacing={letterSpacing}
      $lineHeight={lineHeight}
      $align={align}
      $fontWeight={fontWeight}
      $ellipsis={ellipsis}
      $isNumeric={isNumeric}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      $type={type}
      {...rest}
    >
      {dangerouslySetInnerHTML ? null : children}
    </Styled.Text>
  );
};

export default memo(Text);

