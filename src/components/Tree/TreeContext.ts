/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode, createContext, useContext } from 'react';

import type { Overlay } from './TreeItem';
import type { OnExpandCallback, OnSelectCallback, RegisterNodeChildrenPayload, TreeState } from './types';

export type TreeContextProps = {
    draggable: boolean;
    treeState: TreeState;
    onSelect: OnSelectCallback;
    onExpand: OnExpandCallback;
    registerOverlay(overlay: Overlay): void;
    unregisterNodeChildren(payload: ReactNode): void;
    registerNodeChildren(payload: RegisterNodeChildrenPayload): void;
};

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);

export const useTreeContext = (): TreeContextProps => {
    return useContext(TreeContext);
};
