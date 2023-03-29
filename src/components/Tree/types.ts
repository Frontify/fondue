/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';

import { OnDropCallback } from '@components/DropZone';

import { type Overlay } from './TreeItem';
import { type Projection } from './helpers';

export type SensorContext = MutableRefObject<{
    nodes: ReactElement[];
    offset: number;
}>;

export type OnSelectCallback = (id: UniqueIdentifier) => void;
export type OnExpandCallback = (id: UniqueIdentifier) => void;

export type TreeProps = {
    id: string;
    draggable?: boolean;
    children: ReactNode;
    multiselect?: boolean;
    selectedIds?: string[];
    expandedIds?: string[];
    'data-test-id'?: string;
    onSelect?: OnSelectCallback;
    onExpand?: OnExpandCallback;
    onDrop?: OnDropCallback<{ id: string; sort: number }>;
};

type TreeItemBaseProps = {
    id: UniqueIdentifier;

    'data-test-id'?: string;

    onDrop?: OnDropCallback<{ id: string; sort: number }>;
    /**
     * The type of item being dragged.
     */
    type?: string;
    /**
     * The kinds of dragItems this dropTarget accepts
     *  @example ['itemA', 'itemA-within']
     * if suffix '-within' is appended, then it will allow dropping item inside it
     */
    accepts?: string[];

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
    contentComponent?: ReactNode;
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
    selectedIds: Set<UniqueIdentifier>;
    expandedIds: Set<UniqueIdentifier>;
    selectionMode: 'single' | 'multiselect';
    overlay?: Overlay;
    nodes: ReactElement[];
    projection: Nullable<Projection>;
};

export type TreeStateAction =
    | { type: 'REPLACE_STATE'; payload: TreeState }
    | { type: 'REGISTER_OVERLAY_ITEM'; payload: Overlay }
    | { type: 'SET_SELECT'; payload: { id: UniqueIdentifier; isSelected: boolean } }
    | { type: 'SET_EXPAND'; payload: { id: UniqueIdentifier; isExpanded: boolean } }
    | { type: 'SET_HIDDEN'; payload: { ids: UniqueIdentifier[]; isHidden: boolean } }
    | { type: 'SET_SELECTION_MODE'; payload: { selectionMode: TreeState['selectionMode'] } }
    | { type: 'SET_PROJECTION'; payload: Nullable<Projection> }
    | { type: 'REGISTER_NODE_CHILDREN'; payload: { id: UniqueIdentifier; children: ReactElement[] } }
    | { type: 'UNREGISTER_NODE_CHILDREN'; payload: ReactElement[] };

export type RegisterNodeChildrenPayload = Extract<TreeStateAction, { type: 'REGISTER_NODE_CHILDREN' }>['payload'];

export type CollisionPosition = 'before' | 'within' | 'after';
