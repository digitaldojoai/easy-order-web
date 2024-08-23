"use client";
import React, { useState } from "react";
import Input from "../forms/Input";
import Select from "../forms/Select";
import Pagination from "./Pagination";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import PageStatus from "./PageStatus";

function DataCard({ columns, tableData, pageSize }: any) {
  const [data, setData] = useState(() => [...tableData]);
  const [globalFilter, setGlobalFilter] = useState("");

  // Update the state when input changes
  const handleFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize ? pageSize : 10,
      },
    },
  });
  const pageSizeSelect = [
    { name: 10 },
    { name: 20 },
    { name: 30 },
    { name: 50 },
  ];
  const [selected, setSelected] = useState(pageSizeSelect[0]);

  return (
    <>
      <div className="">
        <div className="pb-5 flex gap-3 items-center justify-between">
          <div className="w-full xs:w-64">
            <Input
              value={globalFilter}
              onChange={handleFilterChange}
              placeholder="Search query..."
            />
          </div>
          <div className="flex items-center gap-x-3">
            <div className="text-slate-500 dark:text-slate-300 text-sm hidden xs:block">
              Show
            </div>
            <div className="w-16 xs:w-20">
              <Select
                selected={selected}
                options={pageSizeSelect}
                onChange={(value: any) => {
                  table.setPageSize(Number(value.name));
                  setSelected(value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
          {table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="bg-white dark:bg-slate-950 p-5 rounded-lg border border-slate-200 dark:border-slate-800"
            >
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        <div
          className={`pt-6 flex sm:items-center justify-between flex-col sm:flex-row gap-4`}
        >
          <Pagination table={table} />
          <PageStatus table={table} />
        </div>
      </div>
    </>
  );
}

export default DataCard;
