import React from "react";
import classNames from "classnames";

function Grid({ className, primaryColor, shadeColor }) {
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
                <rect className={shadeColorClass} x="3" y="3" width="8" height="8" rx="3"/>
                <rect className={shadeColorClass} x="3" y="13" width="8" height="8" rx="3"/>
                <rect className={primaryColorClass} x="13" y="3" width="8" height="8" rx="3"/>
                <rect className={shadeColorClass} x="13" y="13" width="8" height="8" rx="3"/>
            </svg>
        </>
    );
}

export default Grid;
