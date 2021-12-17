/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DraggableCollectionState, DroppableCollectionState } from "@react-stately/dnd";
import { Key, ReactElement, RefObject } from "react";
import { GridNode } from "@react-types/grid";
import { GridCollection, GridState } from "@react-stately/grid";
import { ItemDropTarget } from "@react-types/shared";

export type RenderListItem<T> = (items: GridNode<OrderableListItem<T>>, dragProps: DragProperties) => ReactElement;

export type CollectionItemProps<T> = {
    item: GridNode<OrderableListItem<T>>;
    dragDisabled: boolean;
    gridState: GridState<T, GridCollection<OrderableListItem<T>>>;
    dragState: DraggableCollectionState;
    renderContent: RenderListItem<T>;
};

export type OrderableListItem<T = Record<string, unknown>> = T & {
    id: string;
    alt: string;
};

export type DragProperties = {
    componentDragState: ItemDragState;
    isFocusVisible: boolean;
};

export type OrderableListProps<T> = {
    items: OrderableListItem<T>[];
    dragDisabled: boolean;
    disableTypeAhead?: boolean;
    onMove: (selectedGridItemKeys: Key[], gridItemLocation: ItemDropTarget) => void;
    renderContent: RenderListItem<T>;
};

export enum ItemDragState {
    Dragging = "Dragging",
    Idle = "Idle",
    Preview = "Preview",
}

export type InsertionIndicatorProps = {
    key: string;
    collectionRef: RefObject<HTMLDivElement>;
    target: ItemDropTarget;
    dropState: DroppableCollectionState;
};

export type FocusControllerProps = {
    children: ReactElement;
    width?: FocusControllerWidth;
};

export enum FocusControllerWidth {
    Full = "Full",
    HugContents = "HugContents",
}

export const FocusControllerWidthClass: Record<FocusControllerWidth, string> = {
    [FocusControllerWidth.Full]: "tw-w-full tw-flex-auto",
    [FocusControllerWidth.HugContents]: "tw-flex-initial tw-min-w-0",
};
