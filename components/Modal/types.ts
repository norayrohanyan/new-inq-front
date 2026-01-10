import { ReactNode } from 'react';
import { HTMLMotionProps } from 'framer-motion';

export interface ModalProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
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


