/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { DraggableItem } from '@utilities/dnd';
import { DragHandlerPosition, TreeItemStyling } from '..';

export type RenderListItem<T> = (items: OrderableListItem<T>) => ReactElement;

export type OrderableListItem<T = Record<string, unknown>> = DraggableItem<T> & {
    alt: string;
};

export type OrderableListItemStyle = TreeItemStyling;

export type OrderableListProps<T> = {
    items: OrderableListItem<T>[];
    dragDisabled: boolean;
    dragHandlerPosition?: DragHandlerPosition;
    /**@description Flag to disable the default drag sensor delay */
    disableDragDelay?: boolean;
    itemStyle?: OrderableListItemStyle;
    selectedId?: string;
    onMove: (modifiedItems: DraggableItem<T>[]) => void;
    renderContent: RenderListItem<T>;
    'data-test-id'?: string;
};
