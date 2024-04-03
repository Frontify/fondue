/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { type DragHandlerPosition, type TreeItemStyling, type TreeProps } from '@components/Tree/types';
import { type DraggableItem } from '@utilities/dnd';

export type RenderListItem<T> = (items: OrderableListItem<T>) => ReactElement;

export type OrderableListItem<T = Record<string, unknown>> = DraggableItem<T> & {
    alt: string;
};

export type OrderableListItemStyle = TreeItemStyling;

export type OrderableListProps<T> = {
    items: OrderableListItem<T>[];
    dragDisabled: boolean;
    dragHandlerPosition?: DragHandlerPosition;
    itemStyle?: OrderableListItemStyle;
    selectedId?: string;
    onMove: (modifiedItems: DraggableItem<T>[]) => void;
    renderContent: RenderListItem<T>;
    'data-test-id'?: string;
} & Pick<TreeProps, 'enableDragDelay'>;
