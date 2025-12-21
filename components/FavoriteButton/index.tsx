import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addFavoriteThunk, deleteFavoriteThunk, userSelectors } from '@/store';
import { BookmarkIcon } from '@/components/icons';
import * as Styled from './styled';

interface IFavoriteButtonProps {
  companyId: number;
  category: string;
  size?: 'small' | 'medium' | 'large';
}

export const FavoriteButton: React.FC<IFavoriteButtonProps> = ({
  companyId,
  category,
  size = 'small',
}) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(userSelectors.favorites);
  
  // Check if this company is in the favorites list
  const isFavorite = useMemo(() => {
    return favorites.some((fav) => fav.id === companyId);
  }, [favorites, companyId]);
  

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    if (isFavorite) {
      // Remove from favorites - handled in Redux
      dispatch(deleteFavoriteThunk({ clientId: companyId, category }));
    } else {
      // Add to favorites - handled in Redux
      dispatch(addFavoriteThunk({ clientId: companyId, category }));
    }
  };

  return (
    <Styled.FavoriteButton
      onClick={handleToggle}
      $isFavorite={isFavorite}
      $size={size}
    >
      <BookmarkIcon width={12} height={12} active={isFavorite} />
    </Styled.FavoriteButton>
  );
};

