import React, { Fragment } from "react";
import classNames from "classnames";
import { Switch as SwitchComponent } from "@headlessui/react";
function Switch({ className, label, name, size, note, noteClass, checked }) {
    const compClass = classNames({
        ["relative"]: true,
        [`${className}`]: className,
    });
    const noteElmClass = classNames({
        ["text-xs text-slate-500 dark:text-slate-300"]: true,
        ["ps-14 pt-0.5"]: !size,
        ["ps-12 pt-1"]: size === "sm",
        [`${noteClass}`]: noteClass,
    });
    return (
        <div className={compClass}>
            <SwitchComponent.Group as="div" className="flex">
                <SwitchComponent
                    name={name}
                    defaultChecked={checked ? true : false}
                    as={Fragment}
                >
                    {({ checked }) => {
                        const btnClass = classNames({
                            ["relative inline-flex items-center rounded-full focus-visible:outline-none"]: true,
                            ["bg-blue-600"]: checked,
                            ["bg-slate-200 dark:bg-slate-700"]: !checked,
                            ["h-6 w-11"]: !size,
                            ["h-5 w-9"]: size === "sm",
                        });
                        const dotClass = classNames({
                            ["inline-block rounded-full bg-white dark:bg-slate-950 transition-[all] absolute"]: true,
                            ["bg-white dark:bg-white"]: checked,
                            ["start-6"]: checked && !size,
                            ["start-5"]: checked && size === "sm",
                            ["start-1"]: !checked,
                            ["h-4 w-4"]: !size,
                            ["h-3 w-3"]: size === "sm",
                        });
                        return (
                            <button className={btnClass}>
                                <span className={dotClass} />
                            </button>
                        );
                    }}
                </SwitchComponent>
                {label && (
                    <SwitchComponent.Label className="inline-flex font-medium text-sm text-slate-600 dark:text-slate-200 ps-3 cursor-pointer">
                        {label}
                    </SwitchComponent.Label>
                )}
            </SwitchComponent.Group>
            {note && <div className={noteElmClass}>{note}</div>}
        </div>
    );
}

export default Switch;
