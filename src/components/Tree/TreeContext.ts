/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

import type { OnExpandCallback, OnSelectCallback, TreeState } from './types';

export type TreeContextProps = {
    treeState: TreeState;
    onSelect: OnSelectCallback;
    onExpand: OnExpandCallback;
};

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);

export const useTreeContext = (): TreeContextProps => {
    return useContext(TreeContext);
};
