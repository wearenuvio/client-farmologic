/** Circular gold seal device — the LAB-VERIFIED mark from the collateral. Typographic (the real logo image is never redrawn). */
export interface SealProps {
  label?: string;
  sub?: string;
  /** diameter in px */
  size?: number;
  onDark?: boolean;
  style?: React.CSSProperties;
}
export declare function Seal(props: SealProps): JSX.Element;
