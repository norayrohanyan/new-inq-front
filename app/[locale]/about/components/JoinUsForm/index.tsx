'use client';

import { useState, useEffect, forwardRef, useRef } from 'react';
import { useTranslations } from 'next-intl';
import CustomDropdown from '@/components/CustomDropdown';
import { CheckedIcon } from '@/components/icons/CheckedIcon';
import * as Styled from './styled';
import ReCAPTCHA from 'react-google-recaptcha';

interface FormData {
  name: string;
  phone: string;
  category: string;
  referral_code: string;
  tariff: string;
}

interface FieldErrors {
  name?: string;
  phone?: string;
  category?: string;
  general?: string;
  recaptcha?: string;
}

interface JoinUsFormProps {
  selectedTariff?: string;
}

const JoinUsForm = forwardRef<HTMLDivElement, JoinUsFormProps>(({ selectedTariff }, ref) => {
  const t = useTranslations();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    category: '',
    referral_code: '',
    tariff: '',
  });

  // Update tariff when selectedTariff prop changes
  useEffect(() => {
    if (selectedTariff) {
      setFormData((prev) => ({ ...prev, tariff: selectedTariff }));
    }
  }, [selectedTariff]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const recaptchaRef = useRef<any>(null);

  const categories = [
    { value: 'beauty_salon', label: t('joinUs.categories.beautySalon') },
    { value: 'apartment_rental', label: t('joinUs.categories.apartmentRental') },
    { value: 'car_rental', label: t('joinUs.categories.carRental') },
    { value: 'car_wash', label: t('joinUs.categories.carWash') },
    { value: 'animal_care', label: t('joinUs.categories.animalCare') },
    { value: 'medical', label: t('joinUs.categories.medical') },
    { value: 'photo_studio', label: t('joinUs.categories.photoStudio') },
    { value: 'game_zone', label: t('joinUs.categories.gameZone') },
    { value: 'car_maintenance', label: t('joinUs.categories.carMaintenance') },
    { value: 'coworking', label: t('joinUs.categories.coworking') },
  ];

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return t('joinUs.validation.companyNameRequired');
        if (value.length > 50) return t('joinUs.validation.companyNameTooLong');
        break;
      case 'phone':
        if (!value.trim()) return t('joinUs.validation.phoneRequired');
        if (!/^[1-9]\d{7}$/.test(value)) return t('joinUs.validation.phoneInvalid');
        break;
      case 'category':
        if (!value.trim()) return t('joinUs.validation.categoryRequired');
        break;
    }
    return undefined;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    if (name === 'name') {
      const limitedValue = value.slice(0, 50);
      setFormData((prev) => ({ ...prev, name: limitedValue }));
      return;
    }

    if (name === 'phone') {
      let digits = value.replace(/\D/g, '');
      digits = digits.replace(/^0+/, '');
      digits = digits.slice(0, 8);
      setFormData((prev) => ({ ...prev, phone: digits }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const newErrors: FieldErrors = {};

    const nameError = validateField('name', formData.name);
    if (nameError) newErrors.name = nameError;

    const phoneError = validateField('phone', formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const categoryError = validateField('category', formData.category);
    if (categoryError) newErrors.category = categoryError;

    const recaptchaToken = recaptchaRef.current ? recaptchaRef.current.getValue() : null;

    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !recaptchaToken) {
      newErrors.recaptcha = t('joinUs.validation.recaptchaRequired');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const submissionData = {
        name: formData.name,
        phone: formData.phone,
        client_type: formData.category || undefined,
        referral_code: formData.referral_code || undefined,
        tariff: formData.tariff || undefined,
      };

      const response = await fetch('/api/new_client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(recaptchaToken ? { 'X-CAPTCHA-T-TOKEN': recaptchaToken } : {}),
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(data.error || t('common.somethingWentWrong'));
        }

        if (response.status === 416) {
          throw new Error(data.error || t('common.somethingWentWrong'));
        }

        throw new Error(data.error || t('common.somethingWentWrong'));
      }

      // Success - show success message and reset form
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        category: '',
        referral_code: '',
        tariff: '',
      });

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }

      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: t('common.somethingWentWrong') });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPhoneValid = (digits: string) => {
    return /^[1-9]\d{7}$/.test(digits);
  };

  const isFormValid =
    formData.name.trim() &&
    formData.category &&
    formData.phone.trim() &&
    isPhoneValid(formData.phone);

  // Determine why button is disabled
  const getDisabledReason = (): string | null => {
    if (isSubmitting) return t('joinUs.submittingForm');
    if (!formData.name.trim()) return t('joinUs.validation.companyNameRequired');
    if (!formData.category) return t('joinUs.validation.pleaseSelectCategory');
    if (!formData.phone.trim()) return t('joinUs.validation.phoneRequired');
    if (!isPhoneValid(formData.phone)) return t('joinUs.validation.phoneInvalid');
    return null;
  };

  const disabledReason = getDisabledReason();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Styled.FormContainer ref={ref} id="join-us">
      <Styled.FormTitle>{t('joinUs.title')}</Styled.FormTitle>
      <Styled.FormDescription>
        {t('joinUs.description')}
      </Styled.FormDescription>

      <Styled.Form onSubmit={handleSubmit}>
        {/* Company Name */}    
          <Styled.Input
            type="text"
            id="name"
            name="name"
            required
            maxLength={50}
            placeholder={t('joinUs.companyName')}
            value={formData.name}
            onChange={handleInputChange}
            $hasError={!!errors.name}
          />
          {errors.name && <Styled.ErrorText>{errors.name}</Styled.ErrorText>}
        

        {/* Category */}
          <CustomDropdown
            options={categories}
            value={formData.category}
            onChange={(value) => {
              if (errors.category) {
                setErrors((prev) => ({
                  ...prev,
                  category: undefined,
                }));
              }
              setFormData((prev) => ({ ...prev, category: value }));
            }}
            placeholder={t('joinUs.selectCategory')}
            required
            error={!!errors.category}
          />
          {errors.category && <Styled.ErrorText>{errors.category}</Styled.ErrorText>}     

        {/* Phone */}    
          <Styled.PhoneInputWrapper $hasError={!!errors.phone}>
            <Styled.PhonePrefix>+374</Styled.PhonePrefix>
            <Styled.PhoneInput
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="XX XX XXX *"
              value={formData.phone}
              onChange={handleInputChange}
              inputMode="numeric"
              autoComplete="tel"
            />
          </Styled.PhoneInputWrapper>
          {errors.phone && <Styled.ErrorText>{errors.phone}</Styled.ErrorText>}
        

        {/* Tariff (Optional) */}
      
          <Styled.Input
            type="text"
            id="tariff"
            name="tariff"
            placeholder={t('joinUs.tariffOptional')}
            value={formData.tariff}
            onChange={handleInputChange}
          />
        

        {/* Referral Code (Optional) */}
      
          <Styled.Input
            type="text"
            id="referral_code"
            name="referral_code"
            placeholder={t('joinUs.referralCodeOptional')}
            value={formData.referral_code}
            onChange={handleInputChange}
          />
        

        {/* General Error */}
        {errors.general && (
          <Styled.GeneralError>
            <Styled.ErrorText>{errors.general}</Styled.ErrorText>
          </Styled.GeneralError>
        )}

        {/* Success Message */}
        {isSuccess && (
          <Styled.SuccessMessage>
            <Styled.SuccessIconWrapper>
              <CheckedIcon width="64" height="64" />
            </Styled.SuccessIconWrapper>
            <Styled.SuccessTitle>{t('joinUs.thankYou')}</Styled.SuccessTitle>
            <Styled.SuccessText>
              {t('joinUs.successMessage')}
            </Styled.SuccessText>
          </Styled.SuccessMessage>
        )}

        {/* Submit Button */}
        <Styled.ButtonWrapper>
          <Styled.ButtonTooltipWrapper
            onMouseEnter={() => !isFormValid && !isSubmitting && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Styled.SubmitButton
              type="submit"
              disabled={!isFormValid || isSubmitting}
              $isDisabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? t('common.submitting') : t('common.submit')}
            </Styled.SubmitButton>
            {showTooltip && disabledReason && (
              <Styled.Tooltip>
                {disabledReason}
              </Styled.Tooltip>
            )}
          </Styled.ButtonTooltipWrapper>
        </Styled.ButtonWrapper>

            {/* reCAPTCHA */}
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <Styled.RecaptchaWrapper>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                size="normal"
              />
              {errors.recaptcha && <Styled.ErrorText>{errors.recaptcha}</Styled.ErrorText>}
            </Styled.RecaptchaWrapper>
        )}

      </Styled.Form>
    </Styled.FormContainer>
  );
});

JoinUsForm.displayName = 'JoinUsForm';

export default JoinUsForm;
