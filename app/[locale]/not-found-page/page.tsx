'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import Button from '@/components/Button';
import * as Styled from '../styled';

export default function NotFoundPage() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleReturn = () => {
    // Extract locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0] || 'en';
    router.push(`/${locale}`);
  };

  return (
    <Styled.ErrorPageContainer>
      <Styled.ErrorContent>
        <Styled.ErrorCode type="h1" customColor="#FF8243">
          404
        </Styled.ErrorCode>
        
        <Styled.ErrorTitle type="h2" color="white">
          {t('errors.pageNotFound.title')}
        </Styled.ErrorTitle>
        
        <Styled.ErrorDescription type="body">
          {t('errors.pageNotFound.description')}
        </Styled.ErrorDescription>
        
        <Styled.ErrorButtonWrapper>
          <Button
            variant="primary"
            size="medium"
            rounded
            onClick={handleReturn}
          >
            {t('errors.returnHome')}
          </Button>
        </Styled.ErrorButtonWrapper>
      </Styled.ErrorContent>
    </Styled.ErrorPageContainer>
  );
}


