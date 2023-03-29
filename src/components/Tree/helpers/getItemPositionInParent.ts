/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';

/**
 * The getItemPositionInParent function returns the index of a given item within a list of sibling nodes, based on the item's ID and its parent ID.
 *
 * @param item The item whose position within the parent node is required.
 * @param item.id The unique identifier of the item.
 * @param item.parentId The unique identifier of the item's parent.
 * @param nodes An array of React elements representing the nodes in the tree structure.
 *
 * @returns
 * A number representing the index of the given item within the list of its sibling nodes. If the item is not found, the function will return -1.
 */
export const getItemPositionInParent = (
    item: { id: UniqueIdentifier; parentId: UniqueIdentifier },
    nodes: ReactElement[],
): number => {
    return nodes.filter((node) => node.props.parentId === item.parentId).findIndex((node) => node.props.id === item.id);
};
