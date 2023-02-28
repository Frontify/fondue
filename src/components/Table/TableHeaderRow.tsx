/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode, useRef } from 'react';

type TableHeaderRowProps = {
    children: ReactNode;
};

export const TableHeaderRow = ({ children }: TableHeaderRowProps) => {
    const ref = useRef<HTMLTableRowElement | null>(null);

    return (
        <tr role="row" ref={ref} className="tw-py-4 tw-px-8 tw-sticky tw-top-0 tw-bg-base tw-z-10">
            {children}
        </tr>
    );
};
TableHeaderRow.displayName = 'FondueTableHeaderRow';
