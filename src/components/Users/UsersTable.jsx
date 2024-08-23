import React from "react";
import moment from "moment";
import { ButtonIcon } from "../../../components";
import { country as countryList, users } from "../../../store";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DataTable } from "../../../components";

import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("name", {
        header: (info) => "Info",
        cell: ({ row }) => {
            return (
                <div className="flex items-center">
                    <span className="flex-shrink-0 h-10 w-10">
                        <img
                            className=" rounded-full"
                            src={row.original.avatar}
                            alt={row.original.name}
                        />
                    </span>
                    <div className="ms-3">
                        <span className="block text-slate-600 dark:text-slate-200 font-bold text-xs mb-1">
                            {row.original.name}
                        </span>
                        <span className="block text-slate-500 dark:text-slate-400 text-xs font-medium">
                            {row.original.email}
                        </span>
                    </div>
                </div>
            );
        },
    }),
    columnHelper.accessor("plan", {
        header: (info) => "Plan",
        cell: (info) => {
            return (
                <>
                    <span
                        className={`block w-max text-xs font-bold ${
                            info.getValue() === "Strater"
                                ? "bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text"
                                : "text-slate-600 dark:text-slate-200"
                        }`}
                    >
                        {info.getValue()}
                    </span>
                </>
            );
        },
    }),
    columnHelper.accessor("country", {
        header: (info) => "Country",
        cell: (row) => {
            const countryName = countryList.filter(function (item) {
                return item.code.includes(row.getValue());
            });
            return (
                <>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs font-boldn whitespace-nowrap">
                        {countryName[0].name}
                    </span>
                </>
            );
        },
    }),
    columnHelper.accessor("joined", {
        header: (info) => "Joined At",
        cell: (info) => {
            const date = moment(info.getValue()).format("ll");
            const time = moment(info.getValue()).format("LT");
            return (
                <>
                    <span className="block text-slate-600 dark:text-slate-200 text-xs font-bold whitespace-nowrap mb-1">
                        {date}
                    </span>
                    <span className="block text-slate-500 dark:text-slate-400 text-xs font-medium">
                        {time}
                    </span>
                </>
            );
        },
    }),
    columnHelper.accessor("status", {
        header: (info) => "Status",
        cell: (info) => {
            return (
                <>
                    <span
                        className={`inline-flex px-2 rounded-full text-[11px] font-bold capitalize ${
                            info.getValue() == "active"
                                ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-500"
                                : info.getValue() == "suspended"
                                ? "bg-rose-100 dark:bg-rose-950 text-rose-500"
                                : "text-slate-500 bg-slate-100 dark:bg-slate-900"
                        }`}
                    >
                        {info.getValue()}
                    </span>
                </>
            );
        },
    }),
    columnHelper.display({
        id: "tableAction",
        header: (info) => "",
        cell: (info) => {
            return (
                <>
                    <ul className="flex justify-end gap-2">
                        <li>
                            <ButtonIcon
                                as="Link"
                                to={`/admin/users/edit/${info.row.original.id}`}
                                circle
                                size="sm"
                                className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-blue-600 hover:text-white hover:dark:bg-blue-600 hover:dark:text-white"
                            >
                                <PencilIcon className="h-3 w-3" />
                            </ButtonIcon>
                        </li>
                        <li>
                            <ButtonIcon
                                circle
                                size="sm"
                                className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-rose-600 hover:text-white hover:dark:bg-rose-600 hover:dark:text-white"
                            >
                                <TrashIcon className="h-3 w-3" />
                            </ButtonIcon>
                        </li>
                    </ul>
                </>
            );
        },
    }),
];

function UsersTable() {
    return (
        <>
            <DataTable columns={columns} tableData={users} />
        </>
    );
}

export default UsersTable;
