/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

import { OnDropCallback } from '@components/DropZone';

import { OnExpandCallback, OnSelectCallback, RegisterTreeItemPayload, TreeState } from './types';

export type TreeContextProps = {
    treeId: string;
    draggable: boolean;
    treeState: TreeState;
    unregisterTreeItem(id: string): void;
    registerTreeItem(payload: RegisterTreeItemPayload): void;
    onSelect: OnSelectCallback;
    onExpand: OnExpandCallback;
    onDrop: OnDropCallback<{ id: string; sort: Nullable<number> }>;
};

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);

export const useTreeContext = (): TreeContextProps => {
    return useContext(TreeContext);
};
