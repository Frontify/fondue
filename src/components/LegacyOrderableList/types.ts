/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { DraggableItem } from '@utilities/dnd';

export type LegacyRenderListItem<T> = (
    items: LegacyOrderableListItem<T>,
    dragProps: LegacyDragProperties,
) => ReactElement;

export type LegacyCollectionItemProps<T> = {
    item: LegacyOrderableListItem<T>;
    dragDisabled: boolean;
    renderContent: LegacyRenderListItem<T>;
    listId: string;
};

export type LegacyOrderableListItem<T = Record<string, unknown>> = DraggableItem<T> & {
    alt: string;
};

export type LegacyDragProperties = {
    componentDragState: LegacyItemDragState;
    isFocusVisible: boolean;
};

export type LegacyOrderableListProps<T> = {
    items: LegacyOrderableListItem<T>[];
    dragDisabled: boolean;
    onMove: (modifiedItems: LegacyOrderableListItem<T>[]) => void;
    renderContent: LegacyRenderListItem<T>;
    'data-test-id'?: string;
};

export enum LegacyItemDragState {
    Dragging = 'Dragging',
    Idle = 'Idle',
    Preview = 'Preview',
}
