/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import { useCheckbox } from "@react-aria/checkbox";
import { useTableCell, useTableSelectionCheckbox } from "@react-aria/table";
import { TableState } from "@react-stately/table";
import { useToggleState } from "@react-stately/toggle";
import { merge } from "@utilities/merge";
import React, { FC, useRef } from "react";

export enum TableCellType {
    Default = "Default",
    Checkbox = "Checkbox",
}

export type TableCellProps = {
    cell: any;
    state: TableState<any>;
    type?: TableCellType;
};

export const TableCell: FC<TableCellProps> = ({ cell, state, type = TableCellType.Default }) => {
    const ref = useRef<HTMLTableCellElement | null>(null);
    const { gridCellProps } = useTableCell({ node: cell }, state, ref);
    const { checkboxProps } = useTableSelectionCheckbox({ key: cell.parentKey }, state);
    const inputRef = useRef(null);
    const {
        inputProps: { checked },
    } = useCheckbox(checkboxProps, useToggleState(checkboxProps), inputRef);

    if (type === TableCellType.Checkbox) {
        return (
            <td
                {...gridCellProps}
                ref={ref}
                className={merge([
                    "tw-pl-8 tw-py-4 tw-pr-4 tw-border-l-4",
                    checked ? "tw-border-violet-60" : "tw-border-transparent",
                ])}
            >
                <Checkbox state={checked ? CheckboxState.Checked : CheckboxState.Unchecked} />
            </td>
        );
    }

    return (
        <td
            {...gridCellProps}
            ref={ref}
            className={merge([
                "tw-p-4 tw-outline-none tw-font-normal tw-text-xs",
                checked ? "tw-text-black-100 dark:tw-text-white" : "tw-text-black-80 dark:tw-text-black-20",
            ])}
        >
            {cell.rendered}
        </td>
    );
};
