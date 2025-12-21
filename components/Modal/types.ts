import { ReactNode, HTMLAttributes } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
}

export interface ModalDialogProps {
  isOpen: boolean;
  onClose?: () => void;
  icon?: ReactNode;
  title?: string;
  description?: string;
  buttons?: ReactNode;
  type?: 'info' | 'success' | 'error' | 'warning';
}


