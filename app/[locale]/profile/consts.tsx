import {
  ProfileIcon,
  CheckedIcon,
  BookmarkIcon,
  HistoryIcon,
} from '@/components/icons';

export const getMenuItems = (t: (key: string) => string) => [
  {
    id: 'personal',
    label: t('profile.personalInformation'),
    icon: <ProfileIcon width="20" height="20" />,
  },
  {
    id: 'tickets',
    label: t('profile.activeTickets'),
    icon: <CheckedIcon width="20" height="20" />,
  },
  {
    id: 'favorite',
    label: t('profile.favorite'),
    icon: <BookmarkIcon width="20" height="20" />,
  },
  {
    id: 'history',
    label: t('profile.history'),
    icon: <HistoryIcon width="20" height="20" />,
  },
];

export const getEmptyStates = (t: (key: string) => string) => ({
  tickets: {
    icon: <CheckedIcon width="48" height="48" />,
    title: t('profile.noActiveTickets'),
    description: t('profile.noActiveTicketsDescription'),
  },
  favorite: {
    icon: <BookmarkIcon width="48" height="48" />,
    title: t('profile.noFavorites'),
    description: t('profile.noFavoritesDescription'),
  },
  history: {
    icon: <HistoryIcon width="48" height="48" />,
    title: t('profile.noHistory'),
    description: t('profile.noHistoryDescription'),
  },
});

