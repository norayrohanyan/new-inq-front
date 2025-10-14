'use client';

import Button from './index';

export default function ButtonExamples() {
  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Primary Buttons</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variant="primary" size="small">
            Small Button
          </Button>
          <Button variant="primary" size="medium">
            Medium Button
          </Button>
          <Button variant="primary" size="large">
            Large Button
          </Button>
          <Button variant="primary" size="medium" isLoading>
            Loading...
          </Button>
          <Button variant="primary" size="medium" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Secondary Buttons</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button variant="secondary" size="small">
            Small Button
          </Button>
          <Button variant="secondary" size="medium">
            Medium Button
          </Button>
          <Button variant="secondary" size="large">
            Large Button
          </Button>
          <Button variant="secondary" size="medium" isLoading>
            Loading...
          </Button>
          <Button variant="secondary" size="medium" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem' }}>Full Width</h3>
        <Button variant="primary" size="medium" fullWidth>
          Full Width Button
        </Button>
      </div>
    </div>
  );
}

