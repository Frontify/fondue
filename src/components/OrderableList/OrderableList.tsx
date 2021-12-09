/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDroppableCollection } from "@react-aria/dnd";
import { useGrid } from "@react-aria/grid";
import { ListKeyboardDelegate } from "@react-aria/selection";
import { mergeProps } from "@react-aria/utils";
import { Item } from "@react-stately/collections";
import { useDraggableCollectionState, useDroppableCollectionState } from "@react-stately/dnd";
import { GridCollection, useGridState } from "@react-stately/grid";
import { useListState } from "@react-stately/list";
import { DropTarget, ItemDropTarget } from "@react-types/shared";
import React, { useRef } from "react";
import { GridNode } from "@react-types/grid";
import { InsertionIndicator } from "./InsertionIndicator";
import { CollectionItem } from "./CollectionItem";
import { ItemDragState, OrderableListItem, OrderableListProps } from "./types";
import { useMemoizedId } from "@hooks/useMemoizedId";

export const OrderableList = <T extends object>({
    onMove,
    dragDisabled,
    renderContent,
    items,
    disableTypeAhead,
}: OrderableListProps<T>) => {
    const gridRef = useRef<HTMLDivElement | null>(null);

    const state = useListState({
        children: (item: OrderableListItem<T>) => (
            <Item textValue={item.alt}>
                <></>
            </Item>
        ),
        items,
    });
    const keyboardDelegate = new ListKeyboardDelegate(state.collection, new Set(), gridRef);

    const gridState = useGridState({
        selectionMode: "single",
        collection: new GridCollection<OrderableListItem<T>>({
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
    const dragTypeId = useMemoizedId();
    const dragState = useDraggableCollectionState({
        collection: gridState.collection,
        selectionManager: gridState.selectionManager,
        getItems(keys) {
            return [...keys].map((key) => ({
                [dragTypeId]: JSON.stringify(key),
            }));
        },
        renderPreview: ([key]) => {
            const item = gridState.collection.getItem(key);
            const dragContainerId = gridProps.id;
            const refWidth = document.querySelector(`[id="${dragContainerId}"] [data-key="${key}"]`)?.clientWidth;

            return (
                <div style={{ width: `${refWidth}px` || "100%" }} data-test-id="drag-preview">
                    {renderContent(item, {
                        componentDragState: ItemDragState.Preview,
                        isFocusVisible: false,
                    })}
                </div>
            );
        },
        onDragStart: (event) => {
            const [key] = event.keys;
            gridState.selectionManager.replaceSelection(key);
        },
    });
    const dropState = useDroppableCollectionState({
        collection: gridState.collection,
        selectionManager: gridState.selectionManager,
        getDropOperation(target) {
            const inCurrentPosition = (
                target: ItemDropTarget,
                collection: GridCollection<GridNode<OrderableListItem<T>>>,
            ): boolean => {
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
                inCurrentPosition(target, dragState.collection as GridCollection<GridNode<OrderableListItem<T>>>)
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
                if (event.target.type !== "root" && event.target.dropPosition !== "on" && onMove) {
                    const keys = [];
                    for (const item of event.items) {
                        if (item.kind === "text" && item.types.has(dragTypeId)) {
                            const key = JSON.parse(await item.getText(dragTypeId));
                            keys.push(key);
                        }
                    }

                    onMove(keys, event.target);
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

<<<<<<< HEAD
    // Typeahead must be disabled if list item contains a contenteditable or text input element.
=======
    //Typeahead must be disabled if list item contains a contenteditable or text input element.
>>>>>>> 2c0c0c592d43d28dda067826563c0b8a2422f9d4
    if (disableTypeAhead) {
        delete gridProps.onKeyDownCapture;
    }

    return (
        <div
            {...mergeProps(collectionProps, gridProps)}
            ref={gridRef}
            className="tw-outline-none"
            data-test-id="orderable-list"
        >
            {[...gridState.collection].map((item) => (
                <>
                    <InsertionIndicator
                        key={`${item.key}-before`}
                        collectionRef={gridRef}
                        target={{ type: "item", key: item.key, dropPosition: "before" }}
                        dropState={dropState}
                    />
                    <CollectionItem
                        key={item.key}
                        dragDisabled={dragDisabled}
                        item={item}
                        gridState={gridState}
                        dragState={dragState}
                        renderContent={renderContent}
                    />
                    {gridState.collection.getKeyAfter(item.key) === null && (
                        <InsertionIndicator
                            key={`${item.key}-after`}
                            target={{ type: "item", key: item.key, dropPosition: "after" }}
                            collectionRef={gridRef}
                            dropState={dropState}
                        />
                    )}
                </>
            ))}
        </div>
    );
};
