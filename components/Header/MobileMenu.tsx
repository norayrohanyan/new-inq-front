'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { useAppSelector } from '@/lib/hooks';
import { authSelectors } from '@/store';
import { ProfileIcon } from '@/components/icons';
import * as Styled from './styled';
import { isActivePath } from './utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const tAuth = useTranslations('auth');
  const locale = useLocale();
  const pathname = usePathname();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);

  return (
    <Styled.MobileMenuOverlay $isOpen={isOpen}>
      <Styled.MobileMenuContent>
        {isAuthenticated ? (
          <Link href={`/${locale}/profile`} onClick={onClose}>
            <Styled.ProfileButton>
              <ProfileIcon width="24" height="24" />
            </Styled.ProfileButton>
          </Link>
        ) : (
          <Styled.MobileAuthButtons>
            <Link href={`/${locale}/login`} onClick={onClose} style={{ flex: 1 }}>
              <Styled.MobileLoginButton>
                {tCommon('login')}
              </Styled.MobileLoginButton>
            </Link>
            <Link href={`/${locale}/register`} onClick={onClose} style={{ flex: 1 }}>
              <Button variant="primary" size="medium" rounded style={{ width: '100%', justifyContent: 'center' }}>
                {tAuth('signUp')}
              </Button>
            </Link>
          </Styled.MobileAuthButtons>
        )}

        <Styled.MobileNavLinks>
          <Styled.MobileNavLink 
            href={`/${locale}`} 
            $isActive={isActivePath(pathname, locale, `/${locale}`)}
            onClick={onClose}
          >
            {t('home').toUpperCase()}
          </Styled.MobileNavLink>
          <Styled.MobileNavLink 
            href={`/${locale}/categories`} 
            $isActive={isActivePath(pathname, locale, `/${locale}/categories`)}
            onClick={onClose}
          >
            {t('booking').toUpperCase()}
          </Styled.MobileNavLink>
          <Styled.MobileNavLink 
            href={`/${locale}/button-demo`} 
            $isActive={isActivePath(pathname, locale, `/${locale}/button-demo`)}
            onClick={onClose}
          >
            {t('nearMe').toUpperCase()}
          </Styled.MobileNavLink>
          <Styled.MobileNavLink 
            href={`/${locale}/about`} 
            $isActive={isActivePath(pathname, locale, `/${locale}/about`)}
            onClick={onClose}
          >
            {t('aboutUs').toUpperCase()}
          </Styled.MobileNavLink>
        </Styled.MobileNavLinks>
      </Styled.MobileMenuContent>
    </Styled.MobileMenuOverlay>
  );
}
