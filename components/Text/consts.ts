import { ITextStyle, TTextType } from './types';

export const TEXT_STYLES: Record<TTextType, ITextStyle> = {
  h1: { size: '2.5rem', weight: '700' },
  h2: { size: '2rem', weight: '600' },
  h3: { size: '1.75rem', weight: '600' },
  h4: { size: '1.5rem', weight: '600' },
  h5: { size: '1.25rem', weight: '500' },
  h6: { size: '1rem', weight: '500' },
  p: { size: '1rem', weight: '400' },
  small: { size: '0.875rem', weight: '400' },
  title: { size: '2rem', weight: '600' },
  subtitle: { size: '1.25rem', weight: '500' },
  header: { size: '1.5rem', weight: '600' },
  body: { size: '1rem', weight: '400' },
  caption: { size: '0.75rem', weight: '400' },
};

