/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFocusRing } from "@react-aria/focus";
import { useTableRow } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { TableState } from "@react-stately/table";
import { FOCUS_STYLE_INSET } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { FC, useRef } from "react";

export type TableRowProps = {
    item: any;
    state: TableState<any>;
};

export const TableRow: FC<TableRowProps> = ({ item, state, children }) => {
    const ref = useRef<HTMLTableRowElement | null>(null);
    const { rowProps } = useTableRow({ node: item }, state, ref);
    const { isFocusVisible, focusProps } = useFocusRing();

    return (
        <tr
            {...mergeProps(rowProps, focusProps)}
            ref={ref}
            className={merge([
                "tw-relative tw-border-t tw-border-black-10 hover:tw-bg-black-0 dark:tw-border-black-95 dark:hover:tw-bg-black-95",
                isFocusVisible && FOCUS_STYLE_INSET,
            ])}
            data-test-id="table-row"
        >
            {children}
        </tr>
    );
};
