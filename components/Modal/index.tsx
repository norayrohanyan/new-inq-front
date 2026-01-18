'use client';

import { memo, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import * as Styled from './styled';
import { ModalProps } from './types';
import { CONTAINER_ANIMATION_PROPS, CONTENT_ANIMATION_PROPS } from './consts';

const Modal = ({ 
  isOpen, 
  children, 
  onClose, 
  showCloseButton = false,
  ...rest 
}: ModalProps) => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && onClose && event.key === 'Escape') {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscKey]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Styled.ModalContainer {...CONTAINER_ANIMATION_PROPS} {...rest}>
          <Styled.BackdropOverlay onClick={onClose} />
          <Styled.ModalContent {...CONTENT_ANIMATION_PROPS}>
            {showCloseButton && onClose && (
              <Styled.CloseButton onClick={onClose} aria-label="Close">
                × {/* TODO: Add close icon */}
              </Styled.CloseButton>
            )}
            {children}
          </Styled.ModalContent>
        </Styled.ModalContainer>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default memo(Modal);



