import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { IGuest } from '@/types/user';
import * as Styled from '../styled';

interface IGuestInformationProps {
  guest?: IGuest;
}

export const GuestInformation = ({ guest }: IGuestInformationProps) => {
  const t = useTranslations();

  if (!guest) return null;

  return (
    <Styled.Section>
      <Styled.SectionTitle>
        <Styled.OrangeDot />
        <Text type="body" color="white" fontWeight="500">
          {t('ticketDetail.guestInformation')}
        </Text>
      </Styled.SectionTitle>
      <Styled.GuestInfo>
        <Styled.InfoRow>
          <Text type="p" color="white">
            {t('ticketDetail.guestName')}:
          </Text>
          <Text type="p" customColor="#999999">
            {guest.name}
          </Text>
        </Styled.InfoRow>
        <Styled.InfoRow>
          <Text type="p" color="white">
            {t('ticketDetail.phoneNumber')}:
          </Text>
          <Text type="p" customColor="#999999">
            {guest.phone}
          </Text>
        </Styled.InfoRow>
      </Styled.GuestInfo>
    </Styled.Section>
  );
};

