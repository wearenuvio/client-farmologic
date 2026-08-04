/** Editorial surfaces: ivory Card (2px corners, hairline, soft shadow, optional 1px gold inner frame) and GlassCard for dark grounds. */
export interface CardProps {
  children?: React.ReactNode;
  /** inset 1px gold frame — featured/quote cards */
  goldFrame?: boolean;
  /** lift on hover (clickable cards) */
  hover?: boolean;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
export declare function GlassCard(props: { children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
