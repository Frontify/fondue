/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCollectedEntry } from './TreeCollector';

export const TreeLoading = (): null => {
    useCollectedEntry((parentId) => ({ kind: 'loading', parentId }));
    return null;
};
TreeLoading.displayName = 'Tree.Loading';
