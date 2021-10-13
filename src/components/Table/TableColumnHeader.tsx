/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, CheckboxState } from "@elements/Checkbox/Checkbox";
import IconArrowDown from "@elements/Icon/Generated/IconArrowDown";
import IconArrowUp from "@elements/Icon/Generated/IconArrowUp";
import IconArrowUpAndDown from "@elements/Icon/Generated/IconArrowUpAndDown";
import { IconSize } from "@elements/Icon/IconSize";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
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
    const [icon, setIcon] = useState(<IconArrowUpAndDown />);
    const ref = useRef<HTMLTableCellElement | null>(null);
    const { columnHeaderProps } = useTableColumnHeader({ node: column }, state, ref);
    const isSortedColumn = state.sortDescriptor?.column === column.key;
    const isAscending = state.sortDescriptor?.direction === "ascending";
    const { isFocusVisible, focusProps } = useFocusRing();

    const { hoverProps } = useHover({
        onHoverStart: () => {
            if (isSortedColumn) {
                setIcon(isAscending ? <IconArrowDown /> : <IconArrowUp />);
            } else {
                setIcon(<IconArrowDown />);
            }
        },
        onHoverEnd: () => {
            if (isSortedColumn) {
                setIcon(isAscending ? <IconArrowUp /> : <IconArrowDown />);
            } else {
                setIcon(<IconArrowUpAndDown />);
            }
        },
    });

    useEffect(() => {
        if (!isSortedColumn) {
            setIcon(<IconArrowUpAndDown />);
        }
    }, [isSortedColumn]);

    if (type === TableColumnHeaderType.SelectAll) {
        const { checkboxProps } = useTableSelectAllCheckbox(state);
        const { selectionManager } = state;
        const inputRef = useRef(null);
        const toggleState = useToggleState(checkboxProps);
        const { inputProps } = useCheckbox(checkboxProps, toggleState, inputRef);
        const headerProps = { ...columnHeaderProps, onClick: () => selectionManager.toggleSelectAll() };
        const selectedKeyCount = selectionManager.selectedKeys.size;

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
                className="tw-pl-8 tw-py-3 tw-pr-4 tw-w-16 tw-border-l-4 tw-border-transparent tw-cursor-pointer tw-group"
                data-test-id="table-select-cell"
            >
                {selectionManager.selectionMode === "single" ? (
                    <VisuallyHidden>{inputProps["aria-label"]}</VisuallyHidden>
                ) : (
                    <Checkbox ariaLabel={column.key} state={getCheckboxState()} />
                )}
            </th>
        );
    }

    return (
        <th
            {...mergeProps(columnHeaderProps, hoverProps, focusProps)}
            ref={ref}
            className={merge([
                "tw-text-xs tw-font-medium tw-text-black-100 dark:tw-text-white tw-px-4 tw-py-3 tw-border-r tw-border-black-10 dark:tw-border-black-95 tw-outline-none tw-cursor-pointer tw-group",
                isFocusVisible && FOCUS_STYLE,
            ])}
            data-test-id="table-column"
        >
            <div className="tw-flex tw-gap-x-1 tw-items-center">
                {column.rendered}
                {column.props.allowsSorting && (
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
