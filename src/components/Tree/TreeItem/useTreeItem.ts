/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';

import { TreeContext } from '../TreeContext';

export const useTreeItem = (id: UniqueIdentifier) => {
    const { treeState } = useContext(TreeContext);

    const isSelected = treeState.selectedIds.has(id);
    const isExpanded = treeState.expandedIds.has(id);

    return {
        isSelected,
        isExpanded,
    };
};
