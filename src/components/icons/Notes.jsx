import React from "react";
import classNames from "classnames";

function Notes({ className, primaryColor, shadeColor }) {
    const compClass = classNames({
        "h-full": !className,
        [`${className}`]: className,
    });
    const primaryColorClass = classNames({
        "fill-blue-600": !primaryColor,
        [`${primaryColor}`]: primaryColor,
    });
    const shadeColorClass = classNames({
        "fill-blue-300": !shadeColor,
        [`${shadeColor}`]: shadeColor,
    });
    return (
        <>
            {/* prettier-ignore */}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={compClass}>
                <rect className={primaryColorClass} x="2" y="5" width="16" height="10" rx="3"/>
                <rect className={shadeColorClass} x="6" y="9" width="16" height="10" rx="3"/>
                <circle className={primaryColorClass} cx="14" cy="14" r="2"/>
                <circle className={primaryColorClass} cx="9" cy="14" r="1"/>
                <circle className={primaryColorClass} cx="19" cy="14" r="1"/>
            </svg>
        </>
    );
}

export default Notes;
