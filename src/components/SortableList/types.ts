/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { DraggableItem } from '@utilities/dnd';
import { UniqueIdentifier } from '@dnd-kit/core';

export type RenderListItem<T> = (items: OrderableListItem<T>, dragProps: DragProperties) => ReactElement;

export type CollectionItemProps<T> = {
    type?: string;
    accepts?: string[];
    draggable?: boolean;
    id: UniqueIdentifier;
    item: OrderableListItem<T>;
    content: RenderListItem<T>;
};

export type OrderableListItem<T = Record<string, unknown>> = DraggableItem<T> & {
    alt: string;
};

export type DragProperties = {
    componentDragState: ItemDragState;
    isFocusVisible: boolean;
};

export type SortableListProps<T> = {
    items: OrderableListItem<T>[];
    dragDisabled: boolean;
    onMove: (modifiedItems: OrderableListItem<T>[]) => void;
    renderContent: RenderListItem<T>;
};

export enum ItemDragState {
    Dragging = 'Dragging',
    Idle = 'Idle',
    Preview = 'Preview',
}
