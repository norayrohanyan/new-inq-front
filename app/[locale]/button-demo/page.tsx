'use client';

import { useTranslations } from 'next-intl';
import Button from '@/components/Button';
import Text from '@/components/Text';
import * as Styled from '@/app/[locale]/button-demo/styled';

export default function ButtonDemoPage() {
  const t = useTranslations();

  return (
    <Styled.PageContainer>
      <Styled.Container>
        <Text type="h1" color="white" align="center">
          Button Components
        </Text>

        <Styled.Section>
          <Text type="h2" color="white">
            Primary Buttons
          </Text>
          <Styled.ButtonRow>
            <Button variant="primary" size="small">
              Small
            </Button>
            <Button variant="primary" size="medium">
              Medium
            </Button>
            <Button variant="primary" size="large">
              Large
            </Button>
            <Button variant="primary" size="medium" isLoading>
              Loading...
            </Button>
            <Button variant="primary" size="medium" disabled>
              Disabled
            </Button>
          </Styled.ButtonRow>
        </Styled.Section>

        <Styled.Section>
          <Text type="h2" color="white">
            Secondary Buttons
          </Text>
          <Styled.ButtonRow>
            <Button variant="secondary" size="small">
              Small
            </Button>
            <Button variant="secondary" size="medium">
              Medium
            </Button>
            <Button variant="secondary" size="large">
              Large
            </Button>
            <Button variant="secondary" size="medium" isLoading>
              Loading...
            </Button>
            <Button variant="secondary" size="medium" disabled>
              Disabled
            </Button>
          </Styled.ButtonRow>
        </Styled.Section>

        <Styled.Section>
          <Text type="h2" color="white">
            Full Width
          </Text>
          <Button variant="primary" size="medium" fullWidth>
            Join us
          </Button>
          <div style={{ marginTop: '1rem' }}>
            <Button variant="secondary" size="medium" fullWidth>
              Back
            </Button>
          </div>
        </Styled.Section>

        <Styled.Section>
          <Text type="h2" color="white">
            Interactive Example
          </Text>
          <Styled.InteractiveDemo>
            <Button variant="primary" size="large" onClick={() => alert('Primary clicked!')}>
              Join us
            </Button>
            <Button variant="secondary" size="large" onClick={() => alert('Secondary clicked!')}>
              Back
            </Button>
          </Styled.InteractiveDemo>
        </Styled.Section>
      </Styled.Container>
    </Styled.PageContainer>
  );
}

