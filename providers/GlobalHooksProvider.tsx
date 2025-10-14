'use client';

import { useAuth } from '@/hooks';

/**
 * Provider that initializes global hooks that need to run on every page
 * Add any hooks here that should persist across all pages
 */
export default function GlobalHooksProvider() {
  // Initialize auth - handles localStorage sync and hydration
  useAuth();

  // Add other global hooks here if needed
  // useTheme();
  // etc.

  return null;
}

