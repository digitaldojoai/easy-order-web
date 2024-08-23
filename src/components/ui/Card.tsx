import React, { forwardRef } from "react";
import classNames from "classnames";

const Card = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }: any, ref) => {
  const compClass = classNames({
    "bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800":
      true,
    [`${className}`]: className,
  });
  return (
    <div ref={ref} className={compClass}>
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;
