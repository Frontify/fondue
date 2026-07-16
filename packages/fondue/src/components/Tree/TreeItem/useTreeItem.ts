/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { TreeContext } from '../TreeContext';

/**
 * @deprecated Please use updated Tree component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tree the migration guide}.
 */
export const useTreeItem = (id: string) => {
    const { treeState } = useContext(TreeContext);

    const isSelected = treeState.selectedIds.has(id);
    const isExpanded = treeState.expandedIds.has(id);
    const projection = treeState.projection;

    return {
        isSelected,
        isExpanded,
        projection,
    };
};
