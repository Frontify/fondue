/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useTable } from "@react-aria/table";
import {
    Cell as AriaCell,
    Column as AriaColumn,
    Row as AriaRow,
    TableBody,
    TableHeader,
    TableStateProps,
    useTableState,
} from "@react-stately/table";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { TableCell, TableCellType } from "./TableCell";
import { TableColumnHeader, TableColumnHeaderType } from "./TableColumnHeader";
import { TableHeaderRow } from "./TableHeaderRow";
import { TableRow } from "./TableRow";

export enum SelectionMode {
    NoSelect = "none",
    SingleSelect = "single",
    MultiSelect = "multiple",
}

export type Cell = {
    sortId: string | number;
    value: ReactNode;
    ariaLabel?: string;
};

export type Column = {
    name: string;
    key: string;
};

export type Row = {
    key: string | number;
    // cell keys have to correspond to column key values
    // e.g. Column { name: 'User', key: 'user' } ==> Row Cell { user: { id: 'anna', value: 'Anna' } }
    cells: Record<string, Cell>;
    actionElements?: ReactNode;
};

export type TableProps = {
    columns: Column[];
    rows: Row[];
    onSelectionChange?: (ids?: (string | number)[]) => void;
    selectionMode?: SelectionMode;
    selectedRowIds?: (string | number)[];
    ariaLabel?: string;
};

const DEFAULT_SORT_ORDER = "descending";

type SortType = {
    sortedColumnKey?: string | number;
    sortOrder?: "ascending" | "descending";
};

/* react-aria hook props types are inexplicitly typed */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapToTableAriaProps = (columns: Column[], rows: Row[]): TableStateProps<any> => ({
    children: [
        <TableHeader key="table-header" columns={columns}>
            {(column) => <AriaColumn allowsSorting>{column.name}</AriaColumn>}
        </TableHeader>,
        <TableBody key="table-body" items={rows}>
            {(item) => (
                <AriaRow>
                    {(columnKey) => (
                        <AriaCell key={`${item.key}-${columnKey}`} aria-label={item.cells[columnKey].ariaLabel}>
                            {item.cells[columnKey].value}
                        </AriaCell>
                    )}
                </AriaRow>
            )}
        </TableBody>,
    ],
});

const getRowFromId = (rows: Row[], id: string | number) => rows.find(({ key }) => key === id) || null;

const getAllRowIds = (rows: Row[]): (string | number)[] => rows.map(({ key: id }) => id);

const sortRows = (rows: Row[], columnKey: string | number, isDescending: boolean) => {
    const sort = (a: Row, b: Row) => {
        const keyA = a.cells[columnKey].sortId;
        const keyB = b.cells[columnKey].sortId;

        if (!keyA || !keyB || keyA === keyB) {
            return 0;
        }
        if (isDescending) {
            return keyA < keyB ? -1 : 1;
        } else {
            return keyA < keyB ? 1 : -1;
        }
    };

    return [...rows].sort(sort);
};

export const Table: FC<TableProps> = ({
    columns,
    rows,
    onSelectionChange,
    selectionMode = SelectionMode.NoSelect,
    selectedRowIds = [],
    ariaLabel = "Table",
}) => {
    const isSelectTable = selectionMode === SelectionMode.SingleSelect || selectionMode === SelectionMode.MultiSelect;
    const [sortedRows, setSortedRows] = useState(rows);
    const [{ sortedColumnKey, sortOrder }, setSortedColumn] = useState<SortType>({
        sortedColumnKey: undefined,
        sortOrder: undefined,
    });
    const ref = useRef<HTMLTableElement | null>(null);
    const props = mapToTableAriaProps(columns, sortedRows);
    const state = useTableState({
        ...props,
        selectionMode,
        sortDescriptor: {
            column: sortedColumnKey,
            direction: sortOrder,
        },
        onSortChange: ({ column, direction }) =>
            setSortedColumn({
                sortedColumnKey: column,
                sortOrder: sortedColumnKey !== column ? DEFAULT_SORT_ORDER : direction,
            }),
        onSelectionChange: (keys) =>
            isSelectTable &&
            onSelectionChange &&
            onSelectionChange(keys === "all" ? getAllRowIds(sortedRows) : Array.from(keys)),
        defaultSelectedKeys: isSelectTable ? selectedRowIds : undefined,
        showSelectionCheckboxes: isSelectTable,
    });
    const { collection } = state;
    const { gridProps } = useTable({ "aria-label": ariaLabel }, state, ref);

    useEffect(() => {
        if (sortedColumnKey && sortOrder) {
            const currentSortedRows = sortRows(rows, sortedColumnKey, sortOrder === DEFAULT_SORT_ORDER);
            setSortedRows(currentSortedRows);
        }
    }, [sortedColumnKey, sortOrder]);

    return (
        <div className="tw-overflow-scroll tw-w-full tw-max-h-96 sm:tw-max-h-full">
            <table
                {...gridProps}
                ref={ref}
                className="tw-border-collapse tw-table-auto tw-w-full tw-min-w-max tw-text-left dark:tw-bg-black-100 dark:tw-text-black-20"
            >
                <thead>
                    {collection.headerRows.map((headerRow) => (
                        <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
                            {[...headerRow.childNodes].map((column) =>
                                column.props.isSelectionCell ? (
                                    <TableColumnHeader
                                        key={column.key}
                                        column={column}
                                        state={state}
                                        type={TableColumnHeaderType.SelectAll}
                                    />
                                ) : (
                                    <TableColumnHeader key={column.key} column={column} state={state} />
                                ),
                            )}
                        </TableHeaderRow>
                    ))}
                </thead>
                <tbody>
                    {[...collection.body.childNodes].map((ariaRow) => {
                        const row = getRowFromId(rows, ariaRow.key);

                        return (
                            <TableRow key={ariaRow.key} item={ariaRow} state={state}>
                                {[...ariaRow.childNodes].map((cell) =>
                                    cell.props.isSelectionCell ? (
                                        <TableCell
                                            key={cell.key}
                                            cell={cell}
                                            state={state}
                                            type={TableCellType.Checkbox}
                                        />
                                    ) : (
                                        <TableCell key={cell.key} cell={cell} state={state} />
                                    ),
                                )}
                                {row?.actionElements && (
                                    <td className="tw-sticky tw-right-0" data-test-id="table-actions">
                                        <div className="tw-float-right hover:tw-bg-gradient-to-r hover:tw-from-transparent hover:tw-to-black-0 dark:hover:tw-to-black-95 tw-py-4 tw-pr-8 tw-pl-4">
                                            {row.actionElements}
                                        </div>
                                    </td>
                                )}
                            </TableRow>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
