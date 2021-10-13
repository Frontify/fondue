/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { useTableCell, useTableSelectionCheckbox } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { TableState } from "@react-stately/table";
import { useToggleState } from "@react-stately/toggle";
import { FOCUS_STYLE_INSET } from "@utilities/focusStyle";
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
    const { isFocusVisible, focusProps } = useFocusRing();

    if (type === TableCellType.Checkbox) {
        return (
            <td
                {...gridCellProps}
                ref={ref}
                className={merge([
                    "tw-pl-8 tw-py-4 tw-pr-4 tw-border-l-4",
                    checked ? "tw-border-violet-60" : "tw-border-transparent",
                ])}
                data-test-id="table-select-cell"
            >
                <Checkbox
                    ariaLabel={cell["aria-label"] || cell.key}
                    state={checked ? CheckboxState.Checked : CheckboxState.Unchecked}
                />
            </td>
        );
    }

    return (
        <td
            {...mergeProps(gridCellProps, focusProps)}
            ref={ref}
            className={merge([
                "tw-p-4 tw-font-normal tw-text-xs focus:tw-outline-none",
                checked ? "tw-text-black-100 dark:tw-text-white" : "tw-text-black-80 dark:tw-text-black-20",
                isFocusVisible && FOCUS_STYLE_INSET,
            ])}
        >
            {cell.rendered}
        </td>
    );
};
