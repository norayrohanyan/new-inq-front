'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import { useAppSelector } from '@/lib/hooks';
import { authSelectors } from '@/store';
import { ProfileIcon } from '@/components/icons';
import * as Styled from './styled';
import { Logo } from '../Logo';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '/en-flag.svg' },
  { code: 'ru', label: 'Русский', flag: '/ru-flag.svg' },
  { code: 'hy', label: 'Հայերեն', flag: '/am-flag.svg' },
];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = segments.slice(1).join('/');
    const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
    window.location.href = newPath;
  };

  const currentLanguage = LANGUAGES.find((lang) => lang.code === locale);

  return (
    <Styled.HeaderContainer>
      <Styled.Nav>
        <Logo width={90} height={48} />
        <Styled.NavLinks>
          <Styled.NavLink href={`/${locale}`}>HOME</Styled.NavLink>
          <Styled.NavLink href={`/${locale}/categories`}>BOOKING</Styled.NavLink>
          <Styled.NavLink href={`/${locale}/button-demo`}>NEAR ME</Styled.NavLink>
          <Styled.NavLink href={`/${locale}/about`}>ABOUT US</Styled.NavLink>
        </Styled.NavLinks>

        <Styled.RightSection>
          <Styled.LanguageSelector ref={dropdownRef}>
            <Styled.FlagButton
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
              <Image 
                src={currentLanguage?.flag || '/en-flag.svg'} 
                alt={currentLanguage?.label || 'EN'}
                width={32}
                height={32}
                style={{ borderRadius: '50%' }}
              />
            </Styled.FlagButton>
            
            {isLanguageDropdownOpen && (
              <Styled.LanguageDropdown>
                {LANGUAGES.filter((lang) => lang.code !== locale).map((lang) => (
                  <Styled.LanguageOption
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    <Image src={lang.flag} alt={lang.label} width={32} height={32} style={{ borderRadius: '50%' }}/>
                  </Styled.LanguageOption>
                ))}
              </Styled.LanguageDropdown>
            )}
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
                <Styled.LoginButton>
                  {t('common.login')}
                </Styled.LoginButton>
              </Link>
              <Link href={`/${locale}/register`}>
                <Button variant="primary" size="medium" rounded>
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
