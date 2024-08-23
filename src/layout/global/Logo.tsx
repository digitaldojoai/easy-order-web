import React from "react";
import { twMerge } from "tailwind-merge";

function Logo({
  rootClassName,
  className,
  classNameDark,
  classNameWhite,
}: any) {
  return (
    <div className={twMerge("flex items-center", rootClassName)}>
      <img
        className={twMerge("h-8 ", className, classNameDark)}
        src="/LOGOS.png"
      />
    </div>
  );
}

export default Logo;
