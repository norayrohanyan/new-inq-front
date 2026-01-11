'use client';

import { memo } from 'react';
import Modal from './index';
import * as Styled from './styled';
import { ModalDialogProps } from './types';

const ModalDialog = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
  buttons,
  type = 'info',
}: ModalDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Styled.DialogContainer>
        {icon && <Styled.IconWrapper>{icon}</Styled.IconWrapper>}
        {title && <Styled.DialogTitle>{title}</Styled.DialogTitle>}
        {description && (
          <Styled.DialogDescription>{description}</Styled.DialogDescription>
        )}
        {buttons && <Styled.ButtonGroup>{buttons}</Styled.ButtonGroup>}
      </Styled.DialogContainer>
    </Modal>
  );
};

export default memo(ModalDialog);



