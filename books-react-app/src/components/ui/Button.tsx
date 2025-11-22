import clsx from "clsx";
import React from "react";
type Variant = "primary" | "accent" | "outline";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; loading?: boolean; }
const variantMap: Record<Variant, string> = {
    primary: "btn btn-primary",
    accent: "btn btn-accent",
    outline: "btn btn-outline"
};
const Button: React.FC<Props> = ({ variant = "primary", loading, className, children, ...rest }) => (
    <button className={clsx(variantMap[variant], className)} disabled={loading || rest.disabled} {...rest}>
        {loading ? "…" : children}
    </button>
);
export default Button;