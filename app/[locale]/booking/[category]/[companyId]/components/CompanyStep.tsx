'use client';

import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { StarIcon } from '@/components/icons';
import * as Styled from '../styled';
import { useBookingContext } from './BookingContext';

export const CompanyStep = () => {
  const t = useTranslations();
  const {
    companiesByService,
    isLoadingCompanies,
    selectedCompanyId,
    handleCompanySelect,
  } = useBookingContext();

  return (
    <>
      <Text type="h2" color="white" fontWeight="700" align="center">
        {t('booking.chooseCompany')}
      </Text>
      <Text 
        type="body" 
        color="secondarySemiLight" 
        align="center" 
        style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}
      >
        {t('booking.companiesOfferingService')}
      </Text>
      
      {isLoadingCompanies ? (
        <Styled.LoadingContainer>
          <Text type="body" color="white">
            {t('common.loading')}
          </Text>
        </Styled.LoadingContainer>
      ) : companiesByService.length === 0 ? (
        <Styled.EmptyStateMessage>
          <Text type="body" color="secondarySemiLight">
            {t('categories.noCompanies')}
          </Text>
        </Styled.EmptyStateMessage>
      ) : (
        <Styled.CompanySelectionGrid>
          {companiesByService.map((company) => (
            <Styled.CompanySelectionCard
              key={company.id}
              $selected={selectedCompanyId === company.id}
              onClick={() => handleCompanySelect(company)}
            >
              <Styled.CompanyLogoWrapper>
                {(company.logo || company.image_url) ? (
                  <img src={company.logo || company.image_url} alt={company.name} />
                ) : (
                  <Styled.CompanyPlaceholder />
                )}
              </Styled.CompanyLogoWrapper>
              <Styled.CompanyInfoSection>
                <Text type="body" color="white" fontWeight="600">
                  {company.name}
                </Text>
                <Styled.CompanyRating>
                  <StarIcon width={14} height={14} />
                  <Text type="caption" color="white">
                    {typeof company.rating === 'number' 
                      ? company.rating.toFixed(1) 
                      : company.rating || '0.0'}
                  </Text>
                </Styled.CompanyRating>
                {company.is_individual && (
                  <Styled.IndividualTag>
                    <Text type="caption" color="white">
                      Individual
                    </Text>
                  </Styled.IndividualTag>
                )}
              </Styled.CompanyInfoSection>
            </Styled.CompanySelectionCard>
          ))}
        </Styled.CompanySelectionGrid>
      )}
    </>
  );
};

