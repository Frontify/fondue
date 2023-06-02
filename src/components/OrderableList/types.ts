/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { DraggableItem } from '@utilities/dnd';

export type RenderListItem<T> = (items: OrderableListItem<T>, dragProps: DragProperties) => ReactElement;

export type CollectionItemProps<T> = {
    item: OrderableListItem<T>;
    dragDisabled: boolean;
    renderContent: RenderListItem<T>;
    listId: string;
};

export type OrderableListItem<T = Record<string, unknown>> = DraggableItem<T> & {
    alt: string;
};

export type DragProperties = {
    componentDragState: ItemDragState;
    isFocusVisible: boolean;
};

export type OrderableListProps<T> = {
    items: OrderableListItem<T>[];
    dragDisabled: boolean;
    onMove: (modifiedItems: OrderableListItem<T>[]) => void;
    renderContent: RenderListItem<T>;
    'data-test-id'?: string;
};

export enum ItemDragState {
    Dragging = 'Dragging',
    Idle = 'Idle',
    Preview = 'Preview',
}
