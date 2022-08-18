import React, { FC, useRef } from 'react';

export const TableHeaderRow: FC = ({ children }) => {
    const ref = useRef<HTMLTableRowElement | null>(null);

    return (
        <tr role="row" ref={ref} className="tw-py-4 tw-px-8 tw-sticky tw-top-0 tw-bg-base tw-z-10">
            {children}
        </tr>
    );
};
