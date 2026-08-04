/** Uppercase tracked eyebrow label above headlines ("HERO PRODUCTS", "OUR PURPOSE"). */
export interface SectionLabelProps {
  children?: React.ReactNode;
  /** 'gold' default · 'forest' on tints · 'leaf' on dark grounds */
  color?: 'gold' | 'forest' | 'leaf';
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}
export declare function SectionLabel(props: SectionLabelProps): JSX.Element;
