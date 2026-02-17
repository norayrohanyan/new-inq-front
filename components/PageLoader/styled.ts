import styled from 'styled-components';

export const Overlay = styled.div<{ $opacity: 'half' | 'full' }>`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $opacity }) =>
    $opacity === 'full' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.5)'};
  z-index: 9999;
`;
