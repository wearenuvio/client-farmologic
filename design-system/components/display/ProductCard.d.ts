/** B2B product-form card — pack panel, serif name, benefit triad, "price on request". Never shows a price or cart.
 * @startingPoint section="Product" subtitle="Bulk product-form card with benefit triad" viewport="700x420"
 */
export interface ProductCardProps {
  name: string;
  /** e.g. "Powder · 100g", "Capsules · 60ct" */
  form?: string;
  /** uppercase triad, e.g. ['ENERGY','FOCUS','STAMINA'] */
  benefits?: string[];
  spec?: string;
  image?: string;
  /** pack panel color: forest, ivory (#F6F4EE), sage/olive */
  packColor?: string;
  onEnquire?: () => void;
  style?: React.CSSProperties;
}
export declare function ProductCard(props: ProductCardProps): JSX.Element;
