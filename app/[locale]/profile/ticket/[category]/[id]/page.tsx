'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import {
  userSelectors,
  userActions,
  getBookingThunk,
  cancelBookingThunk,
} from '@/store';
import { apiService } from '@/services/api';
import { ProfileTabProvider } from '@/contexts/ProfileTabContext';
import Text from '@/components/Text';
import Button from '@/components/Button';
import ModalDialog from '@/components/Modal/ModalDialog';
import { WarningIcon } from '@/components/icons';
import {
  ICarBookingDetail,
  IApartmentBookingDetail,
  IBeautyBookingDetail,
} from '@/types/user';
import { ProfileLayout } from '../../../components';
import * as Styled from './styled';

// Import refactored components
import {
  CarBookingDetail,
  ApartmentBookingDetail,
  ServiceBookingDetail,
  ReviewSection,
} from './components';

function TicketDetailContent() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  // Detect if coming from history tab
  const sourceTab = searchParams.get('tab') || 'tickets';
  const isFromHistory = sourceTab === 'history';

  const category = params.category as string;
  const bookingId = parseInt(params.id as string, 10);

  const currentBooking = useAppSelector(userSelectors.currentBooking);
  const isLoading = useAppSelector(userSelectors.currentBookingLoading);
  const error = useAppSelector(userSelectors.error);

  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Review state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Check if booking has existing review
  const hasExistingReview = currentBooking?.review != null;

  useEffect(() => {
    if (bookingId && category) {
      dispatch(getBookingThunk({ bookingId, category }));
    }

    return () => {
      dispatch(userActions.clearCurrentBooking());
    };
  }, [bookingId, category, dispatch]);

  const handleBackToTickets = () => {
    router.push(`/${locale}/profile?tab=${sourceTab}`);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) return;

    setIsSubmittingReview(true);
    try {
      await apiService.submitReview({
        booking_id: bookingId,
        category,
        rating,
        comment,
      });
      setReviewSubmitted(true);
      // Refresh booking to get updated review
      dispatch(getBookingThunk({ bookingId, category }));
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleCancelClick = () => {
    if (!currentBooking?.can_cancel) return;
    setShowCancelModal(true);
  };

  const handleCancelConfirm = async () => {
    setShowCancelModal(false);
    setIsCancelling(true);
    setCancelError(null);

    try {
      await dispatch(cancelBookingThunk({ bookingId, category })).unwrap();

      // Success - navigate back to tickets
      router.push(`/${locale}/profile?tab=tickets`);
    } catch (err) {
      setCancelError(typeof err === 'string' ? err : t('ticketDetail.cancelError'));
      setIsCancelling(false);
    }
  };

  const handleCancelModalClose = () => {
    setShowCancelModal(false);
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'in_process':
        return t('booking.status.inProcess');
      case 'pending':
        return t('booking.status.pending');
      case 'cancelled':
        return t('booking.status.cancelled');
      case 'completed':
      case 'approved':
      case 'finished':
        return t('booking.status.completed');
      default:
        return status;
    }
  };

  const renderBookingContent = () => {
    if (!currentBooking) return null;

    switch (category) {
      case 'car_rental':
        return (
          <CarBookingDetail
            booking={currentBooking as ICarBookingDetail}
            getStatusText={getStatusText}
          />
        );
      case 'apartment_rental':
        return (
          <ApartmentBookingDetail
            booking={currentBooking as IApartmentBookingDetail}
            getStatusText={getStatusText}
          />
        );
      case 'beauty_salon':
      case 'animal_care':
      case 'medical':
      case 'photo_studio':
      case 'car_wash':
      case 'car_maintenance':
      case 'game_zone':
      case 'coworking':
        return (
          <ServiceBookingDetail
            booking={currentBooking as IBeautyBookingDetail}
            getStatusText={getStatusText}
          />
        );
      default:
        return (
          <ServiceBookingDetail
            booking={currentBooking as IBeautyBookingDetail}
            getStatusText={getStatusText}
          />
        );
    }
  };

  // Determine if we should show the review section
  const shouldShowReview = isFromHistory && !reviewSubmitted;

  return (
    <ProfileLayout activeTab={sourceTab}>
      {isLoading ? (
        <Styled.LoadingContainer>
          <Text type="body" color="white">
            {t('common.loading')}
          </Text>
        </Styled.LoadingContainer>
      ) : error ? (
        <Styled.ErrorContainer>
          <Text type="h3" color="white">
            {t('common.error')}
          </Text>
          <Text type="body" customColor="rgba(255, 255, 255, 0.6)">
            {error}
          </Text>
          <Button variant="primary" onClick={handleBackToTickets}>
            {t('ticketDetail.backToTickets')}
          </Button>
        </Styled.ErrorContainer>
      ) : currentBooking ? (
        <Styled.TicketDetailCard>
          {renderBookingContent()}

          <Styled.PriceSection>
            <Text type="p" color="white" fontWeight="500">
              {t('ticketDetail.price')}:
            </Text>
            <Text type="h5" customColor="#999999" fontWeight="500">
              {currentBooking.currency} {currentBooking.total_price?.toLocaleString()}
            </Text>
            <Text type="caption" customColor="#999999">
              ({t('ticketDetail.taxesIncluded')})
            </Text>
          </Styled.PriceSection>

          {/* Review Section - only for history */}
          {shouldShowReview && (
            <ReviewSection
              existingReview={currentBooking.review}
              rating={rating}
              comment={comment}
              onRatingChange={setRating}
              onCommentChange={setComment}
              isReadOnly={hasExistingReview}
            />
          )}

          {cancelError && (
            <Styled.ErrorMessage>
              <Text type="caption" customColor="#FF5C5C">
                {cancelError}
              </Text>
            </Styled.ErrorMessage>
          )}

          <Styled.ActionsRow>
            <Styled.PrimaryButton onClick={handleBackToTickets}>
              {isFromHistory ? t('ticketDetail.backToHistory') : t('ticketDetail.backToTickets')}
            </Styled.PrimaryButton>
            {/* Show Submit button only for history bookings without review */}
            {isFromHistory && !hasExistingReview && !reviewSubmitted && (
              <Styled.SubmitButton
                onClick={handleSubmitReview}
                disabled={isSubmittingReview || rating === 0}
              >
                {isSubmittingReview ? t('common.loading') : t('ticketDetail.submit')}
              </Styled.SubmitButton>
            )}
            {/* Show Cancel button only for active tickets that can be cancelled */}
            {currentBooking.can_cancel && !isFromHistory && (
              <Styled.SecondaryButton onClick={handleCancelClick} disabled={isCancelling}>
                {isCancelling ? t('common.loading') : t('ticketDetail.cancel')}
              </Styled.SecondaryButton>
            )}
          </Styled.ActionsRow>
        </Styled.TicketDetailCard>
      ) : (
        <Styled.ErrorContainer>
          <Text type="h3" color="white">
            {t('ticketDetail.notFound')}
          </Text>
          <Button variant="primary" onClick={handleBackToTickets}>
            {t('ticketDetail.backToTickets')}
          </Button>
        </Styled.ErrorContainer>
      )}

      {/* Cancel Confirmation Modal */}
      <ModalDialog
        isOpen={showCancelModal}
        onClose={handleCancelModalClose}
        icon={<WarningIcon width={48} height={48} />}
        title={t('ticketDetail.cancelBooking')}
        description={t('ticketDetail.confirmCancel')}
        type="warning"
        buttons={
          <>
            <Button variant="secondary" onClick={handleCancelModalClose}>
              {t('common.no')}
            </Button>
            <Button variant="primary" onClick={handleCancelConfirm}>
              {t('common.yes')}
            </Button>
          </>
        }
      />
    </ProfileLayout>
  );
}

export default function TicketDetailPage() {
  return (
    <ProfileTabProvider>
      <TicketDetailContent />
    </ProfileTabProvider>
  );
}
