import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useState, useEffect } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"




import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'

const DataTable = ({ data, columns, actions, rowSelection = {}, setRowSelection, onSelectedRowsChange, }) => {

    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])

    const table = useReactTable({
        data,
        defaultColumn: {
            size: 100, //starting column size
            minSize: 0, //enforced during column resizing
            maxSize: 200, //enforced during column resizing
        },

        columns: [
            {
                id: 'select',
                header: ({ table }) => (
                    <input
                        type="checkbox"
                        checked={table.getIsAllPageRowsSelected()}
                        onChange={table.getToggleAllPageRowsSelectedHandler()}
                    />
                ),
                cell: ({ row }) => (
                    <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        onChange={row.getToggleSelectedHandler()}
                    />
                ),
                size: 20,
            },
            ...columns,
        ],

        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,

        state: {
            globalFilter,
            sorting,
            rowSelection,
            columnFilters,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    useEffect(() => {
        if (onSelectedRowsChange) {
            const selectedRows = Object.keys(rowSelection)
                .map((rowId) => table.getRow(rowId)?.original)
                .filter(Boolean); // Filters out any undefined if rowId is invalid
            onSelectedRowsChange(selectedRows);
        }
    }, [rowSelection]);
    const dateValue = table.getColumn("date")?.getFilterValue()
    const setDate = (date) => {
        table.getColumn("date")?.setFilterValue(date ? format(date, "yyyy-MM-dd") : "")
    }

    return (

        <div className="py-2 px-2 w-full overflow-x-hidden">
  {/* Filters */}
  <div className="flex flex-wrap gap-3 justify-start items-center mb-4">
    {/* Date filter */}
    <div className="w-full sm:w-auto flex-1 min-w-[180px]">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateValue ? format(new Date(dateValue), "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dateValue ? new Date(dateValue) : undefined}
            onSelect={(d) => setDate(d)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>

    {/* Type filter */}
    <div className="w-full sm:w-auto flex-1 min-w-[150px]">
      <Select
        value={table.getColumn("type")?.getFilterValue() ?? "all"}
        onValueChange={(val) =>
          table.getColumn("type")?.setFilterValue(val === "all" ? "" : val)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="EDM">EDM</SelectItem>
          <SelectItem value="MIX">Mix</SelectItem>
          <SelectItem value="RETRO">Retro</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Status filter */}
    <div className="w-full sm:w-auto flex-1 min-w-[150px]">
      <Select
        value={table.getColumn("status")?.getFilterValue() ?? "all"}
        onValueChange={(val) =>
          table.getColumn("status")?.setFilterValue(val === "all" ? "" : val)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="draft">Saved Draft</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>

  {/* Table */}
  <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
    <Table className="min-w-full text-sm">
      <TableHeader className="bg-background">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                style={{ width: header.column.getSize() }}
                onClick={header.column.getToggleSortingHandler()}
                className="p-3 cursor-pointer truncate whitespace-nowrap text-xs sm:text-sm"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {{
                  asc: " 🔼",
                  desc: " 🔽",
                }[header.column.getIsSorted()] ?? ""}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className="border-t">
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className="p-3 truncate whitespace-nowrap text-xs sm:text-sm"
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>

  {/* Pagination */}
  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 my-4">
    {/* Left side: navigation */}
    <div className="flex items-center gap-2">
      {/* Previous */}
      <button
        className={`w-8 h-8 flex items-center justify-center rounded border ${
          !table.getCanPreviousPage()
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: table.getPageCount() }, (_, i) => i).map((page) => {
          const currentPage = table.getState().pagination.pageIndex;
          const totalPages = table.getPageCount();
          if (
            page < 3 ||
            page === totalPages - 1 ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                className={`w-8 h-8 flex items-center justify-center rounded text-xs sm:text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => table.setPageIndex(page)}
              >
                {page + 1}
              </button>
            );
          } else if (
            page === 3 && currentPage > 5 ||
            page === currentPage + 2 && page < totalPages - 2
          ) {
            return (
              <span key={page} className="px-2 text-gray-400">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* Next */}
      <button
        className={`w-8 h-8 flex items-center justify-center rounded border ${
          !table.getCanNextPage()
            ? "border-gray-200 text-gray-300 cursor-not-allowed"
            : "border-gray-300 text-gray-600 hover:bg-gray-50"
        }`}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    {/* Right side: entries + page size */}
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
      <span>
        Showing{" "}
        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
        {Math.min(
          (table.getState().pagination.pageIndex + 1) *
            table.getState().pagination.pageSize,
          table.getFilteredRowModel().rows.length
        )}{" "}
        of {table.getFilteredRowModel().rows.length} entries
      </span>

      <div className="flex items-center gap-2">
        <span>Show</span>
        <select
          className="border border-gray-300 rounded px-2 py-1 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 8, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
</div>


    )
}

export default DataTable
