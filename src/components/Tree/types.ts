/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { ReactNode } from 'react';

import type { OnDropCallback } from '@components/DropZone';
import { DropZonePosition } from '@utilities/dnd';

export type OnSelectCallback = (id: string) => void;
export type OnExpandCallback = (id: string, isExpanded: boolean) => void;

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
    /**
     * Padding added to each TreeItem in the TreeContext. Default: {"x": 10, "y": 8}
     *  */
    baseItemPadding?: Partial<TreeItemPadding>;
};

export type TreeItemPadding = { x: number; y: number };

export type ContentComponentArguments = {
    selected: boolean;
    hovered: boolean;
};

type TreeItemBaseProps = {
    id: string;
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

export type TreeItemProps = TreeItemWithLabelProps | TreeItemWithContentComponentProps;

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
    | { type: 'ON_DROP'; payload: { id: string; targetId: string; position: DropZonePosition } }
    | { type: 'REGISTER_TREE_ITEM'; payload: { id: string } & Omit<TreeItemState, 'childrenIds'> }
    | { type: 'REGISTER_TREE_ITEM_CHILDREN'; payload: { id: string; childrenIds: TreeItemState['childrenIds'] } }
    | { type: 'UNREGISTER_TREE_ITEM'; payload: { id: string } };

export type RegisterTreeItemPayload = Extract<TreeStateAction, { type: 'REGISTER_TREE_ITEM' }>['payload'];
export type RegisterTreeItemChildrenPayload = Extract<
    TreeStateAction,
    { type: 'REGISTER_TREE_ITEM_CHILDREN' }
>['payload'];
