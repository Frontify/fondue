/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type DragHandlerPosition, type TreeItemStyling, type TreeProps } from '@components/Tree/types';
import { type DraggableItem } from '@utilities/dnd/types';
import { type ReactElement } from 'react';

/**
 * @deprecated Use the new OrderableList component from @frontify/fondue/components instead.
 */
export type RenderListItem<T> = (items: OrderableListItem<T>) => ReactElement;

/**
 * @deprecated Use the new OrderableList component from @frontify/fondue/components instead.
 */
export type OrderableListItem<T = Record<string, unknown>> = DraggableItem<T> & {
    alt: string;
};

/**
 * @deprecated Use the new OrderableList component from @frontify/fondue/components instead.
 */
export type OrderableListItemStyle = TreeItemStyling;

/**
 * @deprecated Use the new OrderableList component from @frontify/fondue/components instead.
 */
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
