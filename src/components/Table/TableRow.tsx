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
        <tr {...rowProps} ref={ref}>
            {children}
        </tr>
    );
};
