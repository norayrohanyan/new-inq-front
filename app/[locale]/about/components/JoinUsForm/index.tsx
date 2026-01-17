'use client';

import { useState, useEffect, forwardRef } from 'react';
import CustomDropdown from '@/components/CustomDropdown';
import { CheckedIcon } from '@/components/icons/CheckedIcon';
import * as Styled from './styled';

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
}

interface JoinUsFormProps {
  selectedTariff?: string;
}

const JoinUsForm = forwardRef<HTMLDivElement, JoinUsFormProps>(({ selectedTariff }, ref) => {
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

  const categories = [
    { value: 'beauty_salon', label: 'Beauty Salon' },
    { value: 'apartment_rental', label: 'Apartment Rental' },
    { value: 'car_rental', label: 'Car Rental' },
    { value: 'car_wash', label: 'Car Wash' },
    { value: 'animal_care', label: 'Animal Care' },
    { value: 'medical', label: 'Medical' },
    { value: 'photo_studio', label: 'Photo Studio' },
    { value: 'game_zone', label: 'Game Zone' },
    { value: 'car_maintenance', label: 'Car Maintenance' },
    { value: 'coworking', label: 'Coworking' },
  ];

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Company name is required';
        if (value.length > 50) return 'Company name is too long';
        break;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[1-9]\d{7}$/.test(value)) return 'Phone number must be 8 digits starting with 1-9';
        break;
      case 'category':
        if (!value.trim()) return 'Category is required';
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
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
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

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);

      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: 'Something went wrong. Please try again.' });
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
    if (isSubmitting) return 'Submitting form...';
    if (!formData.name.trim()) return 'Company name is required';
    if (!formData.category) return 'Please select a category';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!isPhoneValid(formData.phone)) return 'Phone number must be 8 digits starting with 1-9';
    return null;
  };

  const disabledReason = getDisabledReason();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Styled.FormContainer ref={ref} id="join-us">
      <Styled.FormTitle>Join us</Styled.FormTitle>
      <Styled.FormDescription>
        InQ – Your trusted partner for service booking and business management.
      </Styled.FormDescription>

      <Styled.Form onSubmit={handleSubmit}>
        {/* Company Name */}
        <Styled.InputGroup>
          <Styled.Input
            type="text"
            id="name"
            name="name"
            required
            maxLength={50}
            placeholder="Company name *"
            value={formData.name}
            onChange={handleInputChange}
            $hasError={!!errors.name}
          />
          {errors.name && <Styled.ErrorText>{errors.name}</Styled.ErrorText>}
        </Styled.InputGroup>

        {/* Category */}
        <Styled.InputGroup>
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
            placeholder="Select a category *"
            required
            error={!!errors.category}
          />
          {errors.category && <Styled.ErrorText>{errors.category}</Styled.ErrorText>}
        </Styled.InputGroup>

        {/* Phone */}
        <Styled.InputGroup>
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
        </Styled.InputGroup>

        {/* Tariff (Optional) */}
        <Styled.InputGroup>
          <Styled.Input
            type="text"
            id="tariff"
            name="tariff"
            placeholder="Tariff (optional)"
            value={formData.tariff}
            onChange={handleInputChange}
          />
        </Styled.InputGroup>

        {/* Referral Code (Optional) */}
        <Styled.InputGroup>
          <Styled.Input
            type="text"
            id="referral_code"
            name="referral_code"
            placeholder="Referral code (optional)"
            value={formData.referral_code}
            onChange={handleInputChange}
          />
        </Styled.InputGroup>

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
            <Styled.SuccessTitle>Thank you!</Styled.SuccessTitle>
            <Styled.SuccessText>
              Your request has been submitted successfully. We'll contact you soon.
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
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Styled.SubmitButton>
            {showTooltip && disabledReason && (
              <Styled.Tooltip>
                {disabledReason}
              </Styled.Tooltip>
            )}
          </Styled.ButtonTooltipWrapper>
        </Styled.ButtonWrapper>
      </Styled.Form>
    </Styled.FormContainer>
  );
});

JoinUsForm.displayName = 'JoinUsForm';

export default JoinUsForm;
