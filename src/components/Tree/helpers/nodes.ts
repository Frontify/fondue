/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';

export const removeNodesFromTree = (tree: ReactElement[], nodeIds: string[]): ReactElement[] => {
    // Create a set of the node IDs to remove for faster lookup
    const nodesToRemove = new Set(nodeIds);

    // Filter the tree array to remove the nodes with IDs in the set
    return tree.filter((node) => !nodesToRemove.has(node.props.id));
};

export const getNodeIdsInBranch = (tree: ReactElement[], id: string): string[] => {
    const nodeIds: string[] = [];

    // Create a map from node IDs to their corresponding nodes
    const nodeMap = new Map<string, ReactElement>();
    for (const node of tree) {
        nodeMap.set(node.props.id, node);
    }

    // Find the node with the given id
    const startingNode = nodeMap.get(id);

    if (startingNode) {
        // Recursively find all child nodes
        function findChildNodes(nodeId: number) {
            const children = tree.filter((child) => child.props.parentId === nodeId);
            for (const child of children) {
                nodeIds.push(child.props.id);
                findChildNodes(child.props.id);
            }
        }

        findChildNodes(startingNode.props.id);
    }

    return nodeIds;
};
