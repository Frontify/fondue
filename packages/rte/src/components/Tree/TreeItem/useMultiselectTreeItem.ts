/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { TreeContext } from '../TreeContext';
import { convertToPartialSelectedId } from '../helpers';

export const useMultiselectTreeItem = (id: string) => {
    const { treeState } = useContext(TreeContext);

    const node = treeState.nodes.find((n) => n.props.id === id);
    const parentId = node ? node.props.parentId : '';
    const parent = treeState.nodes.find((n) => n.props.id === parentId);

    const extendedId = node ? `${parentId}/${node.props.id}` : null;
    const parentExtendId = parent ? `${parent.props.parentId}/${parent.props.id}` : null;

    const isSelected = extendedId ? treeState.selectedIds.has(extendedId) : false;
    const isParentSelected = parentExtendId ? treeState.selectedIds.has(parentExtendId) : false;
    const isPartialSelected = extendedId
        ? treeState.selectedIds.has(convertToPartialSelectedId([extendedId])[0])
        : false;
    const isExpanded = treeState.expandedIds.has(id);

    return {
        isSelected,
        isParentSelected,
        isPartialSelected,
        isExpanded,
    };
};
