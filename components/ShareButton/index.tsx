import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ShareIcon } from '@/components/icons';
import * as Styled from './styled';

interface IShareButtonProps {
  size?: 'small' | 'medium' | 'large';
  url?: string; // Optional URL to share, defaults to current page URL
}

export const ShareButton: React.FC<IShareButtonProps> = ({
  size = 'small',
  url,
}) => {
  const t = useTranslations('common');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click

    // Get the URL to share (use provided URL or current page URL)
    const shareUrl = url || window.location.href;

    try {
      // Copy URL to clipboard
      await navigator.clipboard.writeText(shareUrl);

      // Show tooltip
      setShowTooltip(true);

      // Hide tooltip after 2 seconds
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
    }
  };

  return (
    <Styled.ShareButton onClick={handleShare} $size={size}>
      <ShareIcon width={12} height={12} />
      <Styled.Tooltip $visible={showTooltip}>{t('linkCopied')}</Styled.Tooltip>
    </Styled.ShareButton>
  );
};
