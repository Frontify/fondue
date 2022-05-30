/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTableHeaderRow } from '@react-aria/table';
import { TableState } from '@react-stately/table';
import React, { FC, useRef } from 'react';

export type TableHeaderRowProps = {
    item: any;
    state: TableState<any>;
};

export const TableHeaderRow: FC<TableHeaderRowProps> = ({ item, state, children }) => {
    const ref = useRef<HTMLTableRowElement | null>(null);
    const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

    return (
        <tr {...rowProps} ref={ref} className="tw-py-4 tw-px-8">
            {children}
        </tr>
    );
};
