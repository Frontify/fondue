/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ReactNode } from 'react';

import type { OnDropCallback } from '@components/DropZone';

export type OnSelectCallback = (id: string) => void;
export type OnExpandCallback = (id: string, isExpanded: boolean) => void;

export type TreeProps = {
    id: string;
    selectedIds?: string[];
    expandedIds?: string[];
    draggable?: boolean;
    onSelect?: OnSelectCallback;
    onExpand?: OnExpandCallback;
    onDrop?: OnDropCallback<{ id: string; sort: Nullable<number> }>;
    children: ReactNode;
};

export type ContentComponentArguments = {
    selected: boolean;
    hovered: boolean;
};

type TreeItemWithLabelProps = {
    label?: string;
    contentComponent?: never;
};

type TreeItemWithContentComponentProps = {
    label?: never;
    contentComponent?: ({ selected, hovered }: ContentComponentArguments) => ReactNode;
};

export type TreeItemProps = {
    id: string;
    onDrop?: OnDropCallback<{ id: string; sort: Nullable<number> }>;
    /**
     * The type of item being dragged.
     */
    type?: string;
    /**
     * The kinds of dragItems this dropTarget accepts
     */
    accepts?: { within: string | string[]; after: string | string[]; before: string | string[] } | string | string[];
    children?: ReactNode;

    parentId?: string;
    level?: number;
} & (TreeItemWithLabelProps | TreeItemWithContentComponentProps);

export type TreeItemState = {
    parentId?: string;
    childrenIds?: string[];
    level: number;
    domElement?: HTMLElement;
};

export type TreeState = {
    items: Map<string, TreeItemState>;
    selectedIds: Set<string>;
    expandedIds: Set<string>;
    selectionMode: 'single' | 'multiselect';
};

export type TreeStateAction =
    | { type: 'REPLACE_STATE'; payload: TreeState }
    | { type: 'SET_SELECT'; payload: { id: string; isSelected: boolean } }
    | { type: 'SET_EXPAND'; payload: { id: string; isExpanded: boolean } }
    | { type: 'SET_SELECTION_MODE'; payload: { selectionMode: TreeState['selectionMode'] } }
    | { type: 'REGISTER_TREE_ITEM'; payload: { id: string } & TreeItemState }
    | { type: 'UNREGISTER_TREE_ITEM'; payload: { id: string } };

export type RegisterTreeItemPayload = Extract<TreeStateAction, { type: 'REGISTER_TREE_ITEM' }>['payload'];
