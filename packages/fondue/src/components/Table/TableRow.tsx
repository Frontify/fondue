/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode, useRef } from 'react';

export type TableRowProps = {
    isSelected?: boolean;
    children: ReactNode;
};

export const TableRow = ({ isSelected = false, children }: TableRowProps) => {
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
TableRow.displayName = 'FondueTableRow';
