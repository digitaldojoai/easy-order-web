import React from "react";
import classNames from "classnames";

const ButtonIcon = React.forwardRef(
  (
    { children, size, circle, className, onClick }: any,
    ref: any
  ): React.ReactNode => {
    const compClass = classNames({
      "inline-flex justify-center items-center transition-all": true,
      "p-3": !size,
      "p-1": size === "xs",
      "p-2": size === "sm",
      "p-2.5": size === "md",
      "rounded-full": circle,
      ["rounded-md"]: !circle,
      [`${className}`]: className,
    });

    return (
      <button ref={ref} onClick={onClick} className={compClass}>
        {children}
      </button>
    );
  }
);

// add displayName for React DevTools
ButtonIcon.displayName = "ButtonIcon";

export default ButtonIcon;
