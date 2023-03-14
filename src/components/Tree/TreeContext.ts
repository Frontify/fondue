/* (c) Copyright Frontify Ltd., all rights reserved. */

import { UniqueIdentifier } from '@dnd-kit/core';
import { createContext, useContext } from 'react';
import { Overlay } from './TreeItemOverlay';

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
    baseItemPadding: TreeItemPadding;
    registerTreeItem(payload: RegisterTreeItemPayload): void;
    registerTreeItemChildren(payload: RegisterTreeItemChildrenPayload): void;
    unregisterTreeItem(id: UniqueIdentifier): void;
    registerOverlay(overlay: Overlay): void;
    onSelect: OnSelectCallback;
    onExpand: OnExpandCallback;
};

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);

export const useTreeContext = (): TreeContextProps => {
    return useContext(TreeContext);
};
