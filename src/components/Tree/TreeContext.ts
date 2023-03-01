/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

import type { OnDropCallback } from '@components/DropZone';

import type {
    OnExpandCallback,
    OnSelectCallback,
    RegisterTreeItemChildrenPayload,
    RegisterTreeItemPayload,
    TreeItemPadding,
    TreeState,
} from './types';

export type TreeContextProps = {
    treeId: string;
    draggable: boolean;
    treeState: TreeState;
    basePadding: TreeItemPadding;
    registerTreeItem(payload: RegisterTreeItemPayload): void;
    registerTreeItemChildren(payload: RegisterTreeItemChildrenPayload): void;
    unregisterTreeItem(id: string): void;
    onSelect: OnSelectCallback;
    onExpand: OnExpandCallback;
    onDrop: OnDropCallback<{ id: string; sort: number }>;
};

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);

export const useTreeContext = (): TreeContextProps => {
    return useContext(TreeContext);
};
