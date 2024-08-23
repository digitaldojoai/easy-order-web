import React from "react";
import classNames from "classnames";
import Link from "next/link";

function Breadcrumbs({ items, className }) {
  const compClass = classNames({
    "inline-flex items-center text-xs font-medium text-slate-500 dark:text-slate-300 flex gap-2": true,
    [`${className}`]: className,
  });
  return (
    <ul className={compClass}>
      {items.map((item, index, array) => (
        <React.Fragment key={index}>
          <li>
            {item.link ? (
              <Link
                href={item.link}
                className="text-blue-500 hover:text-blue-700"
              >
                {item.text}
              </Link>
            ) : (
              <>{item.text}</>
            )}
          </li>
          {array.length - 1 !== index && (
            <li className="inline-flex items-center mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="h-2 w-2"
              >
                <path
                  fill="currentColor"
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                />
              </svg>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}

export default Breadcrumbs;
