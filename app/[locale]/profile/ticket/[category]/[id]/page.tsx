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
  authActions,
} from '@/store';
import { apiService } from '@/services/api';
import { ProfileTabProvider } from '@/contexts/ProfileTabContext';
import Text from '@/components/Text';
import Button from '@/components/Button';
import ModalDialog from '@/components/Modal/ModalDialog';
import { LogoutIcon } from '@/components/icons';
import { StarIcon } from '@/components/icons';
import { WarningIcon } from '@/components/icons';
import {
  ICarBookingDetail,
  IApartmentBookingDetail,
  IBeautyBookingDetail,
} from '@/types/user';
import { getMenuItems } from '../../../consts';
import * as Styled from './styled';

// Star icon for rating
const RatingStar = ({ filled, onClick, clickable }: { filled: boolean; onClick?: () => void; clickable?: boolean }) => (
  <Styled.StarButton $active={filled} $clickable={clickable} onClick={onClick} type="button">
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  </Styled.StarButton>
);

// Icons for apartment details
const AreaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H8V8H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 4H20V8H16V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 16H8V20H4V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 16H20V20H16V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BedroomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21V13H21V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 16H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 13V10C6 9.46957 6.21071 8.96086 6.58579 8.58579C6.96086 8.21071 7.46957 8 8 8H16C16.5304 8 17.0391 8.21071 17.4142 8.58579C17.7893 8.96086 18 9.46957 18 10V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 8V4H18V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LevelIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21V15H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
  
  // Check if booking is completed (history)
  const isCompletedBooking = currentBooking?.status?.toLowerCase() === 'completed' || 
                            currentBooking?.status?.toLowerCase() === 'approved' ||
                            currentBooking?.status?.toLowerCase() === 'finished';
  const hasExistingReview = currentBooking?.review != null;

  useEffect(() => {
    if (bookingId && category) {
      dispatch(getBookingThunk({ bookingId, category }));
    }

    return () => {
      dispatch(userActions.clearCurrentBooking());
    };
  }, [bookingId, category, dispatch]);

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(authActions.logout());
      router.push(`/${locale}/login`);
    }
  };

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
      await dispatch(
        cancelBookingThunk({ bookingId, category })
      ).unwrap();
      
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

  const menuItems = getMenuItems(t);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
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

  const renderCarBooking = (booking: ICarBookingDetail) => (
    <>
      <Styled.CardHeader>
        <Styled.ImageContainer>
          {booking.car?.image_urls?.[0] ? (
            <Styled.Image src={booking.car.image_urls[0]} alt={booking.car.name} />
          ) : (
            <Styled.PlaceholderImage />
          )}
        </Styled.ImageContainer>
        <Styled.HeaderInfo>
          <Styled.TitleRow>
            <Text type="h3" color="white" fontWeight="600">
              {booking.car?.name || 'Car'}
            </Text>
          </Styled.TitleRow>
          <Styled.RatingBadge>
            <StarIcon width="16" height="16" />
            <Text type="body" color="white">
              {booking.car?.rating || 0}
            </Text>
          </Styled.RatingBadge>
          <Styled.StatusBadge $status={booking.status}>
            <Text type="caption" color="white" fontWeight="500">
              {getStatusText(booking.status)}
            </Text>
          </Styled.StatusBadge>
          <Styled.CompanyInfo>
            <Styled.InfoRow>
              <Text type="caption" color="secondarySemiLight">
                {t('ticketDetail.company')}:
              </Text>
              <Text type="caption" color="white">
                {booking.company?.name}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="caption" color="secondarySemiLight">
                {t('ticketDetail.address')}:
              </Text>
              <Text type="caption" color="white">
                {booking.company?.address}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="caption" color="secondarySemiLight">
                {t('ticketDetail.phoneNumber')}:
              </Text>
              <Text type="caption" customColor="#FE7F3B">
                {booking.company?.phones?.[0]}
              </Text>
            </Styled.InfoRow>
          </Styled.CompanyInfo>
        </Styled.HeaderInfo>
      </Styled.CardHeader>

      <Styled.Section>
        <Styled.SectionTitle>
          <Styled.OrangeDot />
          <Text type="body" color="white" fontWeight="500">
            {t('ticketDetail.guestInformation')}
          </Text>
        </Styled.SectionTitle>
        <Styled.GuestInfo>
          <Styled.InfoRow>
            <Text type="caption" color="secondarySemiLight">
              {t('ticketDetail.guestName')}:
            </Text>
            <Text type="caption" color="white">
              {booking.guest?.name}
            </Text>
          </Styled.InfoRow>
          <Styled.InfoRow>
            <Text type="caption" color="secondarySemiLight">
              {t('ticketDetail.phoneNumber')}:
            </Text>
            <Text type="caption" customColor="#FE7F3B">
              {booking.guest?.phone}
            </Text>
          </Styled.InfoRow>
        </Styled.GuestInfo>
      </Styled.Section>

      <Styled.DateTimeGrid>
        <Styled.DateTimeBlock>
          <Text type="h4" color="white" fontWeight="600">
            {t('ticketDetail.pickUp')}
          </Text>
          <Text type="body" customColor="#FE7F3B">
            {formatDate(booking.pickup_time)}
          </Text>
          <Text type="body" customColor="#FE7F3B">
            {formatTime(booking.pickup_time)}
          </Text>
          <Text type="caption" customColor="#FE7F3B">
            {formatDayOfWeek(booking.pickup_time)}
          </Text>
        </Styled.DateTimeBlock>
        <Styled.DateTimeBlock>
          <Text type="h4" color="white" fontWeight="600">
            {t('ticketDetail.return')}
          </Text>
          <Text type="body" customColor="#FE7F3B">
            {formatDate(booking.return_time)}
          </Text>
          <Text type="body" customColor="#FE7F3B">
            {formatTime(booking.return_time)}
          </Text>
          <Text type="caption" customColor="#FE7F3B">
            {formatDayOfWeek(booking.return_time)}
          </Text>
        </Styled.DateTimeBlock>
      </Styled.DateTimeGrid>
    </>
  );

  const renderApartmentBooking = (booking: IApartmentBookingDetail) => (
    <>
      <Styled.CardHeader>
        <Styled.ImageContainer>
          {booking.apartment?.image_urls?.[0] ? (
            <Styled.Image src={booking.apartment.image_urls[0]} alt={booking.apartment.name} />
          ) : (
            <Styled.PlaceholderImage />
          )}
        </Styled.ImageContainer>
        <Styled.HeaderInfo>
          <Styled.TitleRow>
            <Text type="h3" color="white" fontWeight="600">
              {booking.apartment?.is_apartment ? t('ticketDetail.apartment') : t('ticketDetail.house')}
            </Text>
          </Styled.TitleRow>
          <Styled.RatingBadge>
            <StarIcon width="16" height="16" />
            <Text type="body" color="white">
              {booking.apartment?.rating || 0}
            </Text>
          </Styled.RatingBadge>
          <Styled.StatusBadge $status={booking.status}>
            <Text type="caption" color="white" fontWeight="500">
              {getStatusText(booking.status)}
            </Text>
          </Styled.StatusBadge>
          <Styled.CompanyInfo>
            <Styled.InfoRow>
              <Text type="caption" color="secondarySemiLight">
                {t('ticketDetail.company')}:
              </Text>
              <Text type="caption" color="white">
                {booking.company?.name}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="caption" color="secondarySemiLight">
                {t('ticketDetail.address')}:
              </Text>
              <Text type="caption" color="white">
                {booking.company?.address}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="caption" color="secondarySemiLight">
                {t('ticketDetail.phoneNumber')}:
              </Text>
              <Text type="caption" customColor="#FE7F3B">
                {booking.company?.phones?.[0]}
              </Text>
            </Styled.InfoRow>
          </Styled.CompanyInfo>
        </Styled.HeaderInfo>
      </Styled.CardHeader>

      <Styled.Section>
        <Styled.SectionTitle>
          <Styled.OrangeDot />
          <Text type="body" color="white" fontWeight="500">
            {t('ticketDetail.guestInformation')}
          </Text>
        </Styled.SectionTitle>
        <Styled.GuestInfo>
          <Styled.InfoRow>
            <Text type="caption" color="secondarySemiLight">
              {t('ticketDetail.guestName')}:
            </Text>
            <Text type="caption" color="white">
              {booking.guest?.name}
            </Text>
          </Styled.InfoRow>
          <Styled.InfoRow>
            <Text type="caption" color="secondarySemiLight">
              {t('ticketDetail.phoneNumber')}:
            </Text>
            <Text type="caption" customColor="#FE7F3B">
              {booking.guest?.phone}
            </Text>
          </Styled.InfoRow>
        </Styled.GuestInfo>
      </Styled.Section>

      <Styled.DateTimeGrid>
        <Styled.DateTimeBlock>
          <Text type="h4" color="white" fontWeight="600">
            {t('ticketDetail.checkIn')}
          </Text>
          <Text type="body" customColor="#FE7F3B">
            {formatDate(booking.check_in)}
          </Text>
          <Text type="body" customColor="#FE7F3B">
            {formatTime(booking.check_in)}
          </Text>
          <Text type="caption" customColor="#FE7F3B">
            {formatDayOfWeek(booking.check_in)}
          </Text>
        </Styled.DateTimeBlock>
        <Styled.DateTimeBlock>
          <Text type="h4" color="white" fontWeight="600">
            {t('ticketDetail.checkOut')}
          </Text>
          <Text type="body" customColor="#FE7F3B">
            {formatDate(booking.check_out)}
          </Text>
          <Text type="body" customColor="#FE7F3B">
            {formatTime(booking.check_out)}
          </Text>
          <Text type="caption" customColor="#FE7F3B">
            {formatDayOfWeek(booking.check_out)}
          </Text>
        </Styled.DateTimeBlock>
      </Styled.DateTimeGrid>

      <Styled.ApartmentInfo>
        <Text type="h4" color="white" fontWeight="600">
          {t('ticketDetail.apartmentInformation')}
        </Text>
        <Styled.InfoRow style={{ marginTop: '12px' }}>
          <Text type="caption" color="secondarySemiLight">
            {t('ticketDetail.apartmentAddress')}:
          </Text>
          <Text type="caption" color="white">
            {booking.apartment?.address}
          </Text>
        </Styled.InfoRow>
        <Styled.ApartmentDetails>
          <Styled.DetailItem>
            <AreaIcon />
            <Text type="body" color="white">
              {booking.apartment?.total_square} m²
            </Text>
          </Styled.DetailItem>
          <Styled.DetailItem>
            <BedroomIcon />
            <Text type="body" color="white">
              {booking.apartment?.room_count} {t('ticketDetail.bedrooms')}
            </Text>
          </Styled.DetailItem>
          <Styled.DetailItem>
            <LevelIcon />
            <Text type="body" color="white">
              {t('ticketDetail.level')} {booking.apartment?.level}
            </Text>
          </Styled.DetailItem>
        </Styled.ApartmentDetails>
      </Styled.ApartmentInfo>
    </>
  );

  const renderBeautyBooking = (booking: IBeautyBookingDetail) => (
    <>
      <Styled.CardHeader>
        <Styled.ImageContainer>
          {booking.company?.logo ? (
            <Styled.Image src={booking.company.logo} alt={booking.company.name} />
          ) : (
            <Styled.PlaceholderImage />
          )}
        </Styled.ImageContainer>
        <Styled.HeaderInfo>
          <Styled.TitleRow>
            <Text type="h3" color="white" fontWeight="600">
              {t('ticketDetail.beautySalon')}
            </Text>
          </Styled.TitleRow>
          <Styled.RatingBadge>
            <StarIcon width="16" height="16" />
            <Text type="body" color="white">
              {booking.company?.rating || 0}
            </Text>
          </Styled.RatingBadge>
          <Styled.StatusBadge $status={booking.status}>
            <Text type="caption" color="white" fontWeight="500">
              {getStatusText(booking.status)}
            </Text>
          </Styled.StatusBadge>
          <Styled.CompanyInfo>
            <Styled.InfoRow>
              <Text type="caption" color="secondarySemiLight">
                {t('ticketDetail.company')}:
              </Text>
              <Text type="caption" color="white">
                {booking.company?.name}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="caption" color="secondarySemiLight">
                {t('ticketDetail.address')}:
              </Text>
              <Text type="caption" color="white">
                {booking.company?.address}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="caption" color="secondarySemiLight">
                {t('ticketDetail.phoneNumber')}:
              </Text>
              <Text type="caption" customColor="#FE7F3B">
                {booking.company?.phones?.[0]}
              </Text>
            </Styled.InfoRow>
            <Styled.InfoRow>
              <Text type="caption" color="secondarySemiLight">
                {t('ticketDetail.date')}:
              </Text>
              <Text type="caption" color="white">
                {formatDate(booking.date)}
              </Text>
            </Styled.InfoRow>
          </Styled.CompanyInfo>
        </Styled.HeaderInfo>
      </Styled.CardHeader>

      <Styled.Section>
        <Styled.SectionTitle>
          <Styled.OrangeDot />
          <Text type="body" color="white" fontWeight="500">
            {t('ticketDetail.guestInformation')}
          </Text>
        </Styled.SectionTitle>
        <Styled.GuestInfo>
          <Styled.InfoRow>
            <Text type="caption" color="secondarySemiLight">
              {t('ticketDetail.guestName')}:
            </Text>
            <Text type="caption" color="white">
              {booking.guest?.name}
            </Text>
          </Styled.InfoRow>
          <Styled.InfoRow>
            <Text type="caption" color="secondarySemiLight">
              {t('ticketDetail.phoneNumber')}:
            </Text>
            <Text type="caption" customColor="#FE7F3B">
              {booking.guest?.phone}
            </Text>
          </Styled.InfoRow>
        </Styled.GuestInfo>
      </Styled.Section>

      <Styled.ServicesList>
        <Text type="h4" color="white" fontWeight="600">
          {t('ticketDetail.services')}
        </Text>
        {booking.services?.map((service) => (
          <Styled.ServiceItem key={service.id}>
            <Text type="body" color="white">
              {service.name}:
            </Text>
            <Text type="body" customColor="#FE7F3B">
              {booking.currency} {service.price?.toLocaleString()}
            </Text>
          </Styled.ServiceItem>
        ))}
      </Styled.ServicesList>

      {booking.employee && (
        <Styled.EmployeeSection>
          <Text type="h4" color="white" fontWeight="600">
            {t('ticketDetail.employee')}
          </Text>
          <Styled.EmployeeCard>
            <Styled.EmployeeImage>
              {booking.employee.image_url && (
                <img src={booking.employee.image_url} alt={booking.employee.name} />
              )}
            </Styled.EmployeeImage>
            <Styled.EmployeeInfo>
              <Text type="body" color="white" fontWeight="500">
                {booking.employee.name}
              </Text>
            </Styled.EmployeeInfo>
            <Styled.RatingBadge>
              <StarIcon width="16" height="16" />
              <Text type="body" color="white">
                {booking.employee.rating}
              </Text>
            </Styled.RatingBadge>
          </Styled.EmployeeCard>
        </Styled.EmployeeSection>
      )}
    </>
  );

  // Review section - ONLY visible for history tab
  const renderReviewSection = () => {
    // Only show review section when coming from history tab
    if (!currentBooking || !isFromHistory) return null;

    // For history bookings with existing review - show read-only view
    if (hasExistingReview && currentBooking.review) {
      return (
        <Styled.ReviewSection>
          <Text type="body" color="white" fontWeight="600">
            {t('ticketDetail.comment')}
          </Text>
          <Styled.StarRating>
            {[1, 2, 3, 4, 5].map((star) => (
              <RatingStar
                key={star}
                filled={star <= (currentBooking.review?.rating || 0)}
                clickable={false}
              />
            ))}
          </Styled.StarRating>
          <Styled.ExistingReview>
            <Text type="body" color="white">
              {currentBooking.review.comment}
            </Text>
          </Styled.ExistingReview>
        </Styled.ReviewSection>
      );
    }

    // For completed bookings without review - allow submitting review
    if (!hasExistingReview && !reviewSubmitted) {
      return (
        <Styled.ReviewSection>
          <Text type="body" color="white" fontWeight="600">
            {t('ticketDetail.rateYourExperience')}
          </Text>
          <Styled.StarRating>
            {[1, 2, 3, 4, 5].map((star) => (
              <RatingStar
                key={star}
                filled={star <= rating}
                onClick={() => setRating(star)}
                clickable={true}
              />
            ))}
          </Styled.StarRating>
          <Styled.CommentSection>
            <Text type="body" color="white" fontWeight="500">
              {t('ticketDetail.comments')}
            </Text>
            <Styled.CommentTextarea
              placeholder={t('ticketDetail.commentPlaceholder')}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Styled.CommentSection>
        </Styled.ReviewSection>
      );
    }

    return null;
  };

  const renderBookingContent = () => {
    if (!currentBooking) return null;

    switch (category) {
      case 'car_rental':
        return renderCarBooking(currentBooking as ICarBookingDetail);
      case 'apartment_rental':
        return renderApartmentBooking(currentBooking as IApartmentBookingDetail);
      case 'beauty_salon':
      case 'animal_care':
      case 'medical':
      case 'photo_studio':
      case 'car_wash':
      case 'car_maintenance':
        return renderBeautyBooking(currentBooking as IBeautyBookingDetail);
      default:
        return renderBeautyBooking(currentBooking as IBeautyBookingDetail);
    }
  };

  return (
    <Styled.PageContainer>
      <Styled.ContentWrapper>
        <Styled.Sidebar>
          <Styled.MenuList>
            {menuItems.map((item) => (
              <Styled.MenuItem
                key={item.id}
                $active={item.id === sourceTab}
                onClick={() => {
                  router.push(`/${locale}/profile?tab=${item.id}`);
                }}
              >
                <Styled.MenuIcon $active={item.id === sourceTab}>
                  {item.icon}
                </Styled.MenuIcon>
                <Text
                  type="body"
                  color="white"
                  fontWeight={item.id === sourceTab ? '600' : '400'}
                >
                  {item.label}
                </Text>
              </Styled.MenuItem>
            ))}
          </Styled.MenuList>

          <Styled.LogoutButton onClick={handleLogout}>
            <Styled.MenuIcon $active={false}>
              <LogoutIcon width="20" height="20" />
            </Styled.MenuIcon>
            <Text type="body" color="white" fontWeight="500">
              {t('profile.logout')}
            </Text>
          </Styled.LogoutButton>
        </Styled.Sidebar>

        <Styled.MainContent>
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
                <Text type="body" color="white" fontWeight="600">
                  {t('ticketDetail.price')}:
                </Text>
                <Text type="h3" customColor="#FE7F3B" fontWeight="700">
                  {currentBooking.currency} {currentBooking.total_price?.toLocaleString()}
                </Text>
                <Text type="caption" customColor="rgba(255, 255, 255, 0.6)">
                  ({t('ticketDetail.taxesIncluded')})
                </Text>
              </Styled.PriceSection>

              {/* Review Section */}
              {renderReviewSection()}

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
                  <Styled.SecondaryButton 
                    onClick={handleCancelClick}
                    disabled={isCancelling}
                  >
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
        </Styled.MainContent>
      </Styled.ContentWrapper>

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
    </Styled.PageContainer>
  );
}

export default function TicketDetailPage() {
  return (
    <ProfileTabProvider>
      <TicketDetailContent />
    </ProfileTabProvider>
  );
}

