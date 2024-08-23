import React from "react";
import classNames from "classnames";
function Container({ className, children }: any) {
  const compClass = classNames({
    [" xl:px-8 p-4"]: true,
    [`${className}`]: className,
  });
  return <div className={compClass}>{children}</div>;
}

export default Container;
