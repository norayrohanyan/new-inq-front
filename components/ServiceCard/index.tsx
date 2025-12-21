import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Text from '@/components/Text';
import Button from '@/components/Button';
import * as Styled from './styled';

interface IServiceCardProps {
  id: number;
  name: string;
  description?: string;
  price?: number;
  duration?: string;
  onBook?: (serviceId: number) => void;
}

const ServiceCard: React.FC<IServiceCardProps> = ({
  id,
  name,
  description,
  price,
  duration,
  onBook,
}) => {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Styled.CardContainer>
      <Styled.InfoSection>
        <Text type="body" color="white" fontWeight="600">
          {name}
        </Text>
        
        {(price || duration) && (
          <Styled.MetaInfo>
            {price && (
              <Text type="caption" color="secondarySemiLight">
                {price} AMD
              </Text>
            )}
            {duration && (
              <Text type="caption" color="secondarySemiLight">
                {duration}
              </Text>
            )}
          </Styled.MetaInfo>
        )}

        {description && (
          <motion.div
            layout
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ 
              duration: 0.25,
              ease: 'easeInOut'
            }}
            style={{ 
              overflow: 'hidden',
              marginTop: isExpanded ? '0.75rem' : 0,
              paddingTop: isExpanded ? '0.75rem' : 0
            }}
          >
            {isExpanded && (
              <Text type="caption" color="secondarySemiLight">
                {description}
              </Text>
            )}
          </motion.div>
        )}
      </Styled.InfoSection>

      <Styled.ButtonsSection>
        {description && (
          <Button
            variant="secondary"
            size="small"
            onClick={toggleExpanded}
          >
            {isExpanded ? t('company.showLess') : t('company.about')}
          </Button>
        )}
        <Button
          variant="primary"
          size="small"
          onClick={() => onBook && onBook(id)}
        >
          {t('company.book')}
        </Button>
      </Styled.ButtonsSection>
    </Styled.CardContainer>
  );
};

export default ServiceCard;

