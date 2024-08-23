import React from "react";
import classNames from "classnames";

function Schedule({ className, primaryColor, shadeColor }) {
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
                <rect className={shadeColorClass} x="2" y="4" width="20" height="18" rx="3"/>
                <circle className={primaryColorClass} cx="17" cy="17" r="6"/>
                <path className={shadeColorClass} fillRule="evenodd" clipRule="evenodd" d="M17 14C17.5523 14 18 14.4477 18 15V16.5858L19.2071 17.7929C19.5976 18.1834 19.5976 18.8166 19.2071 19.2071C18.8166 19.5976 18.1834 19.5976 17.7929 19.2071L16.2929 17.7071C16.1054 17.5196 16 17.2652 16 17V15C16 14.4477 16.4477 14 17 14Z"/>
                <path className={primaryColorClass} fillRule="evenodd" clipRule="evenodd" d="M7 2C7.55228 2 8 2.44772 8 3V5C8 5.55228 7.55228 6 7 6C6.44772 6 6 5.55228 6 5V3C6 2.44772 6.44772 2 7 2Z"/>
                <path className={primaryColorClass} fillRule="evenodd" clipRule="evenodd" d="M17 2C17.5523 2 18 2.44772 18 3V5C18 5.55228 17.5523 6 17 6C16.4477 6 16 5.55228 16 5V3C16 2.44772 16.4477 2 17 2Z"/>
            </svg>
        </>
    );
}

export default Schedule;
