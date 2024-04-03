/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Cell as AriaCell,
    Column as AriaColumn,
    Row as AriaRow,
    TableBody,
    TableHeader,
    type TableStateProps,
    useTableState,
} from '@react-stately/table';
import { type Key, type ReactNode, useRef, useState } from 'react';

import { TableCell, TableCellType } from './TableCell';
import { TableColumnHeader, TableColumnHeaderType } from './TableColumnHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';

export enum SelectionMode {
    NoSelect = 'none',
    SingleSelect = 'single',
    MultiSelect = 'multiple',
}

export type Cell = {
    sortId: string | number;
    value: ReactNode;
    ariaLabel?: string;
};

export type Column = {
    name: string;
    key: string;
    sortable?: boolean;
};

export type Row = {
    key: Key;
    // cell keys have to correspond to column key values
    // e.g. Column { name: 'User', key: 'user' } ==> Row Cell { user: { id: 'anna', value: 'Anna' } }
    cells: Record<string, Cell>;
    actionElements?: ReactNode;
};

export type TableProps = {
    columns: Column[];
    rows: Row[];
    onSelectionChange?: (ids?: Key[]) => void;
    onSortChange?: (column: string, direction?: SortDirection) => void;
    selectionMode?: SelectionMode;
    selectedRowIds?: Key[];
    ariaLabel?: string;
    children?: ReactNode;
};

export enum SortDirection {
    Ascending = 'ascending',
    Descending = 'descending',
}

const DEFAULT_SORT_ORDER = SortDirection.Descending;

type SortType = {
    sortedColumnKey?: string;
    sortOrder?: SortDirection;
};

/* react-aria hook props types are inexplicitly typed */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapToTableAriaProps = (columns: Column[], rows: Row[], hasSort = false): TableStateProps<any> => {
    return {
        children: [
            <TableHeader key="table-header" columns={columns}>
                {(column) => {
                    const allowsSorting = !!(column.sortable && hasSort);
                    return <AriaColumn allowsSorting={allowsSorting}>{column.name}</AriaColumn>;
                }}
            </TableHeader>,
            <TableBody key="table-body" items={rows}>
                {(item) => (
                    <AriaRow>
                        {(columnKey) => (
                            <AriaCell
                                key={`${item.key}-${columnKey}`}
                                aria-label={item.cells[columnKey as string].ariaLabel}
                            >
                                {item.cells[columnKey as string].value}
                            </AriaCell>
                        )}
                    </AriaRow>
                )}
            </TableBody>,
        ],
    };
};

const getRowFromId = (rows: Row[], id: Key) => rows.find(({ key }) => key === id) || null;

const getAllRowIds = (rows: Row[]): Key[] => rows.map(({ key: id }) => id);

export const Table = ({
    columns,
    rows,
    onSelectionChange,
    selectionMode = SelectionMode.NoSelect,
    onSortChange: onSort,
    selectedRowIds = [],
    ariaLabel = 'Table',
}: TableProps) => {
    const isSelectTable = selectionMode === SelectionMode.SingleSelect || selectionMode === SelectionMode.MultiSelect;
    const [{ sortedColumnKey, sortOrder }, setSortedColumn] = useState<SortType>({
        sortedColumnKey: undefined,
        sortOrder: undefined,
    });

    const onSortChange = (column: string, direction?: SortDirection) => {
        const inverseSortDirection =
            direction === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending;
        setSortedColumn({
            sortedColumnKey: column,
            sortOrder: sortedColumnKey !== column ? DEFAULT_SORT_ORDER : inverseSortDirection,
        });
        onSort?.(column, direction);
    };

    const rowIds = getAllRowIds(rows);
    const ref = useRef<HTMLTableElement | null>(null);
    const props = mapToTableAriaProps(columns, rows, !!onSort);
    const state = useTableState({
        ...props,
        selectionMode,
        showSelectionCheckboxes: isSelectTable,
    });
    const { collection } = state;

    return (
        <div className="tw-w-full tw-max-h-96 sm:tw-max-h-full">
            <table
                aria-label={ariaLabel}
                ref={ref}
                className="tw-border-collapse tw-table-auto tw-w-full tw-min-w-max tw-text-left dark:tw-bg-black-100 dark:tw-text-black-20"
            >
                <thead>
                    {collection.headerRows.map((headerRow) => (
                        <TableHeaderRow key={headerRow.key}>
                            {[...headerRow.childNodes].map((column) => {
                                const headerType = column.props.isSelectionCell
                                    ? TableColumnHeaderType.SelectAll
                                    : TableColumnHeaderType.Default;

                                return (
                                    <TableColumnHeader
                                        key={column.key}
                                        column={column}
                                        type={headerType}
                                        rowIds={rowIds}
                                        sortDirection={sortOrder}
                                        selectionMode={selectionMode}
                                        isColumnSorted={sortedColumnKey === column.key}
                                        handleSortChange={onSortChange}
                                        setSelectedRows={onSelectionChange}
                                    />
                                );
                            })}
                            <td />
                        </TableHeaderRow>
                    ))}
                </thead>
                <tbody className="tw-relative tw-z-[-1] sm:tw-z-auto">
                    {[...collection.body.childNodes].map((ariaRow) => {
                        const row = getRowFromId(rows, ariaRow.key);

                        return (
                            <TableRow key={ariaRow.key} isSelected={selectedRowIds.includes(ariaRow.key)}>
                                {[...ariaRow.childNodes].map((cell) => {
                                    const cellType = cell.props.isSelectionCell
                                        ? TableCellType.Checkbox
                                        : TableCellType.Default;
                                    return (
                                        <TableCell
                                            key={cell.key}
                                            cell={cell}
                                            selectionMode={selectionMode}
                                            type={cellType}
                                            isChecked={selectedRowIds.includes(ariaRow.key)}
                                            selectedRows={selectedRowIds}
                                            setSelectedRows={onSelectionChange}
                                        />
                                    );
                                })}
                                {row?.actionElements && (
                                    <td className="tw-sticky tw-right-0 tw-z-10" data-test-id="table-actions">
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
Table.displayName = 'FondueTable';
