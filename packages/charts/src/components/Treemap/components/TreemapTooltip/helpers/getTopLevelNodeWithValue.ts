/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HierarchyNode } from 'd3-hierarchy';

import { type TreemapDataPoint } from '@components/Treemap/types';

export const getTopLevelNodeWithValue = (hierarchyNode: HierarchyNode<TreemapDataPoint>): TreemapDataPoint => {
    const datum = hierarchyNode.data;
    const topLevelNode = getTopLevelNode(hierarchyNode);
    const sumOfChildren =
        topLevelNode.children?.reduce((sum, child) => {
            return sum + (child.value ?? 0);
        }, 0) ?? 0;

    return {
        ...datum,
        label: topLevelNode.data.label,
        value: sumOfChildren || datum.value,
    };
};

const getTopLevelNode = (hierarchyNode: HierarchyNode<TreemapDataPoint>) => {
    let topLevelNode = hierarchyNode;
    if (topLevelNode.depth > 1) {
        topLevelNode = hierarchyNode.parent ?? hierarchyNode;
    }

    return topLevelNode;
};
