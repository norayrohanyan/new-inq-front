import React from 'react';
import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { StarIcon } from '@/components/icons';
import * as Styled from './styled';

interface IEmployeeCardProps {
  id: number;
  name: string;
  profession: string;
  rating: string;
  imageUrl?: string;
  onBook?: (employeeId: number) => void;
}

const EmployeeCard: React.FC<IEmployeeCardProps> = ({
  id,
  name,
  profession,
  rating,
  imageUrl,
  onBook,
}) => {
  const t = useTranslations();

  const handleBookClick = () => {
    if (onBook) {
      onBook(id);
    }
  };

  return (
    <Styled.CardContainer>
      <Styled.ImageWrapper>
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <Styled.NoImage>
            <Text type="caption" color="secondarySemiLight">
              No Image
            </Text>
          </Styled.NoImage>
        )}
      </Styled.ImageWrapper>

      <Styled.InfoWrapper>
        <Styled.NameProfessionWrapper>
          <Text type="h6" color="white" fontWeight="600">
            {name}
          </Text>
          <Text type="caption" color="secondarySemiLight">
            {profession}
          </Text>
        </Styled.NameProfessionWrapper>

        <Styled.CardFooter>
          <Styled.RatingWrapper>
            <StarIcon width={16} height={16} />
            <Text type="body" color="white">
              {rating}
            </Text>
          </Styled.RatingWrapper>
          <Button variant="primary" size="small" rounded onClick={handleBookClick}>
            {t('booking.book')}
          </Button>
        </Styled.CardFooter>
      </Styled.InfoWrapper>
    </Styled.CardContainer>
  );
};

export default EmployeeCard;

