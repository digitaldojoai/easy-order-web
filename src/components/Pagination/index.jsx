import React from "react";
import classNames from "classnames";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

function Pagination({ className }) {
    const compClass = classNames({
        "isolate inline-flex -space-x-px rounded-md shadow-sm": true,
        [`${className}`]: className,
    });
    return (
        <nav className={compClass}>
            <Item icon disabled>
                <ChevronLeftIcon className="h-4 w-4" />
            </Item>
            <Item current>1</Item>
            <Item>2</Item>
            <Item icon disabled>
                <EllipsisHorizontalIcon className="h-4 w-4" />
            </Item>
            <Item>9</Item>
            <Item>10</Item>
            <Item icon>
                <ChevronRightIcon className="h-4 w-4" />
            </Item>
        </nav>
    );
}

export default Pagination;

function Item({ icon, current, disabled, children }) {
    const compClass = classNames({
        "relative inline-flex items-center text-sm font-semibold focus:z-20 border first:rounded-s-md last:rounded-e-md": true,
        ["text-slate-600 hover:bg-slate-100"]: !current && !disabled,
        ["border-slate-200"]: !current,
        ["text-slate-400 cursor-not-allowed"]: disabled,
        ["bg-blue-600 hover:bg-blue-600 text-white border-blue-600 z-20"]:
            current,
        ["px-3 py-2"]: icon,
        ["px-4 py-2"]: !icon,
    });
    return (
        <a href="#" className={compClass}>
            {children}
        </a>
    );
}
