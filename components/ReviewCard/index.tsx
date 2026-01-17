import React from 'react';
import Text from '@/components/Text';
import { StarIcon } from '@/components/icons';
import * as Styled from './styled';

// Export the ReviewsGrid for reuse
export { ReviewsGrid } from './styled';

interface IReviewCardProps {
  userName: string;
  rating: number;
  comment: string;
}

const ReviewCard: React.FC<IReviewCardProps> = ({ userName, rating, comment }) => {
  // Render stars based on rating (1-5)
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          width="20" 
          height="20" 
          filled={i <= rating} 
          outlined={i > rating}
        />
      );
    }
    return stars;
  };

  return (
    <Styled.ReviewCardContainer>
      <Text type="h4" color="white" fontWeight="500">
        {userName}
      </Text>

      <Styled.StarsContainer>{renderStars()}</Styled.StarsContainer>

      <Text type="body" color="white" align="justify">
        {comment}
      </Text>
    </Styled.ReviewCardContainer>
  );
};

export default ReviewCard;
