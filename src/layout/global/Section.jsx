import React from "react";
import classNames from "classnames";

function Section({ children, className, ...rest }) {
    const compClass = classNames({
        ["relative"]: true,
        [`${className}`]: className,
    });
    return <section className={compClass} {...rest} style={{scrollMarginTop: "var(--topbar-height, 69px)"}}>{children}</section>;
}

export default Section;
