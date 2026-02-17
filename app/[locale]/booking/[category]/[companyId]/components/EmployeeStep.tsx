'use client';

import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import Button from '@/components/Button';
import * as Styled from '../styled';
import { useBookingContext } from './BookingContext';

export const EmployeeStep = () => {
  const t = useTranslations();
  const {
    availableEmployees,
    selectedEmployee,
    handleEmployeeSelect,
    preSelectedEmployeeId,
    additionalServices,
    selectedServices,
    handleServiceToggle,
    totalPrice,
    handleBack,
    handleContinue,
    canContinue,
    canGoBack,
    companyDetails,
  } = useBookingContext();

  const isIndividual = companyDetails?.is_individual;

  return (
    <>
      {/* Show pre-selected employee banner if exists */}
      {!isIndividual && preSelectedEmployeeId && selectedEmployee && (
        <Styled.PreSelectedBanner>
          <Styled.PreSelectedEmployee>
            <Styled.EmployeeAvatar
              src={selectedEmployee.imageUrl || '/images/default-avatar.png'}
              alt={selectedEmployee.name}
            />
            <div>
              <Text type="body" color="secondarySemiLight" fontWeight="400">
                {t('booking.selectedEmployee')}
              </Text>
              <Text type="h4" color="white" fontWeight="600">
                {selectedEmployee.name}
              </Text>
            </div>
          </Styled.PreSelectedEmployee>
        </Styled.PreSelectedBanner>
      )}

      <Styled.EmployeeGrid>
        {!isIndividual && (
        <div>
          <Text type="h3" color="white" fontWeight="700" style={{ marginBottom: '1.5rem' }}>
            {preSelectedEmployeeId ? t('booking.chooseAnotherEmployee') : t('booking.chooseEmployee')}
          </Text>
          <Styled.EmployeeList>
            {availableEmployees && availableEmployees.map((employee: any) => (
              <Styled.EmployeeItem
                key={employee.id}
                $selected={selectedEmployee?.id === employee.id}
                onClick={() => handleEmployeeSelect(employee)}
              >
                <Styled.Checkbox $checked={selectedEmployee?.id === employee.id} />
                <Styled.EmployeeAvatar
                  src={employee.imageUrl || employee.avatar || '/images/default-avatar.png'}
                  alt={employee.name}
                />
                <Text type="body" color="white" fontWeight="400">
                  {employee.name}
                </Text>
              </Styled.EmployeeItem>
            ))}
          </Styled.EmployeeList>
        </div>
        )}

        {additionalServices && additionalServices.length > 0 && (
          <div>
            <Text type="h3" color="white" fontWeight="700" style={{ marginBottom: '1.5rem' }}>
              {t('booking.additionalServices')}
            </Text>
            <Styled.AdditionalServicesList>
              {additionalServices.map((service: any) => (
                <Styled.AdditionalServiceItem
                  key={`${service.id}-${service.employee_id || ''}`}
                  $selected={selectedServices.some(s => s.id === service.id)}
                  onClick={() => handleServiceToggle(service)}
                >
                  <Styled.ServiceCheckbox $checked={selectedServices.some(s => s.id === service.id)} />
                  <Styled.ServiceInfo>
                    <Text type="body" color="white" fontWeight="400">
                      {service.name}
                    </Text>
                    <Text type="caption" color="secondarySemiLight" fontWeight="400">
                      ֏ {service.price?.toLocaleString()} • {service.duration} {t('booking.minutes')}
                    </Text>
                  </Styled.ServiceInfo>
                </Styled.AdditionalServiceItem>
              ))}
            </Styled.AdditionalServicesList>
          </div>
        )}
      </Styled.EmployeeGrid>

      {/* Booking Summary at Bottom */}
      <Styled.BookingSummarySection>
        <Styled.SummaryContent>
          {selectedServices.map((service) => (
            <Styled.SummaryRow key={service.id}>
              <Text type="body" color="white" fontWeight="400">
                {service.name}:
              </Text>
              <Text type="body" color="brandOrangeMid" fontWeight="600">
                ֏ {service.price.toLocaleString()}
              </Text>
            </Styled.SummaryRow>
          ))}
          <Styled.SummaryTotalRow>
            <Text type="h4" color="white" fontWeight="700">
              {t('booking.total')}
            </Text>
            <Text type="h4" color="brandOrangeMid" fontWeight="700">
              ֏ {totalPrice.toLocaleString()}
            </Text>
          </Styled.SummaryTotalRow>
        </Styled.SummaryContent>
        
        <Styled.SummaryActions>
          {canGoBack() && (
            <Button variant="secondary" onClick={handleBack}>
              {t('booking.back')}
            </Button>
          )}
          <Button variant="primary" onClick={handleContinue} disabled={!canContinue()}>
            {t('booking.continue')}
          </Button>
        </Styled.SummaryActions>
      </Styled.BookingSummarySection>
    </>
  );
};

