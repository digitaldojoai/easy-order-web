import React, { useState } from "react";
import classNames from "classnames";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
function Select({
  size,
  className,
  options,
  selected,
  onChange,
  id,
  disabled,
}: any) {
  const compClass = classNames({
    "flex w-full rounded-md text-start bg-white  border px-3 text-slate-600  border-slate-200  focus:border-slate-200 focus:shadow-none focus:outline-none":
      true,
    ["py-2 text-sm/[1.125rem]"]: !size,
    [`${className}`]: className,
  });
  if (selected === undefined) {
    selected = options[0].value;
  }
  return (
    <div className="relative">
      <Listbox value={selected} onChange={onChange} disabled={disabled}>
        <Listbox.Button className={compClass} id={id}>
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
            <ChevronDownIcon className="h-4 w-4 text-gray-400 transition-all ui-open:rotate-180 " />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-[100000] max-h-[12rem] w-full overflow-y-auto rounded-md border border-slate-200 bg-white ">
          {options?.map((option: any, index: any) => {
            return (
              <Listbox.Option
                key={index}
                value={option.value}
                disabled={option.disabled && option.disabled}
                className={({ selected }) =>
                  `cursor-pointer px-3 py-1.5 text-sm font-medium transition-all ui-disabled:bg-slate-100 ui-disabled:text-slate-300 hover:bg-blue-200 hover:text-blue-500   ${
                    selected ? "bg-blue-100 text-blue-600 " : "text-slate-600 "
                  }`
                }
              >
                {option.label}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default Select;
