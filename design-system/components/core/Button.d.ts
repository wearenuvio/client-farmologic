/** Farmologic button. Uppercase Montserrat, tracked, square corners. Gold is reserved for the primary site CTA ("Request a Sample").
 * @startingPoint section="Core" subtitle="Primary, gold CTA, outline and ghost buttons" viewport="700x260"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 'primary' forest · 'gold' the site CTA · 'outline' · 'outline-dark' for dark grounds · 'ghost' text link */
  variant?: 'primary' | 'gold' | 'outline' | 'outline-dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
