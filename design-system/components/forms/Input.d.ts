/** Enquiry-form text field. White field, hairline border, gold focus. `onDark` for glass fields on forest grounds.
 * @startingPoint section="Forms" subtitle="Enquiry form fields — input, select, textarea, checkbox" viewport="700x330"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onDark?: boolean;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
export declare function Textarea(props: { label?: string; onDark?: boolean; rows?: number; style?: React.CSSProperties } & React.TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element;
export declare function Select(props: { label?: string; options?: string[]; onDark?: boolean; style?: React.CSSProperties } & React.SelectHTMLAttributes<HTMLSelectElement>): JSX.Element;
export declare function Checkbox(props: { label?: React.ReactNode; onDark?: boolean; style?: React.CSSProperties } & React.InputHTMLAttributes<HTMLInputElement>): JSX.Element;
