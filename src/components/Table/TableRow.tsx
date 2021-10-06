/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTableRow } from "@react-aria/table";
import { TableState } from "@react-stately/table";
import React, { FC, useRef } from "react";

export type TableRowProps = {
    item: any;
    state: TableState<any>;
};

export const TableRow: FC<TableRowProps> = ({ item, state, children }) => {
    const ref = useRef<HTMLTableRowElement | null>(null);
    const { rowProps } = useTableRow({ node: item }, state, ref);

    return (
        <tr
            {...rowProps}
            ref={ref}
            className="tw-border-t tw-border-black-10 hover:tw-bg-black-0 dark:tw-border-black-95 dark:hover:tw-bg-black-95"
        >
            {children}
        </tr>
    );
};
