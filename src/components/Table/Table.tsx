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

export enum TableType {
    Default = "Default",
    SingleSelect = "SingleSelect",
    MultiSelect = "MultiSelect",
}

export type Column = {
    name: string;
    key: string;
};

export type Row = {
    id: number;
    [key: string]: ReactNode;
};

export type TableProps = {
    columns: Column[];
    rows: Row[];
    type?: TableType;
};

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

const getSelectionMode = (type: TableType) => {
    switch (type) {
        case TableType.SingleSelect:
            return "single";
        case TableType.MultiSelect:
            return "multiple";
        default:
            return "none";
    }
};

export const Table: FC<TableProps> = ({ columns, rows, type = TableType.Default }) => {
    const ref = useRef<HTMLTableElement | null>(null);
    const props = mapToTableAriaProps(columns, rows);
    const state = useTableState({
        ...props,
        selectionMode: getSelectionMode(type),
        showSelectionCheckboxes: type === TableType.SingleSelect || type === TableType.MultiSelect,
    });
    const { collection } = state;
    const { gridProps } = useTable({}, state, ref);

    return (
        <table {...gridProps} ref={ref}>
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
