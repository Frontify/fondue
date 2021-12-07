/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { useGridRow, useGridCell } from "@react-aria/grid";
import { mergeProps, useId } from "@react-aria/utils";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import React, { HTMLAttributes, useRef } from "react";
import { useDraggableItem } from "./useDraggableItem";
import { merge } from "@utilities/merge";
import { CollectionItemProps, ItemDragState } from "./types";

export const CollectionItem = <T extends object>({
    item,
    gridState,
    dragState,
    renderContent,
    dragDisabled,
}: CollectionItemProps<T>) => {
    const rowRef = useRef<HTMLDivElement | null>(null);

    const { isFocusVisible, focusProps } = useFocusRing();

    const cellRef = useRef<HTMLDivElement | null>(null);
    const cellNode = [...item.childNodes][0];
    const { gridCellProps: cellProps } = useGridCell(
        {
            node: cellNode,
            focusMode: "cell",
        },
        gridState,
        cellRef,
    );

    const { rowProps } = useGridRow({ node: item }, gridState, rowRef);
    const { dragProps, dragButtonProps } = useDraggableItem({ key: item.key }, dragState);

    const dragButtonRef = useRef<HTMLButtonElement | null>(null);
    const { buttonProps } = useButton(
        {
            ...dragButtonProps,
            elementType: "div",
        },
        dragButtonRef,
    );
    const id = useId();

    const componentDragState = dragState.isDragging(item.key) ? ItemDragState.Dragging : ItemDragState.Idle;

    const { onKeyDownCapture, ...restOfCellProps } = cellProps;
    const cellPropsWithKeyDown = { ...restOfCellProps, onKeyDown: onKeyDownCapture };

    const gridCellProps: HTMLAttributes<HTMLDivElement> = dragDisabled
        ? mergeProps(cellPropsWithKeyDown, focusProps)
        : mergeProps(cellPropsWithKeyDown, dragProps, buttonProps, focusProps);

    return (
        <div
            {...rowProps}
            ref={rowRef}
            className={merge(["tw-relative tw-outline-none", isFocusVisible ? "tw-z-30" : "tw-z-0"])}
            aria-labelledby={id}
            data-test-id="orderable-list-item"
        >
            <div
                {...gridCellProps}
                aria-disabled={dragDisabled}
                className={merge(["tw-outline-none", isFocusVisible && FOCUS_STYLE])}
                ref={cellRef}
                data-test-id="draggable-item"
            >
                {renderContent(item, { componentDragState, isFocusVisible })}
            </div>
        </div>
    );
};
