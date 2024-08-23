import React from 'react'
import classNames from "classnames";
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

function Pagination({table}) {
    const pageNumbers = [];
    for (let i = 1; i <= table.getPageCount(); i++) {
        pageNumbers.push(i);
    }
    const paginationNumber = () => {
        if (pageNumbers.length <= 3) {
            return pageNumbers;
        } else if (
            pageNumbers.length >= 2 &&
            table.getState().pagination.pageIndex + 1 <= 2
        ) {
            return [1, 2, 3, "blank", pageNumbers[pageNumbers.length - 1]];
        } else if (
            pageNumbers.length >= 3 &&
            table.getState().pagination.pageIndex + 1 >=
                pageNumbers[pageNumbers.length - 2]
        ) {
            return [
                1,
                "blank",
                pageNumbers[pageNumbers.length - 3],
                pageNumbers[pageNumbers.length - 2],
                pageNumbers[pageNumbers.length - 1],
            ];
        } else if (
            pageNumbers.length > 3 &&
            table.getState().pagination.pageIndex + 1 > 2 &&
            table.getState().pagination.pageIndex + 1 <
                pageNumbers[pageNumbers.length - 2]
        ) {
            return [
                "blank",
                table.getState().pagination.pageIndex + 1 - 1,
                table.getState().pagination.pageIndex + 1,
                table.getState().pagination.pageIndex + 1 + 1,
                "blank",
            ];
        }
    };
    let paginationItems = paginationNumber();

  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        <PageButton
            icon
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
        >
            <ChevronDoubleLeftIcon className="h-4 w-4" />
        </PageButton>
        <PageButton
            icon
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >
            <ChevronLeftIcon className="h-4 w-4" />
        </PageButton>
        {paginationItems.map((number, index) => (
            <PageButton
                key={index}
                current={
                    number - 1 ===
                    table.getState().pagination.pageIndex
                }
                onClick={() => table.setPageIndex(number - 1)}
                icon={number === "blank"}
                disabled={number === "blank"}
            >
                {number !== "blank" ? (
                    number
                ) : (
                    <EllipsisHorizontalIcon className="h-4 w-4" />
                )}
            </PageButton>
        ))}
        <PageButton
            icon
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >
            <ChevronRightIcon className="h-4 w-4" />
        </PageButton>
        <PageButton
            icon
            onClick={() =>
                table.setPageIndex(table.getPageCount() - 1)
            }
            disabled={!table.getCanNextPage()}
        >
            <ChevronDoubleRightIcon className="h-4 w-4" />
        </PageButton>
    </nav>
  )
}

export default Pagination

function PageButton({ icon, current, disabled, children, onClick }) {
    const compClass = classNames({
        "relative inline-flex items-center text-sm font-semibold focus:z-20 border first:rounded-s-md last:rounded-e-md": true,
        ["text-slate-600 dark:text-slate-200 hover:bg-slate-100 hover:dark:bg-slate-900"]: !current && !disabled,
        ["border-slate-200 dark:border-slate-800"]: !current,
        ["text-slate-400 dark:text-slate-600 pointer-events-none"]: disabled,
        ["bg-blue-600 hover:bg-blue-600 text-white border-blue-600 z-20"]:
            current,
        ["px-2.5 py-2"]: icon,
        ["px-4 py-2"]: !icon,
    });
    return (
        <button className={compClass} onClick={onClick}>
            {children}
        </button>
    );
}