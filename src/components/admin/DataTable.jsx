import React from "react"
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"


const DataTable = ({ columns, data}) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    })

    return (
        <div className="w-full">

            {/* Table */}
            <div className="bg-card border border-edge overflow-hidden">

                <Table>

                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>

                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-[11px] uppercase tracking-wider text-ink-muted"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}

                            </TableRow>
                        ))}
                    </TableHeader>


                    <TableBody>

                        {table.getRowModel().rows?.length ? (

                            table.getRowModel().rows.map((row) => (

                                <TableRow
                                    key={row.id}
                                    className="hover:bg-surface-alt transition-colors"
                                >

                                    {row.getVisibleCells().map((cell) => (

                                        <TableCell
                                            key={cell.id}
                                            className="text-[12px] text-left text-ink-muted"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>

                                    ))}

                                </TableRow>

                            ))

                        ) : (

                            <TableRow>

                                <TableCell
                                    colSpan={columns.length}
                                    className="h-32 text-left text-[12px] text-ink-muted"
                                >
                                    No results found.
                                </TableCell>

                            </TableRow>

                        )}

                    </TableBody>

                </Table>

            </div>


            {/* Pagination */}
            <div className="flex items-center justify-between py-4">

                <p className="text-[11px] text-ink-muted">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </p>


                <div className="flex items-center gap-2">

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-none text-[11px]"
                    >
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="rounded-none text-[11px]"
                    >
                        Next
                    </Button>

                </div>

            </div>

        </div>
    )
}

export default DataTable