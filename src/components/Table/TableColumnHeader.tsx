/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, CheckboxState } from '@components/Checkbox/Checkbox';
import { IconSize } from '@foundation/Icon/IconSize';
import { FOCUS_VISIBLE_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import React, { FC, Key, cloneElement, useEffect, useRef, useState } from 'react';
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
    handleSortChange: (column: Key, direction: SortDirection) => void;
    setSelectedRows?: (ids?: Key[]) => void;
};

export const TableColumnHeader: FC<TableColumnHeaderProps> = ({
    column,
    type = TableColumnHeaderType.Default,
    rowIds,
    sortDirection,
    selectionMode,
    isColumnSorted = false,
    handleSortChange,
    setSelectedRows,
}) => {
    const {
        key,
        rendered,
        props: { allowsSorting },
    } = column;
    const [icon, setIcon] = useState(<IconArrowBidirectional />);
    const [isChecked, setIsChecked] = useState(false);
    const ref = useRef<HTMLTableCellElement | null>(null);
    const inverseSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';

    useEffect(() => {
        if (isColumnSorted) {
            setIcon(sortDirection === 'descending' ? <IconArrowDown /> : <IconArrowUp />);
        } else {
            setIcon(<IconArrowBidirectional />);
        }
    }, [isColumnSorted, sortDirection]);

    if (type === TableColumnHeaderType.SelectAll) {
        const ariaProps = {
            'aria-checked': isChecked,
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
            className="tw-text-xs tw-font-medium tw-text-black-100 dark:tw-text-white tw-px-4 tw-py-3 tw-outline-none tw-cursor-pointer tw-group focus-visible:bg-violet-90"
            data-test-id="table-column"
            scope="col"
            onClick={() => handleSortChange(column.key, inverseSortDirection)}
        >
            <button className={merge(['tw-flex tw-gap-x-1 tw-items-center', FOCUS_VISIBLE_STYLE])}>
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
            </button>
        </th>
    );
};
