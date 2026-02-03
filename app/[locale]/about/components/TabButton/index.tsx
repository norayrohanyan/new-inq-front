'use client';

import { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import * as Styled from './styled';

export interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  className?: string;
}

export default function TabButton({
  label,
  active = false,
  className,
  ...props
}: TabButtonProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: active ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
      style={{ display: 'inline-block' }}
    >
      <Styled.TabButton
        $active={active}
        className={className}
        {...props}
      >
        {label}
      </Styled.TabButton>
    </motion.div>
  );
}
