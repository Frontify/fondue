/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { TreeContext } from '../TreeContext';

export const useTreeItemMultiselect = (id: string) => {
    const { treeState } = useContext(TreeContext);

    const isSelected = treeState.selectedIds.has(id);
    const isExpanded = treeState.expandedIds.has(id);

    return {
        isSelected,
        isExpanded,
    };
};
