'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/Button';
import { useAppSelector } from '@/lib/hooks';
import { authSelectors } from '@/store';
import { ProfileIcon, CloseIcon } from '@/components/icons';
import { useEventListener } from '@/hooks/useEventListener';
import { useIsMobile } from '@/hooks/useIsMobile';
import * as Styled from './styled';
import { Logo } from '../Logo';
import { LANGUAGES } from './consts';
import { handleLanguageChange, isActivePath, getCurrentLanguage } from './utils';
import MobileMenu from './MobileMenu';
import { COLORS } from '@/consts/colors';

export default function Header() {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');
  const tAuth = useTranslations('auth');
  const locale = useLocale();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isAuthenticated = useAppSelector(authSelectors.isAuthenticated);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
  }, []);

  useEventListener<MouseEvent>(
    'mousedown',
    handleClickOutside,
    isLanguageDropdownOpen ? document : null
  );

  const currentLanguage = getCurrentLanguage(locale);

  if (isMobile) {
    return (
      <>
        <Styled.HeaderContainer>
          <Styled.Nav>
            <Logo width={90} height={48} />
            <Styled.MobileRightSection>
              {/* Language Selector */}
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
                        onClick={() => handleLanguageChange(pathname, lang.code)}
                      >
                        <Image src={lang.flag} alt={lang.label} width={32} height={32} style={{ borderRadius: '50%' }}/>
                      </Styled.LanguageOption>
                    ))}
                  </Styled.LanguageDropdown>
                )}
              </Styled.LanguageSelector>

              {/* Theme Switcher placeholder - will be added in future */}
              {/* <ThemeSwitcher /> */}

              {/* Hamburger / Close Button */}
              {isMobileMenuOpen ? (
                <Styled.CloseButton onClick={() => setIsMobileMenuOpen(false)}>
                  <CloseIcon color={COLORS.brandOrangeMid} width="28" height="28" />
                </Styled.CloseButton>
              ) : (
                <Styled.HamburgerButton onClick={() => setIsMobileMenuOpen(true)}>
                  <Styled.HamburgerLine />
                  <Styled.HamburgerLine />
                  <Styled.HamburgerLine />
                </Styled.HamburgerButton>
              )}
            </Styled.MobileRightSection>
          </Styled.Nav>
        </Styled.HeaderContainer>
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      </>
    );
  }

  return (
    <Styled.HeaderContainer>
      <Styled.Nav>
        <Logo width={90} height={48} />
        <Styled.NavLinks>
          <Styled.NavLink href={`/${locale}`} $isActive={isActivePath(pathname, locale, `/${locale}`)}>{t('home').toUpperCase()}</Styled.NavLink>
          <Styled.NavLink href={`/${locale}/categories`} $isActive={isActivePath(pathname, locale, `/${locale}/categories`)}>{t('booking').toUpperCase()}</Styled.NavLink>
          <Styled.NavLink href={`/${locale}/near-me`} $isActive={isActivePath(pathname, locale, `/${locale}/button-demo`)}>{t('nearMe').toUpperCase()}</Styled.NavLink>
          <Styled.NavLink href={`/${locale}/about`} $isActive={isActivePath(pathname, locale, `/${locale}/about`)}>{t('aboutUs').toUpperCase()}</Styled.NavLink>
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
                    onClick={() => handleLanguageChange(pathname, lang.code)}
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
                  {tCommon('login')}
                </Styled.LoginButton>
              </Link>
              <Link href={`/${locale}/register`}>
                <Button variant="primary" size="medium" rounded>
                  {tAuth('signUp')}
                </Button>
              </Link>
            </>
          )}
        </Styled.RightSection>
      </Styled.Nav>
    </Styled.HeaderContainer>
  );
}
