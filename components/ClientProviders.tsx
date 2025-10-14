'use client';

import { ReactNode } from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import StoreProvider from '@/lib/StoreProvider';
import GlobalStyles from '@/styles/GlobalStyles';
import GlobalHooksProvider from '@/providers/GlobalHooksProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <StoreProvider>
        <GlobalStyles />
        <GlobalHooksProvider />
        <Header />
        {children}
        <Footer />
      </StoreProvider>
    </StyledComponentsRegistry>
  );
}

