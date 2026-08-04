/** Small uppercase pill chip — "FIRST HARVEST · DEC 2026", "LAB-VERIFIED", cert numbers. */
export interface BadgeProps {
  children?: React.ReactNode;
  /** 'outline' gold-hairline on light · 'solid' forest · 'dark' for dark grounds · 'tint' mist */
  variant?: 'outline' | 'solid' | 'dark' | 'tint';
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
