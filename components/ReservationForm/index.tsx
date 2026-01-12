import React, { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createApartmentBookingThunk, createCarBookingThunk, authSelectors } from '@/store';
import { useGlobalError } from '@/hooks/useGlobalError';
import { COLORS } from '@/consts/colors';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Calendar from '@/components/Calendar';
import * as Styled from './styled';

export type ReservationType = 'apartment' | 'car' | 'service';

interface IReservationFormProps {
  type: ReservationType;
  itemId: number;
  price: number;
  currency?: string;
  companyName?: string;
  companyPhone?: string;
  intervals?: Record<string, {
    date: string;
    total_price: number;
    price: number;
    available: boolean;
    discounted: boolean;
  }>;
  onSuccess?: () => void;
  onMonthChange?: (startDate: string) => void;
  isLoadingIntervals?: boolean;
}

const ReservationForm: React.FC<IReservationFormProps> = ({
  type,
  itemId,
  price,
  currency = 'AMD',
  companyName,
  companyPhone,
  intervals = {},
  onSuccess,
  onMonthChange,
  isLoadingIntervals = false,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showError, showSuccess } = useGlobalError();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);

  // Form state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [comment, setComment] = useState('');
  const [bookingForSomeoneElse, setBookingForSomeoneElse] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ guestPhone?: string; guestName?: string }>({});
  
  // Calendar state
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const checkInRef = useRef<HTMLDivElement>(null);
  const checkOutRef = useRef<HTMLDivElement>(null);

  // Close calendars when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (checkInRef.current && !checkInRef.current.contains(event.target as Node)) {
        setShowCheckInCalendar(false);
      }
      if (checkOutRef.current && !checkOutRef.current.contains(event.target as Node)) {
        setShowCheckOutCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateForm = () => {
    const newErrors: { guestPhone?: string; guestName?: string } = {};

    if (bookingForSomeoneElse) {
      if (!guestName.trim()) {
        newErrors.guestName = t('company.errors.guestNameRequired');
      }
      
      if (!guestPhone.trim()) {
        newErrors.guestPhone = t('company.errors.guestPhoneRequired');
      } else if (!/^\d{8}$/.test(guestPhone.trim())) {
        newErrors.guestPhone = t('company.errors.guestPhoneInvalid');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check authentication first
    if (!isAuthenticated) {
      // Save current URL as returnUrl so user is redirected back after login
      const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/${locale}/login?returnUrl=${currentUrl}`);
      return;
    }
    
    // Clear previous errors
    setErrors({});
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (type === 'apartment') {
        await dispatch(
          createApartmentBookingThunk({
            id: itemId,
            check_in: checkIn.split('T')[0], // Format: Y-m-d
            check_out: checkOut.split('T')[0], // Format: Y-m-d
            guests_count: guestsCount,
            comment,
            guest: {
              phone: bookingForSomeoneElse ? guestPhone : '00000000', //TODO: make backend to accept empty string
              name: bookingForSomeoneElse ? guestName : '#####', //TODO: make backend to accept empty string
            },
          })
        ).unwrap();
      } else if (type === 'car') {
        await dispatch(
          createCarBookingThunk({
            id: itemId,
            pickup_time: pickupTime.split('T')[0], // Format: Y-m-d
            return_time: returnTime.split('T')[0], // Format: Y-m-d
            comment,
            guest: {
              phone: bookingForSomeoneElse ? guestPhone : '00000000',
              name: bookingForSomeoneElse ? guestName : '#####' //TODO: make backend to accept empty string
            },
          })
        ).unwrap();
      }

      // Success - show success toast
      showSuccess(t('company.bookingSuccess'));
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      // Handle API errors - show error toast
      const errorMessage = error?.error || error?.message || t('company.errors.bookingFailed');
      showError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    if (type === 'apartment' && checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return days > 0 ? days * price : price;
    }
    if (type === 'car' && pickupTime && returnTime) {
      const start = new Date(pickupTime);
      const end = new Date(returnTime);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return days > 0 ? days * price : price;
    }
    return price;
  };

  const totalPrice = calculateTotal();
  const days =
    type === 'apartment' && checkIn && checkOut
      ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
      : type === 'car' && pickupTime && returnTime
      ? Math.ceil((new Date(returnTime).getTime() - new Date(pickupTime).getTime()) / (1000 * 60 * 60 * 24))
      : 1;

  return (
    <>
      {/* Host Info */}
      {companyName && (
        <Styled.HostSection>
          <Styled.HostAvatar>
            <Text type="h6" color="white" fontWeight="600">
              {companyName.charAt(0)}
            </Text>
          </Styled.HostAvatar>
          <div>
            <Text type="body" color="white" fontWeight="600">
              {companyName}
            </Text>
            {companyPhone && (
              <Text type="caption" color="secondarySemiLight">
                {companyPhone}
              </Text>
            )}
          </div>
        </Styled.HostSection>
      )}
    <Styled.FormContainer onSubmit={handleSubmit}>

      <Text type="h4" color="white" fontWeight="500">
        {t('company.reservation')}
      </Text>

      {type === 'apartment' && (
        <Styled.DateFieldsRow>
          <Styled.InputGroup ref={checkInRef}>
            <Styled.DateInputButton
              type="button"
              onClick={() => {
                setShowCheckInCalendar(!showCheckInCalendar);
                setShowCheckOutCalendar(false);
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text type="p" color="white" style={{ marginBottom: '0.5rem' }}>
                  {t('company.checkIn')}
                </Text>
                {checkIn && (
                  <Text type="body" color="white">
                    {new Date(checkIn).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </Text>
                )}
              </div>
            </Styled.DateInputButton>
            {showCheckInCalendar && (
              <Styled.CalendarPopover>
                <Calendar
                  selectedDate={checkIn ? checkIn.split('T')[0] : null}
                  onSelectDate={(date) => {
                    setCheckIn(`${date}T12:00`);
                    setShowCheckInCalendar(false);
                  }}
                  intervals={intervals}
                  currency={currency}
                  minDate={new Date()}
                  onMonthChange={onMonthChange}
                  isLoading={isLoadingIntervals}
                />
              </Styled.CalendarPopover>
            )}
          </Styled.InputGroup>

          <Styled.InputGroup ref={checkOutRef}>
            <Styled.DateInputButton
              type="button"
              onClick={() => {
                setShowCheckOutCalendar(!showCheckOutCalendar);
                setShowCheckInCalendar(false);
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text type="p" color="white" style={{ marginBottom: '0.5rem' }}>
                  {t('company.checkOut')}
                </Text>
                {checkOut && (
                  <Text type="body" color="white">
                    {new Date(checkOut).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </Text>
                )}
              </div>
            </Styled.DateInputButton>
            {showCheckOutCalendar && (
              <Styled.CalendarPopover>
                <Calendar
                  selectedDate={checkOut ? checkOut.split('T')[0] : null}
                  onSelectDate={(date) => {
                    setCheckOut(`${date}T12:00`);
                    setShowCheckOutCalendar(false);
                  }}
                  intervals={intervals}
                  currency={currency}
                  minDate={checkIn ? new Date(checkIn) : new Date()}
                  onMonthChange={onMonthChange}
                  isLoading={isLoadingIntervals}
                />
              </Styled.CalendarPopover>
            )}
          </Styled.InputGroup>
        </Styled.DateFieldsRow>
      )}

      {type === 'car' && (
        <Styled.DateFieldsRow>
          <Styled.InputGroup ref={checkInRef}>
            <Styled.DateInputButton
              type="button"
              onClick={() => {
                setShowCheckInCalendar(!showCheckInCalendar);
                setShowCheckOutCalendar(false);
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text type="p" color="white" style={{ marginBottom: '0.5rem' }}>
                  {t('company.pickUp')}
                </Text>
                {pickupTime && (
                  <Text type="body" color="white">
                    {new Date(pickupTime).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </Text>
                )}
              </div>
            </Styled.DateInputButton>
            {showCheckInCalendar && (
              <Styled.CalendarPopover>
                <Calendar
                  selectedDate={pickupTime ? pickupTime.split('T')[0] : null}
                  onSelectDate={(date) => {
                    setPickupTime(`${date}T12:00`);
                    setShowCheckInCalendar(false);
                  }}
                  intervals={intervals}
                  currency={currency}
                  minDate={new Date()}
                  onMonthChange={onMonthChange}
                  isLoading={isLoadingIntervals}
                />
              </Styled.CalendarPopover>
            )}
          </Styled.InputGroup>

          <Styled.InputGroup ref={checkOutRef}>
            <Styled.DateInputButton
              type="button"
              onClick={() => {
                setShowCheckOutCalendar(!showCheckOutCalendar);
                setShowCheckInCalendar(false);
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text type="p" color="white" style={{ marginBottom: '0.5rem' }}>
                  {t('company.return')}
                </Text>
                {returnTime && (
                  <Text type="body" color="white">
                    {new Date(returnTime).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </Text>
                )}
              </div>
            </Styled.DateInputButton>
            {showCheckOutCalendar && (
              <Styled.CalendarPopover>
                <Calendar
                  selectedDate={returnTime ? returnTime.split('T')[0] : null}
                  onSelectDate={(date) => {
                    setReturnTime(`${date}T12:00`);
                    setShowCheckOutCalendar(false);
                  }}
                  intervals={intervals}
                  currency={currency}
                  minDate={pickupTime ? new Date(pickupTime) : new Date()}
                  onMonthChange={onMonthChange}
                  isLoading={isLoadingIntervals}
                />
              </Styled.CalendarPopover>
            )}
          </Styled.InputGroup>
        </Styled.DateFieldsRow>
      )}

      <Styled.InputGroup>
        <Text type="body" color="white">
          {t('company.comments')}
        </Text>
        <Styled.TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder=""
          rows={1}
        />
      </Styled.InputGroup>

      <Styled.CheckboxGroup>
        <Styled.Checkbox
          type="checkbox"
          checked={bookingForSomeoneElse}
          onChange={(e) => setBookingForSomeoneElse(e.target.checked)}
        />
        <Styled.CheckboxLabel>{t('company.bookingForSomeoneElse')}</Styled.CheckboxLabel>
      </Styled.CheckboxGroup>

      {bookingForSomeoneElse && (
        <>
          <Styled.InputGroup>
            <Text type="body" color="white">
              {t('company.guestName')}
            </Text>
            <Styled.TextArea
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                if (errors.guestName) {
                  setErrors((prev) => ({ ...prev, guestName: undefined }));
                }
              }}
              placeholder=""
              rows={1}
            />
            {errors.guestName && (
              <Text type="caption" customColor={COLORS.accentRed}>
                {errors.guestName}
              </Text>
            )}
          </Styled.InputGroup>

          <Styled.InputGroup>
            <Text type="body" color="white">
              {t('company.guestPhone')}
            </Text>
            <Styled.TextArea
              value={guestPhone}
              onChange={(e) => {
                setGuestPhone(e.target.value);
                if (errors.guestPhone) {
                  setErrors((prev) => ({ ...prev, guestPhone: undefined }));
                }
              }}
              placeholder="12345678"
              rows={1}
            />
            {errors.guestPhone && (
              <Text type="caption" customColor={COLORS.accentRed}>
                {errors.guestPhone}
              </Text>
            )}
          </Styled.InputGroup>
        </>
      )}

      <Styled.TotalSection>
        
          <Text type="h4" color="white" fontWeight="500">
            {t('company.total')}
          </Text>
       
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
            <Text type="h4" customColor={COLORS.white} fontWeight="400">
            {currency} {totalPrice.toLocaleString()}
            </Text>
            <Text type="h6" color="secondarySemiLight">
                for {days} {days === 1 ? 'day' : 'days'}
            </Text>
        </div>
      </Styled.TotalSection>

      <Button
        variant="primary"
        size="large"
        fullWidth
        type="submit"
        isLoading={isSubmitting}
        disabled={
          isSubmitting ||
          (type === 'apartment' && (!checkIn || !checkOut)) ||
          (type === 'car' && (!pickupTime || !returnTime))
        }
        rounded
      >
        {t('company.reserve')}
      </Button>
    </Styled.FormContainer>
    </>
  );
};

export default ReservationForm;

