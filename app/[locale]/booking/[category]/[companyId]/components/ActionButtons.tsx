'use client';

import { useTranslations } from 'next-intl';
import Button from '@/components/Button';
import * as Styled from '../styled';
import { useBookingContext } from './BookingContext';

export const ActionButtons = () => {
  const t = useTranslations();
  const {
    currentStep,
    handleBack,
    handleContinue,
    canContinue,
    canGoBack,
    isSubmitting,
  } = useBookingContext();

  // Don't show for employee step (has its own buttons) or success step
  if (currentStep === 'employee' || currentStep === 'success') {
    return null;
  }

  return (
    <Styled.ActionsContainer>
      {canGoBack() && (
        <Button variant="secondary" onClick={handleBack}>
          {t('booking.back')}
        </Button>
      )}
      <Button 
        variant="primary" 
        onClick={handleContinue}
        disabled={!canContinue() || isSubmitting}
      >
        {isSubmitting 
          ? t('common.loading') 
          : currentStep === 'info' 
            ? t('booking.finish') 
            : t('booking.continue')}
      </Button>
    </Styled.ActionsContainer>
  );
};
