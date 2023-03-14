/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Overlay } from './TreeItemOverlay';
import { OnDropCallback } from '@components/DropZone';

export type OnSelectCallback = (id: UniqueIdentifier) => void;
export type OnExpandCallback = (id: UniqueIdentifier) => void;

export type TreeProps = {
    id: string;
    selectedIds?: string[];
    expandedIds?: string[];
    draggable?: boolean;
    multiselect?: boolean;
    onSelect?: OnSelectCallback;
    onExpand?: OnExpandCallback;
    onDrop?: OnDropCallback<{ id: string; sort: number }>;
    children: ReactNode;
};

export type ContentComponentArguments = {
    selected?: boolean;
};

type TreeItemBaseProps = {
    id: UniqueIdentifier;
    onDrop?: OnDropCallback<{ id: string; sort: number }>;
    /**
     * The type of item being dragged.
     */
    type?: string;
    /**
     * The kinds of dragItems this dropTarget accepts
     */
    accepts?: { within: string | string[]; after: string | string[]; before: string | string[] } | string | string[];
    children?: ReactNode;

    draggable?: boolean;

    /** @private */
    parentId?: string;
    /** @private */
    level?: number;
};

export type TreeItemWithLabelProps = {
    label?: string;
    contentComponent?: never;
} & TreeItemBaseProps;

export type TreeItemWithContentComponentProps = {
    label?: never;
    contentComponent?: (props: ContentComponentArguments) => ReactNode;
} & TreeItemBaseProps;

export type SortableProps = Partial<ReturnType<typeof useSortable>>;

export type TreeItemProps = SortableProps & (TreeItemWithLabelProps | TreeItemWithContentComponentProps);

export type SortableTreeItemProps = TreeItemProps;

export type TreeItemState = {
    parentId?: UniqueIdentifier;
    childrenIds?: UniqueIdentifier[];
    level: number;
    domElement?: HTMLElement;
};

export type TreeState = {
    items: Map<UniqueIdentifier, TreeItemState>;
    selectedIds: Set<UniqueIdentifier>;
    expandedIds: Set<UniqueIdentifier>;
    selectionMode: 'single' | 'multiselect';
    overlay?: Overlay;
};

export type TreeStateAction =
    | { type: 'REPLACE_STATE'; payload: TreeState }
    | { type: 'SET_SELECT'; payload: { id: UniqueIdentifier; isSelected: boolean } }
    | { type: 'SET_EXPAND'; payload: { id: UniqueIdentifier; isExpanded: boolean } }
    | { type: 'SET_SELECTION_MODE'; payload: { selectionMode: TreeState['selectionMode'] } }
    | { type: 'ON_DROP'; payload: { id: UniqueIdentifier; targetId: UniqueIdentifier; position?: CollisionPosition } }
    | { type: 'REGISTER_TREE_ITEM'; payload: { id: UniqueIdentifier } & Omit<TreeItemState, 'childrenIds'> }
    | {
          type: 'REGISTER_TREE_ITEM_CHILDREN';
          payload: { id: UniqueIdentifier; childrenIds: TreeItemState['childrenIds'] };
      }
    | { type: 'UNREGISTER_TREE_ITEM'; payload: { id: UniqueIdentifier } }
    | { type: 'REGISTER_OVERLAY_ITEM'; payload: Overlay };

export type RegisterTreeItemPayload = Extract<TreeStateAction, { type: 'REGISTER_TREE_ITEM' }>['payload'];
export type RegisterTreeItemChildrenPayload = Extract<
    TreeStateAction,
    { type: 'REGISTER_TREE_ITEM_CHILDREN' }
>['payload'];

export type CollisionPosition = 'before' | 'within' | 'after';
