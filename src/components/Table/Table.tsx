/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useTable } from "@react-aria/table";
import {
    Cell,
    Column as AriaColumn,
    Row as AriaRow,
    TableBody,
    TableHeader,
    TableStateProps,
    useTableState,
} from "@react-stately/table";
import React, { FC, ReactNode, useRef } from "react";
import { TableCell, TableCellType } from "./TableCell";
import { TableColumnHeader, TableColumnHeaderType } from "./TableColumnHeader";
import { TableHeaderRow } from "./TableHeaderRow";
import { TableRow } from "./TableRow";

export enum SelectionMode {
    NoSelect = "none",
    SingleSelect = "single",
    MultiSelect = "multiple",
}

export type Column = {
    name: string;
    key: string;
};

export type Row = {
    id: string | number;
    [key: string]: ReactNode;
};

export type TableProps = {
    columns: Column[];
    rows: Row[];
    onSelectionChange: (ids?: (string | number)[]) => void;
    selectionMode?: SelectionMode;
    selectedRowIds?: (string | number)[];
};

/* react-aria hook props types are inexplicitly typed */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapToTableAriaProps = (columns: Column[], rows: Row[]): TableStateProps<any> => ({
    children: [
        <TableHeader key="table-header" columns={columns}>
            {(column) => <AriaColumn>{column.name}</AriaColumn>}
        </TableHeader>,
        <TableBody key="table-body" items={rows}>
            {(item) => (
                <AriaRow>{(columnKey) => <Cell key={`${item.id}-${columnKey}`}>{item[columnKey]}</Cell>}</AriaRow>
            )}
        </TableBody>,
    ],
});

const getAllRowIds = (rows: Row[]): (string | number)[] => rows.map(({ id }) => id);

export const Table: FC<TableProps> = ({
    columns,
    rows,
    onSelectionChange,
    selectionMode = SelectionMode.NoSelect,
    selectedRowIds = [],
}) => {
    const isSelectTable = selectionMode === SelectionMode.SingleSelect || selectionMode === SelectionMode.MultiSelect;
    const ref = useRef<HTMLTableElement | null>(null);
    const props = mapToTableAriaProps(columns, rows);
    const state = useTableState({
        ...props,
        selectionMode,
        onSelectionChange: (keys) => onSelectionChange(keys === "all" ? getAllRowIds(rows) : Array.from(keys)),
        defaultSelectedKeys: isSelectTable ? selectedRowIds : undefined,
        showSelectionCheckboxes: isSelectTable,
    });
    const { collection } = state;
    const { gridProps } = useTable({}, state, ref);

    return (
        <table
            {...gridProps}
            ref={ref}
            className="tw-border-collapse tw-table-auto tw-w-full tw-text-left dark:tw-bg-black-100 dark:tw-text-black-20"
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
                {[...collection.body.childNodes].map((row) => (
                    <TableRow key={row.key} item={row} state={state}>
                        {[...row.childNodes].map((cell) =>
                            cell.props.isSelectionCell ? (
                                <TableCell key={cell.key} cell={cell} state={state} type={TableCellType.Checkbox} />
                            ) : (
                                <TableCell key={cell.key} cell={cell} state={state} />
                            ),
                        )}
                    </TableRow>
                ))}
            </tbody>
        </table>
    );
};
