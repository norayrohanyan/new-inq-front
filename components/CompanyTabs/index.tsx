'use client';

import React, { useMemo } from 'react';
import * as Styled from './styled';
import Text from '@/components/Text';
import CustomDropdown from '@/components/CustomDropdown';
import { useIsMobile } from '@/hooks';

export interface ITab {
  id: string;
  label: string;
  count?: number;
}

interface ICompanyTabsProps {
  tabs: ITab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
}

const CompanyTabs: React.FC<ICompanyTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  children,
}) => {
  const isMobile = useIsMobile();

  // Convert tabs to dropdown options format
  const dropdownOptions = useMemo(() => 
    tabs.map((tab) => ({
      value: tab.id,
      label: tab.label.toUpperCase(),
    })),
    [tabs]
  );

  return (
    <Styled.TabsContainer>
      {isMobile ? (
        // Mobile: Dropdown with smooth transition
        <CustomDropdown
          options={dropdownOptions}
          value={activeTab}
          onChange={onTabChange}
          placeholder="SELECT"
          variant="filled"
        />
      ) : (
        // Desktop: Tabs
        <Styled.TabsList>
          {tabs.map((tab) => (
            <Styled.Tab
              key={tab.id}
              $active={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            >
              <Text
                type="body"
                color={activeTab === tab.id ? 'white' : 'secondarySemiLight'}
                fontWeight={activeTab === tab.id ? '600' : '400'}
              >
                {tab.label.toUpperCase()}
              </Text>
            </Styled.Tab>
          ))}
        </Styled.TabsList>
      )}

      <Styled.TabContent>{children}</Styled.TabContent>
    </Styled.TabsContainer>
  );
};

export default CompanyTabs;

