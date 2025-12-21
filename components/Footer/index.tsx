'use client';

import { useTranslations } from 'next-intl';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { FacebookIcon } from '@/components/icons/facebook';
import { InstagramIcon } from '@/components/icons/instagram';
import { LinkedinIcon } from '@/components/icons/linkedin';
import { TelegramIcon } from '@/components/icons/telegram';
import { PhoneIcon } from '@/components/icons/phone';
import { MailIcon } from '@/components/icons/mail';
import * as Styled from './styled';
import { Logo } from '../Logo';

export default function Footer() {
  const t = useTranslations();

  const socialLinks = [
    { icon: <FacebookIcon width={18} height={18} />, href: '#', label: 'Facebook' },
    { icon: <InstagramIcon width={18} height={18} />, href: '#', label: 'Instagram' },
    { icon: <LinkedinIcon width={18} height={18} />, href: '#', label: 'LinkedIn' },
    { icon: <TelegramIcon width={18} height={18} />, href: '#', label: 'Telegram' },
  ];

  return (
    <Styled.FooterContainer>
      <Styled.PartnerSection>
        <Styled.PartnerContent>
          <Text type="h2" color="white" align="center">
            {t('footer.becomePartner.question')}{' '}
            <Styled.PartnerHighlight>{t('footer.becomePartner.highlight')}</Styled.PartnerHighlight>
          </Text>
          <Button variant="primary" size="medium" rounded>
            {t('footer.becomePartner.button')}
          </Button>
        </Styled.PartnerContent>
      </Styled.PartnerSection>

      <Styled.MainFooter>
        <Styled.FooterContent>
          <Styled.LeftSection>
            <Logo width={56} height={30} />
            <Styled.ContactSection>
                <Styled.ContactItem href="tel:+37412345678">
                <Styled.ContactIcon>
                    <PhoneIcon width={20} height={20} />
                </Styled.ContactIcon>
                <Text type="body" color="white">
                    +374 1234567
                </Text>
                </Styled.ContactItem>
                <Styled.ContactItem href="mailto:info@inqueue.com">
                <Styled.ContactIcon>
                    <MailIcon width={20} height={20} />
                </Styled.ContactIcon>
                <Text type="body" color="white">
                    info@inqueue.com
                </Text>
                </Styled.ContactItem>
            </Styled.ContactSection>
          </Styled.LeftSection>
          <Styled.RightSection>
            {socialLinks.map((social) => (
              <Styled.SocialLink
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </Styled.SocialLink>
            ))}
          </Styled.RightSection>
        </Styled.FooterContent>

        <div>
          <Text type="small" customColor="rgba(255, 255, 255, 0.5)" align="center">
            © 2024 InQ. {t('footer.copyright')}
          </Text>
        </div>
      </Styled.MainFooter>
    </Styled.FooterContainer>
  );
}

