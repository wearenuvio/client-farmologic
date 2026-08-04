/** Lab-data aesthetics: SpecReadout (row of small label/value pairs, tabular numerals) and Stat (big serif figure). */
export interface SpecReadoutProps {
  items?: { label: string; value: string }[];
  onDark?: boolean;
  style?: React.CSSProperties;
}
export declare function SpecReadout(props: SpecReadoutProps): JSX.Element;
export declare function Stat(props: { value: string | number; unit?: string; label?: string; onDark?: boolean; style?: React.CSSProperties }): JSX.Element;
