import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";

const Input = forwardRef(
  (
    {
      defaultValue,
      id,
      placeholder,
      type,
      className,
      size,
      maxLength,
      max,
      min,
      disabled,
      onChange,
      start,
      end,
    }: any,
    ref: React.Ref<HTMLInputElement> | undefined
  ) => {
    const compClass = classNames({
      "z-10 w-full rounded-md text-sm/[1.125rem] bg-white  text-slate-600  placeholder:text-slate-400  border-slate-200  disabled:bg-slate-100 disabled:text-slate-400 focus:border-slate-200 focus:shadow-none focus:outline-none":
        true,
      ["py-2 text-sm"]: !size,
      ["rounded-s-none"]: start,
      ["rounded-e-none"]: end,
      [`${className}`]: className,
    });
    return (
      <div className="relative flex isolate w-full">
        {start && (
          <div className="rounded-s-md border border-e-0 px-3 inline-flex items-center text-sm text-slate-500  bg-slate-100 border-slate-200 ">
            {start}
          </div>
        )}
        <input
          ref={ref || undefined}
          className={compClass}
          type={type ? type : "text"}
          placeholder={placeholder && placeholder}
          id={id && id}
          maxLength={maxLength && maxLength}
          max={max && max}
          min={min && min}
          defaultValue={defaultValue && defaultValue}
          disabled={disabled && "disabled"}
          onChange={onChange}
        />
        {end && (
          <div className="rounded-e-md border border-s-0 px-3 inline-flex items-center text-sm text-slate-500  bg-slate-100  border-slate-200 ">
            {end}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
