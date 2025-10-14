'use client';

import { ButtonContainer, IconWrapper, ButtonText } from './styled';

interface ExampleButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  isMobileDrawerStyle?: boolean;
}

export default function ExampleButton({
  text,
  icon,
  onClick,
  disabled = false,
  variant = 'primary',
  isMobileDrawerStyle = false,
}: ExampleButtonProps) {
  return (
    <ButtonContainer
      onClick={onClick}
      $disabled={disabled}
      $variant={variant}
      $isMobileDrawerStyle={isMobileDrawerStyle}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <ButtonText>{text}</ButtonText>
    </ButtonContainer>
  );
}

