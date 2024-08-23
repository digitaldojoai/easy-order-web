import React from "react";
import classNames from "classnames";

function Book({ className, primaryColor, shadeColor }) {
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
                <path className={shadeColorClass} fillRule="evenodd" clipRule="evenodd" d="M5 4C3.34315 4 2 5.34315 2 7V17C2 18.6569 3.34315 20 5 20H8.02633C8.67123 20 9.3119 20.104 9.9237 20.3079L12 21L14.0763 20.3079C14.6881 20.104 15.3288 20 15.9737 20H19C20.6569 20 22 18.6569 22 17V7C22 5.34315 20.6569 4 19 4H15C13.8053 4 12.7329 4.52376 12 5.35418C11.2671 4.52376 10.1947 4 9 4H5Z"/>
                <path className={primaryColorClass} fillRule="evenodd" clipRule="evenodd" d="M2 7C2 5.34315 3.34315 4 5 4H9C10.1947 4 11.2671 4.52376 12 5.35418L12 21L9.9237 20.3079C9.3119 20.104 8.67123 20 8.02633 20H5C3.34315 20 2 18.6569 2 17V7Z"/>
            </svg>
        </>
    );
}

export default Book;
