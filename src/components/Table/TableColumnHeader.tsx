/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, CheckboxState } from '@components/Checkbox/Checkbox';
import { IconSize } from '@foundation/Icon/IconSize';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { Key, cloneElement, useEffect, useRef, useState } from 'react';
import { IconArrowBidirectional, IconArrowDown, IconArrowUp } from '@foundation/Icon';
import { SelectionMode, SortDirection } from '..';

export enum TableColumnHeaderType {
    Default = 'Default',
    SelectAll = 'SelectAll',
}

export type TableColumnHeaderProps = {
    column: any;
    type?: TableColumnHeaderType;
    rowIds: Key[];
    sortDirection?: SortDirection;
    selectionMode: string;
    isColumnSorted?: boolean;
    handleSortChange: (column: string, direction?: SortDirection) => void;
    setSelectedRows?: (ids?: Key[]) => void;
};

export const TableColumnHeader = ({
    column,
    type = TableColumnHeaderType.Default,
    rowIds,
    sortDirection,
    selectionMode,
    isColumnSorted = false,
    handleSortChange,
    setSelectedRows,
}: TableColumnHeaderProps) => {
    const {
        key,
        rendered,
        props: { allowsSorting },
    } = column;
    const [icon, setIcon] = useState(<IconArrowBidirectional />);
    const [isChecked, setIsChecked] = useState(false);
    const ref = useRef<HTMLTableCellElement | null>(null);
    const ButtonOrSpan = allowsSorting ? 'button' : 'span';

    useEffect(() => {
        if (isColumnSorted) {
            setIcon(sortDirection === SortDirection.Descending ? <IconArrowDown /> : <IconArrowUp />);
        } else {
            setIcon(<IconArrowBidirectional />);
        }
    }, [isColumnSorted, sortDirection]);

    if (type === TableColumnHeaderType.SelectAll) {
        const ariaProps = {
            'aria-label': 'Select all',
            scope: 'col',
        };

        const checkboxState = isChecked ? CheckboxState.Checked : CheckboxState.Unchecked;

        const handleChange = () => {
            if (!setSelectedRows) {
                return;
            }

            if (isChecked) {
                setSelectedRows([]);
            } else {
                setSelectedRows(rowIds);
            }

            setIsChecked((checked) => !checked);
        };

        return (
            <th
                {...ariaProps}
                ref={ref}
                className="tw-pl-8 tw-py-3 tw-pr-4 tw-w-16 tw-border-l-4 tw-border-transparent tw-group tw-outline-none"
                data-test-id="table-select-cell"
            >
                {selectionMode === SelectionMode.SingleSelect ? (
                    <span className="tw-sr-only">{ariaProps['aria-label']}</span>
                ) : (
                    <Checkbox value={key} ariaLabel={key} state={checkboxState} onChange={handleChange} />
                )}
            </th>
        );
    }

    return (
        <th
            ref={ref}
            className={merge([
                'tw-text-xs tw-font-medium tw-text-black-100 dark:tw-text-white tw-px-4 tw-py-3 tw-outline-none tw-group focus-visible:bg-violet-90',
                allowsSorting ? 'tw-cursor-pointer' : '',
            ])}
            data-test-id="table-column"
            scope="col"
            onClick={allowsSorting ? () => handleSortChange(column.key, sortDirection) : () => null}
        >
            <ButtonOrSpan
                className={merge([
                    'tw-flex tw-gap-x-1 tw-items-center',
                    FOCUS_VISIBLE_STYLE,
                    allowsSorting ? 'tw-cursor-pointer' : 'tw-cursor-default',
                ])}
            >
                {rendered}
                {allowsSorting && (
                    <span
                        aria-hidden="true"
                        className={
                            isColumnSorted
                                ? 'tw-text-violet-50'
                                : 'tw-text-black-40 dark:tw-text-black-60 group-hover:tw-text-black-100 dark:group-hover:tw-text-white'
                        }
                    >
                        {cloneElement(icon, { size: IconSize.Size12 })}
                    </span>
                )}
            </ButtonOrSpan>
        </th>
    );
};
TableColumnHeader.displayName = 'FondueTableColumnHeader';
