/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

import type { OnExpandCallback, OnSelectInternalCallback, OnShrinkCallback, TreeState } from './types';

export type TreeContextProps = {
    treeState: TreeState;
    onSelect: OnSelectInternalCallback;
    onExpand: OnExpandCallback;
    onShrink: OnShrinkCallback;
};

export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);

export const useTreeContext = (): TreeContextProps => {
    return useContext(TreeContext);
};
