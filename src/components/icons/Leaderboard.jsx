import React from "react";
import classNames from "classnames";

function Leaderboard({ className, primaryColor, shadeColor }) {
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
                <path className={shadeColorClass} d="M2 13C2 11.3431 3.34315 10 5 10H10V19H3C2.44772 19 2 18.5523 2 18V13Z"/>
                <path className={shadeColorClass} d="M14 12H19C20.6569 12 22 13.3431 22 15V18C22 18.5523 21.5523 19 21 19H14V12Z"/>
                <path className={primaryColorClass} d="M8 8C8 6.34315 9.34315 5 11 5H13C14.6569 5 16 6.34315 16 8V19H8V8Z"/>
            </svg>
        </>
    );
}

export default Leaderboard;
