/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Item } from "@react-stately/collections";
import { Cell, Column, Row, TableBody, TableHeader, useTableState } from "@react-stately/table";
import React, { FC, ReactNode } from "react";
import { TableCell, TableCellType } from "./TableCell";
import { TableColumnHeader, TableColumnHeaderType } from "./TableColumnHeader";
import { TableHeaderRow } from "./TableHeaderRow";
import { TableRow } from "./TableRow";

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
};

const mapToTableAriaProps = (columns: Column[], rows: Row[]) => ({
    children: [
        <Item key="table-header">
            <TableHeader columns={columns}>
                {columns.map(({ name, key }) => (
                    <Column key={key}>{name}</Column>
                ))}
            </TableHeader>
        </Item>,
        <Item key="table-body">
            <TableBody items={rows}>
                {rows.map(({ id, value }) => (
                    <Row key={id}>
                        <Cell>{value}</Cell>
                    </Row>
                ))}
            </TableBody>
        </Item>,
    ],
});

export const Table: FC<TableProps> = ({ columns, rows }) => {
    const props = mapToTableAriaProps(columns, rows);
    const state = useTableState(props);
    const { collection } = state;

    return (
        <table>
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
