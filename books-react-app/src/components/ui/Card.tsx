import clsx from "clsx";
import React from "react";
const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => (
    <div className={clsx("card", className)} {...rest}>{children}</div>
);
export default Card;