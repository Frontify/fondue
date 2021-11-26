import { useButton } from "@react-aria/button";
import { useDropIndicator, useDroppableCollection } from "@react-aria/dnd";
import { useFocusRing } from "@react-aria/focus";
import { useGrid, useGridRow, useGridCell } from "@react-aria/grid";
import { ListKeyboardDelegate } from "@react-aria/selection";
import { mergeProps, useId } from "@react-aria/utils";
import { useVisuallyHidden } from "@react-aria/visually-hidden";
import { Item } from "@react-stately/collections";
import {
    DraggableCollectionState,
    DroppableCollectionState,
    useDraggableCollectionState,
    useDroppableCollectionState,
} from "@react-stately/dnd";
import { GridCollection, useGridState, GridState } from "@react-stately/grid";
import { useListState } from "@react-stately/list";
import { Collection, DropTarget, ItemDropTarget } from "@react-types/shared";
import { FOCUS_STYLE } from "@utilities/focusStyle";
import React, { FC, ReactElement, useMemo, useRef, Key, RefObject, Fragment } from "react";
import { GridNode } from "@react-types/grid";
import { useDraggableItem } from "./useDraggableItem";
import { merge } from "@utilities/merge";

export type AcceptedItem<T = Record<string, unknown>> = T & {
    id: string;
    alt: string;
};

export type DragProperties = {
    componentDragState: DragState;
    isFocusVisible: boolean;
    isFocused: boolean;
};

type OrderableListProps = {
    items: AcceptedItem[];
    showFocusRing: boolean;
    dragDisabled: boolean;
    onMove: (selectedGridItemKeys: Key[], gridItemLocation: ItemDropTarget) => void;
    renderContent: (items: GridNode<AcceptedItem>, dragProperties: DragProperties) => ReactElement;
};

type OrderableListContainerProps = {
    items: AcceptedItem[];
    showFocusRing: boolean;
    dragDisabled: boolean;
    children: (item: AcceptedItem) => JSX.Element;
    onMove: (selectedGridItemKeys: Key[], gridItemLocation: ItemDropTarget) => void;
    renderContent: (items: GridNode<AcceptedItem>, isDragging: DragProperties) => ReactElement;
};

export const DragEventType = {
    keyboard: "keyboard",
    pointer: "mouse",
    virtual: "mouse",
};

export enum DragState {
    Dragging = "Dragging",
    Idle = "Idle",
    Preview = "Preview",
}

export const OrderableList: FC<OrderableListProps> = ({
    onMove,
    items,
    renderContent,
    dragDisabled,
    showFocusRing,
}) => {
    return (
        <OrderableListContainer
            onMove={onMove}
            showFocusRing={showFocusRing}
            renderContent={renderContent}
            items={items}
            dragDisabled={dragDisabled}
        >
            {(item) => (
                <Item textValue={item.alt}>
                    <></>
                </Item>
            )}
        </OrderableListContainer>
    );
};

export const OrderableListContainer: FC<OrderableListContainerProps> = (props) => {
    const gridRef = useRef<HTMLDivElement>(null);

    const state = useListState(props);
    const keyboardDelegate = new ListKeyboardDelegate(state.collection, new Set(), gridRef);

    const gridState = useGridState({
        selectionMode: "single",
        collection: new GridCollection<AcceptedItem>({
            columnCount: 1,
            items: [...state.collection].map((item) => ({
                ...item,
                childNodes: [
                    {
                        key: `cell-${item.key}`,
                        type: "cell",
                        index: 0,
                        value: item.value,
                        level: 0,
                        rendered: item.rendered,
                        textValue: item.textValue,
                        hasChildNodes: false,
                        childNodes: [],
                    },
                ],
            })),
        }),
    });

    const { gridProps } = useGrid(
        {
            "aria-label": "Reorderable list",
            focusMode: "cell",
        },
        gridState,
        gridRef,
    );

    // Use a random drag type so the items can only be reordered within this list and not dragged elsewhere.
    const dragType = useMemo(() => `keys-${Math.random().toString(36).slice(2)}`, []);
    const dragState = useDraggableCollectionState({
        collection: gridState.collection,
        selectionManager: gridState.selectionManager,
        getItems(keys) {
            return [...keys].map((key) => ({
                [dragType]: JSON.stringify(key),
            }));
        },
        renderPreview: ([key]) => {
            const item = gridState.collection.getItem(key);
            const dragContainerId = gridProps.id;
            const refWidth = document.querySelector(`[id="${dragContainerId}"] [data-key="${key}"]`)?.clientWidth;

            return (
                <div style={{ width: `${refWidth}px` || "100%" }}>
                    {props.renderContent(item, {
                        componentDragState: DragState.Preview,
                        isFocusVisible: false,
                        isFocused: false,
                    })}
                </div>
            );
        },
        onDragStart: (e) => {
            const [key] = e.keys;
            gridState.selectionManager.replaceSelection(key);
        },
    });
    const dropState = useDroppableCollectionState({
        collection: gridState.collection,
        selectionManager: gridState.selectionManager,
        getDropOperation(target) {
            const inCurrentPosition = (target: ItemDropTarget, collection: Collection<any>): boolean => {
                const { key, dropPosition } = target;
                let flagged = false;
                for (const item of collection) {
                    const beingDragged = dragState.isDragging(item.key);
                    if (beingDragged) {
                        if (dropPosition === "after" && key === item.prevKey) {
                            flagged = true;
                        } else if (dropPosition === "before" && key === item.nextKey) {
                            flagged = true;
                        } else if (key === item.key) {
                            flagged = true;
                        }
                        break;
                    } else {
                        continue;
                    }
                }
                return flagged;
            };

            if (
                target.type === "root" ||
                target.dropPosition === "on" ||
                inCurrentPosition(target, dragState.collection)
            ) {
                return "cancel";
            }

            return "move";
        },
    });

    const { collectionProps } = useDroppableCollection(
        {
            keyboardDelegate,
            onDrop: async (event) => {
                if (event.target.type !== "root" && event.target.dropPosition !== "on" && props.onMove) {
                    const keys = [];
                    for (const item of event.items) {
                        if (item.kind === "text" && item.types.has(dragType)) {
                            const key = JSON.parse(await item.getText(dragType));
                            keys.push(key);
                        }
                    }

                    props.onMove(keys, event.target);
                }
            },
            getDropTargetFromPoint(x, y) {
                if (gridRef.current) {
                    const rect = gridRef.current.getBoundingClientRect();
                    x += rect.x;
                    y += rect.y;
                    let closest = null;
                    let closestDistance = Infinity;
                    let closestDir = null;

                    for (const child of gridRef.current.children) {
                        if (!(child as HTMLElement).dataset.key) {
                            continue;
                        }

                        const childRect = child.getBoundingClientRect();
                        const points: [number, number, string][] = [
                            [childRect.left, childRect.top, "before"],
                            [childRect.right, childRect.top, "before"],
                            [childRect.left, childRect.bottom, "after"],
                            [childRect.right, childRect.bottom, "after"],
                        ];

                        for (const [px, py, dir] of points) {
                            const dx = px - x;
                            const dy = py - y;
                            const d = dx * dx + dy * dy;
                            if (d < closestDistance) {
                                closestDistance = d;
                                closest = child;
                                closestDir = dir;
                            }
                        }

                        if (y >= childRect.top + 10 && y <= childRect.bottom - 10) {
                            closestDir = "on";
                        }
                    }

                    const key = (closest as HTMLElement)?.dataset.key;

                    if (key) {
                        return {
                            type: "item",
                            key,
                            dropPosition: closestDir,
                        } as DropTarget;
                    }
                }

                return null;
            },
        },
        dropState,
        gridRef,
    );

    delete gridProps.onKeyDownCapture;

    return (
        <div {...mergeProps(collectionProps, gridProps)} ref={gridRef} style={{ outline: "none" }}>
            {[...gridState.collection].map((item) => (
                <Fragment key={item.key}>
                    <InsertionIndicator
                        key={`${item.key}-before`}
                        collectionRef={gridRef}
                        target={{ type: "item", key: item.key, dropPosition: "before" }}
                        dropState={dropState}
                    />
                    <CollectionItem
                        key={item.key}
                        dragDisabled={props.dragDisabled}
                        item={item}
                        showFocusRing={props.showFocusRing}
                        gridState={gridState}
                        dragState={dragState}
                        renderContent={props.renderContent}
                    />
                    {gridState.collection.getKeyAfter(item.key) == null && (
                        <InsertionIndicator
                            key={`${item.key}-after`}
                            target={{ type: "item", key: item.key, dropPosition: "after" }}
                            collectionRef={gridRef}
                            dropState={dropState}
                        />
                    )}
                </Fragment>
            ))}
        </div>
    );
};

type CollectionItemProps = {
    item: GridNode<AcceptedItem>;
    dragDisabled: boolean;
    gridState: GridState<Record<string, unknown>, GridCollection<AcceptedItem>>;
    showFocusRing: boolean;
    dragState: DraggableCollectionState;
    renderContent: (items: GridNode<AcceptedItem>, isDragging: DragProperties) => ReactElement;
};

const CollectionItem: FC<CollectionItemProps> = ({
    item,
    gridState,
    dragState,
    renderContent,
    dragDisabled,
    showFocusRing,
}) => {
    const rowRef = useRef<HTMLDivElement>(null);

    const { isFocusVisible, focusProps } = useFocusRing();

    const isFocused = gridState.selectionManager.isFocused && gridState.selectionManager.focusedKey === item.key;

    const cellRef = React.useRef(null);
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

    const dragButtonRef = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(
        {
            ...dragButtonProps,
            elementType: "div",
        },
        dragButtonRef,
    );
    const id = useId();

    const componentDragState = dragState.isDragging(item.key) ? DragState.Dragging : DragState.Idle;

    let gridRowProps = {};
    let gridCellProps: unknown = {};

    if (!dragDisabled) {
        gridRowProps = mergeProps(rowProps);
        gridCellProps = mergeProps(cellProps, dragProps, buttonProps, focusProps);
    }

    return (
        <div
            {...gridRowProps}
            ref={rowRef}
            style={{ outline: "none", zIndex: 1, position: "relative" }}
            aria-labelledby={id}
        >
            <div
                {...gridCellProps}
                className={merge([isFocusVisible && showFocusRing && FOCUS_STYLE])}
                ref={cellRef}
                style={{ outline: "none" }}
            >
                {renderContent(item, { componentDragState, isFocusVisible, isFocused })}
            </div>
        </div>
    );
};

type InsertionIndicatorProps = {
    key: string;
    collectionRef: RefObject<HTMLDivElement>;
    target: ItemDropTarget;
    dropState: DroppableCollectionState;
};

const InsertionIndicator: FC<InsertionIndicatorProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const { dropIndicatorProps } = useDropIndicator(props, props.dropState, ref);
    const { visuallyHiddenProps } = useVisuallyHidden();

    // If aria-hidden, we are either not in a drag session or the drop target is invalid.
    // In that case, there's no need to render anything at all unless we need to show the indicator visually.
    // This can happen when dragging using the native DnD API as opposed to keyboard dragging.
    if (!props.dropState.isDropTarget(props.target) && dropIndicatorProps["aria-hidden"]) {
        return null;
    }

    return (
        <div role="row" aria-hidden={dropIndicatorProps["aria-hidden"]} style={{ zIndex: 2, position: "relative" }}>
            <div
                role="gridcell"
                aria-selected="false"
                style={{
                    width: "100%",
                    marginLeft: 0,
                    height: 2,
                    marginBottom: -2,
                    outline: "none",
                }}
                className={props.dropState.isDropTarget(props.target) ? "tw-bg-violet-60" : ""}
            >
                <div {...visuallyHiddenProps} role="button" {...dropIndicatorProps} ref={ref} />
            </div>
        </div>
    );
};
