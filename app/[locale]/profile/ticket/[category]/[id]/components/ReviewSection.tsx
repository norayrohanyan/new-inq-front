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
    const hasRating = existingReview.rating > 0;
    const hasComment = !!existingReview.comment?.trim();

    if (!hasRating && !hasComment) return null;

    return (
      <Styled.ReviewSection>
        {hasRating && (
          <Styled.StartSection>
            <Text type="body" color="white" fontWeight="500">
              {t('ticketDetail.rating')}
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
          </Styled.StartSection>
        )}
        {hasComment && (
          <Styled.CommentSection>
            <Text type="body" color="white" fontWeight="500">
              {t('ticketDetail.comments')}
            </Text>
            <Text type="body" customColor="#999999">
              {existingReview.comment}
            </Text>
          </Styled.CommentSection>
        )}
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
          maxLength={500}
        />
      </Styled.CommentSection>
    </Styled.ReviewSection>
  );
};

