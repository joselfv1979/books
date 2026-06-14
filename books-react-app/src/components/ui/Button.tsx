import clsx from "clsx";
import React from "react";

type Variant = "primary" | "accent" | "outline";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; loading?: boolean; }

const variantMap: Record<Variant, string> = {
  primary: "btn btn-primary",
  accent: "btn btn-accent",
  outline: "btn btn-outline",
};

const Button: React.FC<Props> = ({ variant = "primary", loading, className, children, ...rest }) => (
  <button
    className={clsx(variantMap[variant], className, loading && "opacity-80 cursor-wait")}
    disabled={loading || rest.disabled}
    aria-busy={loading}
    {...rest}
  >
    {loading ? (
      <>
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-page" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span className="sr-only">Loading</span>
      </>
    ) : (
      children
    )}
  </button>
);

export default Button;