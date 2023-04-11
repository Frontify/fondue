/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import { Active, Collision, Over, Translate } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';

import { OnDropCallback } from '@components/DropZone';

import { type Overlay } from './TreeItem';
import { type Projection } from './helpers';

export type SensorContext = MutableRefObject<{
    nodes: ReactElement[];
    offset: number;
}>;

export type OnSelectCallback = (id: string) => void;
export type OnExpandCallback = (id: string) => void;

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
    id: string;

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
    parentId?: string;
    childrenIds?: string[];
    level: number;
    domElement?: HTMLElement;
};

export type TreeState = {
    selectedIds: Set<string>;
    expandedIds: Set<string>;
    selectionMode: 'single' | 'multiselect';
    overlay?: Overlay;
    nodes: ReactElement[];
    projection: Nullable<Projection>;
};

export type TreeStateAction =
    | { type: 'REPLACE_STATE'; payload: TreeState }
    | { type: 'REGISTER_OVERLAY_ITEM'; payload: Overlay }
    | { type: 'SET_SELECT'; payload: { id: string; isSelected: boolean } }
    | { type: 'SET_EXPAND'; payload: { id: string; isExpanded: boolean } }
    | { type: 'SET_HIDDEN'; payload: { ids: string[]; isHidden: boolean } }
    | { type: 'SET_SELECTION_MODE'; payload: { selectionMode: TreeState['selectionMode'] } }
    | { type: 'SET_PROJECTION'; payload: Nullable<Projection> }
    | { type: 'REGISTER_NODE_CHILDREN'; payload: { id: string; children: ReactElement[] } }
    | { type: 'UNREGISTER_NODE_CHILDREN'; payload: ReactElement[] };

export type RegisterNodeChildrenPayload = Extract<TreeStateAction, { type: 'REGISTER_NODE_CHILDREN' }>['payload'];

export type CollisionPosition = Nullable<'before' | 'within' | 'after'>;

// dnd-kit type overrides
type TreeActive = Omit<Active, 'id'> & {
    id: string;
};

type TreeOver = Omit<Over, 'id'> & {
    id: string;
};

type TreeCollision = Omit<Collision, 'id'> & {
    id: string;
};

type TreeDragEvent = {
    activatorEvent: Event;
    active: TreeActive;
    collisions: TreeCollision[] | null;
    delta: Translate;
    over: TreeOver | null;
};

export type TreeDragStartEvent = Pick<TreeDragEvent, 'active'>;
export type TreeDragMoveEvent = TreeDragEvent;
export type TreeDragOverEvent = TreeDragMoveEvent;
export type TreeDragEndEvent = TreeDragEvent;
export type TreeDragCancelEvent = TreeDragEndEvent;

export type TreeAnnouncements = {
    onDragStart({ active }: Pick<TreeDragEvent, 'active'>): string | undefined;
    onDragMove?({ active, over }: TreeDragEvent): string | undefined;
    onDragOver({ active, over }: TreeDragEvent): string | undefined;
    onDragEnd({ active, over }: TreeDragEvent): string | undefined;
    onDragCancel({ active, over }: TreeDragEvent): string | undefined;
};
