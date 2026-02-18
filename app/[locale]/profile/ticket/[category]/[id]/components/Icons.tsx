import * as Styled from '../styled';
import { StarIcon } from '@/components/icons';

// Star icon for rating
export const RatingStar = ({
  filled,
  onClick,
  clickable
}: {
  filled: boolean;
  onClick?: () => void;
  clickable?: boolean;
}) => (
  <Styled.StarButton $active={filled} $clickable={clickable} onClick={onClick} type="button">
    <StarIcon fill='#FEB245' outlined={!filled} width="14" height="14" />
  </Styled.StarButton>
);


// TODO add svgs in icons

// Icons for apartment details
export const AreaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H8V8H4V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 4H20V8H16V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 16H8V20H4V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 16H20V20H16V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BedroomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21V13H21V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 16H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 13V10C6 9.46957 6.21071 8.96086 6.58579 8.58579C6.96086 8.21071 7.46957 8 8 8H16C16.5304 8 17.0391 8.21071 17.4142 8.58579C17.7893 8.96086 18 9.46957 18 10V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 8V4H18V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LevelIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 21V7L12 3L19 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21V15H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

