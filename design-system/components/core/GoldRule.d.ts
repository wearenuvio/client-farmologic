/** The thin gold hairline rule that sits under headlines. Never thicker than 1px. */
export interface GoldRuleProps {
  width?: number | string;
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}
export declare function GoldRule(props: GoldRuleProps): JSX.Element;
