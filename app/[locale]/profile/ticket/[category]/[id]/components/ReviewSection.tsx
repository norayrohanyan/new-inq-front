import { useTranslations } from 'next-intl';
import Text from '@/components/Text';
import { IReview } from '@/types/user';
import { RatingStar } from './Icons';
import * as Styled from '../styled';

interface IReviewSectionProps {
  existingReview?: IReview | null;
  rating: number;
  comment: string;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  isReadOnly?: boolean;
}

export const ReviewSection = ({
  existingReview,
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  isReadOnly = false,
}: IReviewSectionProps) => {
  const t = useTranslations();

  // Show existing review in read-only mode
  if (existingReview && isReadOnly) {
    return (
      <Styled.ReviewSection>
        <Text type="body" color="white">
          {t('ticketDetail.comment')}
        </Text>
        <Styled.StarRating>
          {[1, 2, 3, 4, 5].map((star) => (
            <RatingStar
              key={star}
              filled={star <= existingReview.rating}
              clickable={false}
            />
          ))}
        </Styled.StarRating>
        <Styled.ExistingReview>
          <Text type="body" color="white">
            {existingReview.comment}
          </Text>
        </Styled.ExistingReview>
      </Styled.ReviewSection>
    );
  }

  // Show editable review form
  return (
    <Styled.ReviewSection>
      <Styled.StartSection>
      <Text type="body" color="white">
        {t('ticketDetail.rateYourExperience')}
      </Text>
      <Styled.StarRating>
        {[1, 2, 3, 4, 5].map((star) => (
          <RatingStar
            key={star}
            filled={star <= rating}
            onClick={() => onRatingChange(star)}
            clickable={true}
          />
        ))}
      </Styled.StarRating>
      </Styled.StartSection>
      <Styled.CommentSection>
        <Text type="body" color="white" fontWeight="500">
          {t('ticketDetail.comments')}
        </Text>
        <Styled.CommentTextarea
          placeholder={t('ticketDetail.commentPlaceholder')}
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
      </Styled.CommentSection>
    </Styled.ReviewSection>
  );
};

