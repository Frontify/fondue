/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import { useCheckbox } from "@react-aria/checkbox";
import { useTableColumnHeader, useTableSelectAllCheckbox } from "@react-aria/table";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { TableState } from "@react-stately/table";
import { useToggleState } from "@react-stately/toggle";
import React, { FC, useRef } from "react";

export enum TableColumnHeaderType {
    Default = "Default",
    SelectAll = "SelectAll",
}

export type TableColumnHeaderProps = {
    column: any;
    state: TableState<any>;
    type?: TableColumnHeaderType;
};

export const TableColumnHeader: FC<TableColumnHeaderProps> = ({
    column,
    state,
    type = TableColumnHeaderType.Default,
}) => {
    const ref = useRef<HTMLTableCellElement | null>(null);
    const { columnHeaderProps } = useTableColumnHeader({ node: column }, state, ref);
    const arrowIcon = state.sortDescriptor?.direction === "ascending" ? "up" : "down";

    if (type === TableColumnHeaderType.SelectAll) {
        const { checkboxProps } = useTableSelectAllCheckbox(state);
        const inputRef = useRef(null);
        const toggleState = useToggleState(checkboxProps);
        const { inputProps } = useCheckbox(checkboxProps, toggleState, inputRef);
        const headerProps = { ...columnHeaderProps, onClick: () => state.selectionManager.toggleSelectAll() };
        const { selectionManager } = state;

        const getCheckboxState = () => {
            if (selectionManager.isSelectAll) {
                return CheckboxState.Checked;
            }
            if (selectionManager.selectedKeys.size > 0) {
                return CheckboxState.Mixed;
            }
            return CheckboxState.Unchecked;
        };

        return (
            <th {...headerProps} ref={ref}>
                {selectionManager.selectionMode === "single" ? (
                    <VisuallyHidden>{inputProps["aria-label"]}</VisuallyHidden>
                ) : (
                    <Checkbox state={getCheckboxState()} />
                )}
            </th>
        );
    }

    return (
        <th {...columnHeaderProps} ref={ref}>
            {column.rendered}
            {column.props.allowsSorting && (
                <span
                    aria-hidden="true"
                    style={{
                        padding: "0 2px",
                        visibility: state.sortDescriptor?.column === column.key ? "visible" : "hidden",
                    }}
                >
                    {arrowIcon}
                </span>
            )}
        </th>
    );
};
