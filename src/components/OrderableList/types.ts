import { DraggableCollectionState, DroppableCollectionState } from "@react-stately/dnd";
import { Key, ReactElement, RefObject } from "react";
import { GridNode } from "@react-types/grid";
import { GridCollection, GridState } from "@react-stately/grid";
import { ItemDropTarget } from "@react-types/shared";

export type CollectionItemProps = {
    item: GridNode<OrderableListItem>;
    dragDisabled: boolean;
    gridState: GridState<Record<string, unknown>, GridCollection<OrderableListItem>>;
    showFocusRing: boolean;
    dragState: DraggableCollectionState;
    renderContent: (items: GridNode<OrderableListItem>, isDragging: DragProperties) => ReactElement;
};

export type OrderableListItem<T = Record<string, unknown>> = T & {
    id: string;
    alt: string;
};

export type DragProperties = {
    componentDragState: ItemDragState;
    isFocusVisible: boolean;
};

export type OrderableListProps = {
    items: OrderableListItem[];
    showFocusRing: boolean;
    dragDisabled: boolean;
    disableTypeAhead?: boolean;
    onMove: (selectedGridItemKeys: Key[], gridItemLocation: ItemDropTarget) => void;
    renderContent: (items: GridNode<OrderableListItem>, dragProperties: DragProperties) => ReactElement;
};

export type OrderableListContainerProps = {
    items: OrderableListItem[];
    showFocusRing: boolean;
    dragDisabled: boolean;
    disableTypeAhead?: boolean;
    children: (item: OrderableListItem) => JSX.Element;
    onMove: (selectedGridItemKeys: Key[], gridItemLocation: ItemDropTarget) => void;
    renderContent: (items: GridNode<OrderableListItem>, isDragging: DragProperties) => ReactElement;
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
