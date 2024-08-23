import React from "react";
import classNames from "classnames";
import DatePicker from "react-datepicker";
function DatePickerComponent({
    defaultValue,
    id,
    placeholder,
    className,
    size,
    disabled,
    onChange,
    start,
    end,
    selected,
    showTimeSelect,
    dateFormat,
}) {
    const compClass = classNames({
        "z-10 w-full rounded-md text-sm/[1.125rem] bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 placeholder:text-slate-400 placeholder:dark:text-slate-300 border-slate-200 dark:border-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:border-slate-200 focus:shadow-none focus:outline-none": true,
        ["py-2 text-sm"]: !size,
        ["rounded-s-none"]: start,
        ["rounded-e-none"]: end,
        [`${className}`]: className,
    });
    return (
        <div className="relative flex isolate">
            {start && (
                <div className="rounded-s-md border border-e-0 px-3 inline-flex items-center text-sm text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    {start}
                </div>
            )}
            <DatePicker
                className={compClass}
                placeholder={placeholder && placeholder}
                id={id && id}
                selected={selected}
                defaultValue={defaultValue && defaultValue}
                disabled={disabled && "disabled"}
                onChange={onChange}
                showTimeSelect={showTimeSelect && true}
                dateFormat={dateFormat}
            />
            {end && (
                <div className="rounded-e-md border border-s-0 px-3 inline-flex items-center text-sm text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    {end}
                </div>
            )}
        </div>
    );
}

export default DatePickerComponent;
