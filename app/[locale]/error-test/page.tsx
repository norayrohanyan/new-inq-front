'use client';

import { useEffect } from 'react';

export default function ErrorTestPage() {
  useEffect(() => {
    // Trigger an error after component mounts
    throw new Error('This is a test 500 error - triggered intentionally for testing!');
  }, []);

  return (
    <div>
      <h1>This should trigger an error...</h1>
    </div>
  );
}

