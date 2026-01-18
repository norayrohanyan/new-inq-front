'use client';

import * as Styled from './styled';

export type SpinnerSize = 'small' | 'medium' | 'large';

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const Spinner = ({ size = 'medium', className }: SpinnerProps) => {
  return <Styled.SpinnerElement $size={size} className={className} />;
};

export default Spinner;
