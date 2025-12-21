'use client';

import React from 'react';
import * as Styled from './styled';
import Text from '@/components/Text';

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
  return (
    <Styled.TabsContainer>
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

      <Styled.TabContent>{children}</Styled.TabContent>
    </Styled.TabsContainer>
  );
};

export default CompanyTabs;

