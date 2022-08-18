import React, { FC, useRef } from 'react';

export type TableRowProps = {
    isSelected?: boolean;
};

export const TableRow: FC<TableRowProps> = ({ isSelected = false, children }) => {
    const ref = useRef<HTMLTableRowElement | null>(null);

    const ariaProps = {
        'aria-selected': isSelected,
        role: 'row',
    };

    return (
        <tr
            {...ariaProps}
            ref={ref}
            className="tw-relative tw-border-t tw-border-black-10 hover:tw-bg-black-0 dark:tw-border-black-95 dark:hover:tw-bg-black-95"
            data-test-id="table-row"
        >
            {children}
        </tr>
    );
};
