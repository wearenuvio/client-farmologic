/** The closing conversion band every page ends with — "Reserve your allocation from the first harvest." Dark ground, gold frame, gold CTA.
 * @startingPoint section="Product" subtitle="Page-closing reserve-allocation band" viewport="900x400"
 */
export interface CTABandProps {
  headline?: string;
  sub?: string;
  cta?: string;
  onCta?: () => void;
  style?: React.CSSProperties;
}
export declare function CTABand(props: CTABandProps): JSX.Element;
