import React from "react";
import classNames from "classnames";

function Checkbox({
    id,
    className,
    classNameLabel,
    size,
    label,
    disabled,
    checked,
}) {
    const compClass = classNames({
        "h-5 w-5 p-1 bg-white dark:bg-slate-950 checked:dark:bg-blue-600 border-slate-300 dark:border-slate-700 checked:dark:border-blue-600 border-2 focus:dark:ring-offset-slate-950 rounded": true,
        ["text-sm"]: !size,
        [`${className}`]: className,
    });
    const labelClass = classNames({
        "inline-flex font-medium text-sm text-slate-600 dark:text-slate-200 cursor-pointer ps-3": true,
        [`${classNameLabel}`]: classNameLabel,
    });
    return (
        <div className="relative flex">
            <input
                className={compClass}
                type="checkbox"
                id={id}
                disabled={disabled && "disabled"}
                defaultChecked={checked && "checked"}
            />
            {label && (
                <label className={labelClass} htmlFor={id}>
                    {label}
                </label>
            )}
        </div>
    );
}

export default Checkbox;
