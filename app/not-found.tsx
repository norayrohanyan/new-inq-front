import StyledComponentsRegistry from '@/lib/registry';
import StoreProvider from '@/lib/StoreProvider';
import NotFoundPage from '@/components/NotFoundPage/NotFoundPage';
import { COLORS } from '@/consts/colors';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ background: COLORS.darkBg }}>
        <StyledComponentsRegistry>
          <StoreProvider>
            <NotFoundPage />
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
