import React from "react";
import classNames from "classnames";

function Label({ children, htmlFor, className }: any) {
  const compClass = classNames({
    "inline-flex font-bold text-sm text-slate-600  cursor-pointer": true,
    [`${className}`]: className,
  });
  return (
    <>
      {htmlFor ? (
        <label htmlFor={htmlFor} className={compClass}>
          {children}
        </label>
      ) : (
        <h6 className={compClass}>{children}</h6>
      )}
    </>
  );
}

export default Label;
