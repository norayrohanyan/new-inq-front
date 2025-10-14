import { HTMLAttributes, PropsWithChildren, Ref } from 'react';

export type TTextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'small'
  | 'title'
  | 'subtitle'
  | 'header'
  | 'body'
  | 'caption';

export type TColorKey = keyof typeof import('@/consts/colors').COLORS;

export interface ITextStyle {
  size: string;
  weight: string;
}

export interface IBaseProps extends PropsWithChildren {
  type?: TTextType;
  customColor?: string;
  color?: TColorKey;
  className?: string;
  letterSpacing?: string;
  lineHeight?: string;
  elementRef?: Ref<HTMLElement>;
  ellipsis?: boolean;
  align?: string;
  dangerouslySetInnerHTML?: {
    __html: string | TrustedHTML;
  };
  fontWeight?: string;
  isNumeric?: boolean;
}

export interface ITextProps {
  $type: TTextType;
  $customColor?: string;
  $color?: TColorKey;
  $letterSpacing?: string;
  $lineHeight?: string;
  $ellipsis?: boolean;
  $align?: string;
  $fontWeight?: string;
  $isNumeric?: boolean;
}

export type TProps = IBaseProps & Omit<HTMLAttributes<HTMLDivElement>, keyof IBaseProps>;

