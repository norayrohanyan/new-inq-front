'use client';

import { usePathname } from 'next/navigation';
import Button from '@/components/Button';
import * as Styled from './styled';

interface NotFoundPageProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function NotFoundPage({
  title = 'OPPS! PAGE NOT FOUND',
  description = "Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem",
  buttonText = 'Return',
}: NotFoundPageProps) {
  const pathname = usePathname();

  const getHomeUrl = () => {
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0] || 'en';
    return `/${locale}`;
  };

  return (
    <Styled.ErrorPageContainer>
      <Styled.ErrorContent>
        <Styled.ErrorCode type="h1" customColor="#FF8243">
          404
        </Styled.ErrorCode>

        <Styled.ErrorTitle type="h2" color="white">
          {title}
        </Styled.ErrorTitle>

        <Styled.ErrorDescription type="body" customColor="rgba(255, 255, 255, 0.7)">
          {description}
        </Styled.ErrorDescription>

        <Styled.ErrorButtonWrapper>
          <Button
            variant="primary"
            size="medium"
            rounded
            onClick={() => { window.location.href = getHomeUrl(); }}
          >
            {buttonText}
          </Button>
        </Styled.ErrorButtonWrapper>
      </Styled.ErrorContent>
    </Styled.ErrorPageContainer>
  );
}
