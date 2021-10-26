/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, CheckboxState } from "@components/Checkbox/Checkbox";
import IconArrowDown from "src/foundation/Icon/Generated/IconArrowDown";
import IconArrowUp from "src/foundation/Icon/Generated/IconArrowUp";
import IconArrowUpAndDown from "src/foundation/Icon/Generated/IconArrowUpAndDown";
import { IconSize } from "src/foundation/Icon/IconSize";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { useTableColumnHeader, useTableSelectAllCheckbox } from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { TableState } from "@react-stately/table";
import { useToggleState } from "@react-stately/toggle";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import { merge } from "@utilities/merge";
import React, { cloneElement, FC, useCallback, useEffect, useRef, useState } from "react";

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
    const {
        key,
        rendered,
        props: { allowsSorting },
    } = column;
    const [icon, setIcon] = useState(<IconArrowUpAndDown />);
    const ref = useRef<HTMLTableCellElement | null>(null);
    const { columnHeaderProps } = useTableColumnHeader({ node: column }, state, ref);
    const isSortedColumn = state.sortDescriptor?.column === key;
    const sortDirection = state.sortDescriptor?.direction;
    const { isFocusVisible, focusProps } = useFocusRing();

    useEffect(() => {
        if (isSortedColumn) {
            setIcon(sortDirection === "descending" ? <IconArrowDown /> : <IconArrowUp />);
        } else {
            setIcon(<IconArrowUpAndDown />);
        }
    }, [isSortedColumn, sortDirection]);

    if (type === TableColumnHeaderType.SelectAll) {
        const { checkboxProps } = useTableSelectAllCheckbox(state);
        const {
            selectionManager: { toggleSelectAll, selectedKeys, selectionMode },
        } = state;
        const inputRef = useRef(null);
        const toggleState = useToggleState(checkboxProps);
        const { inputProps } = useCheckbox(checkboxProps, toggleState, inputRef);
        const headerProps = { ...columnHeaderProps, onClick: () => toggleSelectAll() };
        const selectedKeyCount = selectedKeys.size;

        const getCheckboxState = useCallback(() => {
            if (selectedKeyCount === state.collection.size) {
                return CheckboxState.Checked;
            }
            if (selectedKeyCount > 0) {
                return CheckboxState.Mixed;
            }
            return CheckboxState.Unchecked;
        }, [selectedKeyCount]);

        return (
            <th
                {...headerProps}
                ref={ref}
                className={merge([
                    "tw-pl-8 tw-py-3 tw-pr-4 tw-w-16 tw-border-l-4 tw-border-transparent tw-group tw-outline-none",
                    selectionMode === "multiple" && "tw-cursor-pointer",
                ])}
                data-test-id="table-select-cell"
            >
                {selectionMode === "single" ? (
                    <VisuallyHidden>{inputProps["aria-label"]}</VisuallyHidden>
                ) : (
                    <Checkbox value={key} ariaLabel={key} state={getCheckboxState()} />
                )}
            </th>
        );
    }

    return (
        <th
            {...mergeProps(columnHeaderProps, focusProps)}
            ref={ref}
            className={merge([
                "tw-text-xs tw-font-medium tw-text-black-100 dark:tw-text-white tw-px-4 tw-py-3 tw-outline-none tw-cursor-pointer tw-group",
                isFocusVisible && FOCUS_STYLE,
            ])}
            data-test-id="table-column"
        >
            <div className="tw-flex tw-gap-x-1 tw-items-center">
                {rendered}
                {allowsSorting && (
                    <span
                        aria-hidden="true"
                        className={
                            isSortedColumn
                                ? "tw-text-violet-50"
                                : "tw-text-black-40 dark:tw-text-black-60 group-hover:tw-text-black-100 dark:group-hover:tw-text-white"
                        }
                    >
                        {cloneElement(icon, { size: IconSize.Size12 })}
                    </span>
                )}
            </div>
        </th>
    );
};
