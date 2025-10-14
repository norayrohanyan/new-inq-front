'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { useAppSelector } from '@/lib/hooks';
import { authSelectors } from '@/store';
import { ProfileIcon } from '@/components/icons';
import * as Styled from './styled';

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'hy', label: 'HY', flag: '🇦🇲' },
];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = segments.slice(1).join('/');
    const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
    router.push(newPath);
  };

  const currentLanguage = LANGUAGES.find((lang) => lang.code === locale);

  return (
    <Styled.HeaderContainer>
      <Styled.Nav>
        <Styled.Logo>
          <Link href={`/${locale}`}>
            <Styled.LogoText>
              in<Styled.LogoAccent>Q</Styled.LogoAccent>
            </Styled.LogoText>
          </Link>
        </Styled.Logo>

        <Styled.NavLinks>
          <Styled.NavLink href={`/${locale}`}>HOME</Styled.NavLink>
          <Styled.NavLink href={`/${locale}/categories`}>BOOKINGS</Styled.NavLink>
          <Styled.NavLink href={`/${locale}/button-demo`}>BUTTONS</Styled.NavLink>
        </Styled.NavLinks>

        <Styled.RightSection>
          <Styled.LanguageSelector>
            <Styled.FlagButton
              onClick={() => {
                const currentIndex = LANGUAGES.findIndex((lang) => lang.code === locale);
                const nextIndex = (currentIndex + 1) % LANGUAGES.length;
                handleLanguageChange(LANGUAGES[nextIndex].code);
              }}
            >
              {currentLanguage?.flag || '🇬🇧'}
            </Styled.FlagButton>
          </Styled.LanguageSelector>

          {isAuthenticated ? (
            <Link href={`/${locale}/profile`}>
              <Styled.ProfileButton>
                <ProfileIcon width="24" height="24" />
              </Styled.ProfileButton>
            </Link>
          ) : (
            <>
              <Link href={`/${locale}/login`}>
                <Button variant="secondary" size="small">
                  {t('common.login')}
                </Button>
              </Link>
              <Link href={`/${locale}/register`}>
                <Button variant="primary" size="small">
                  {t('auth.signUp')}
                </Button>
              </Link>
            </>
          )}
        </Styled.RightSection>
      </Styled.Nav>
    </Styled.HeaderContainer>
  );
}
