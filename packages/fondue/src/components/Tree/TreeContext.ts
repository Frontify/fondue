/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

import { type OnExpandCallback, type OnSelectInternalCallback, type OnShrinkCallback, type TreeState } from './types';

/**
 * @deprecated Please use updated Tree component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tree the migration guide}.
 */
export type TreeContextProps = {
    treeState: TreeState;
    onSelect: OnSelectInternalCallback;
    onExpand: OnExpandCallback;
    onShrink: OnShrinkCallback;
};

/**
 * @deprecated Please use updated Tree component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tree the migration guide}.
 */
export const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);
TreeContext.displayName = 'TreeContext';
