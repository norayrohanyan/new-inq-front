'use client';

import Spinner from '@/components/Spinner';
import * as Styled from './styled';

interface PageLoaderProps {
  opacity?: 'half' | 'full';
}

const PageLoader = ({ opacity = 'full' }: PageLoaderProps) => {
  return (
    <Styled.Overlay $opacity={opacity}>
      <Spinner size="large" />
    </Styled.Overlay>
  );
};

export default PageLoader;
