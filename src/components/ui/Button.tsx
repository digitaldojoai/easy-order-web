import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";

const Button = forwardRef(
  (
    { children, size, circle, className, onClick, block, pill, ...props }: any,
    ref: any
  ): ReactNode => {
    const compClass = classNames({
      "inline-flex justify-center items-center font-medium transition-all":
        true,
      "text-sm px-5 py-2 gap-3": !size,
      "text-xs px-2 py-1 gap-2": size == "xs",
      "text-xs px-3 py-2 gap-3": size == "sm",
      "text-xs px-3.5 py-2.5 gap-3": size == "md",
      "w-full": block,
      "rounded-full": pill,
      ["rounded-md"]: !pill,
      [`${className}`]: className,
    });

    return (
      <button ref={ref} onClick={onClick} className={compClass}>
        {children}
      </button>
    );
  }
);

//add displayName for debugging
Button.displayName = "Button";

export default Button;
