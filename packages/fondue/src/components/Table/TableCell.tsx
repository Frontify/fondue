/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Key, useRef } from 'react';

import { Checkbox as CheckboxComponent, CheckboxState } from '@components/Checkbox/Checkbox';
import { merge } from '@utilities/merge';

import { type ColumnAlign, SelectionMode } from './Table';

export enum TableCellType {
    Default = 'Default',
    Checkbox = 'Checkbox',
}

export type TableCellProps = {
    cell: any;
    selectionMode: string;
    type?: TableCellType;
    isChecked?: boolean;
    selectedRows: Key[];
    setSelectedRows?: (ids?: Key[]) => void;
    align?: ColumnAlign;
};

export const TableCell = ({
    cell,
    selectionMode,
    type = TableCellType.Default,
    isChecked = false,
    selectedRows,
    setSelectedRows,
    align = 'left',
}: TableCellProps) => {
    const ref = useRef<HTMLTableCellElement | null>(null);

    if (type === TableCellType.Checkbox) {
        const { key } = cell;
        const handleChange = () => {
            if (!setSelectedRows) {
                return;
            }

            if (isChecked) {
                const filteredRows = selectedRows.filter((row) => row !== cell.parentKey);
                setSelectedRows(filteredRows);
                return;
            }

            const rowsToSelect =
                // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                selectionMode === SelectionMode.SingleSelect ? [cell.parentKey] : [...selectedRows, cell.parentKey];
            setSelectedRows(rowsToSelect);
        };

        return (
            <td
                ref={ref}
                className={merge([
                    'tw-pl-8 tw-py-4 tw-pr-4 tw-relative after:tw-absolute after:tw-left-0 after:tw-top-[-1px] after:tw-bottom-[-1px] after:tw-w-1',
                    isChecked ? 'after:tw-bg-box-selected-strong' : 'after:tw-bg-transparent',
                ])}
                data-test-id="table-select-cell"
            >
                <CheckboxComponent
                    value={key}
                    aria-label={cell['aria-label'] || key}
                    state={isChecked ? CheckboxState.Checked : CheckboxState.Unchecked}
                    onChange={handleChange}
                />
            </td>
        );
    }

    return (
        <td
            ref={ref}
            className={merge([
                'tw-p-4 tw-font-normal tw-text-xs focus:tw-outline-none',
                isChecked ? 'tw-text-black-100 dark:tw-text-white' : 'tw-text-black-80 dark:tw-text-black-20',
            ])}
        >
            <div className={merge(['tw-flex', align === 'right' && 'tw-w-full tw-justify-end'])}>{cell.rendered}</div>
        </td>
    );
};
TableCell.displayName = 'FondueTableCell';
