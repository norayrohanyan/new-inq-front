'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type TabType = 'personal' | 'tickets' | 'favorite' | 'history';

interface ProfileTabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const ProfileTabContext = createContext<ProfileTabContextType | undefined>(undefined);

export function ProfileTabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  return (
    <ProfileTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ProfileTabContext.Provider>
  );
}

export function useProfileTab() {
  const context = useContext(ProfileTabContext);
  if (context === undefined) {
    throw new Error('useProfileTab must be used within a ProfileTabProvider');
  }
  return context;
}

