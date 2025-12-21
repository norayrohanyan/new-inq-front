declare module 'react-responsive-masonry' {
  import { ReactNode } from 'react';

  export interface MasonryProps {
    columnsCount?: number;
    gutter?: string;
    columnsCountBreakPoints?: Record<number, number>;
    children?: ReactNode;
  }

  export default function Masonry(props: MasonryProps): JSX.Element;
}

