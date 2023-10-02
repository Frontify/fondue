/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { ROOT_ID } from './constants';
import { TreeNodeWithoutElements, TreeState } from '../types';

export const removeReactNodesFromFlatArray = (tree: ReactElement[], nodeIds: string[]): ReactElement[] => {
    // Create a set of the node IDs to remove for faster lookup
    const nodesToRemove = new Set(nodeIds);

    // Filter the tree array to remove the nodes with IDs in the set
    return tree.filter((node) => !nodesToRemove.has(node.props.id));
};

export const getReactNodeIdsInFlatArray = (tree: ReactElement[], startingNodeId: string): string[] => {
    const nodeIds: string[] = [];

    // Create a map from node IDs to their corresponding nodes
    const nodeMap = new Map<string, ReactElement>(tree.map((node) => [node.props.id, node]));

    // Find the node with the given id
    const startingNode = nodeMap.get(startingNodeId);

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

export const getReactNodesInFlatArray = (tree: ReactElement[], startingNodeId: string): ReactElement[] => {
    const nodes: ReactElement[] = [];

    // Create a map from node IDs to their corresponding nodes
    const nodeMap = new Map<string, ReactElement>(tree.map((node) => [node.props.id, node]));

    // Find the node with the given id
    const startingNode = nodeMap.get(startingNodeId);

    if (startingNode) {
        // Recursively find all child nodes
        function findChildNodes(nodeId: number) {
            const children = tree.filter((child) => child.props.parentId === nodeId);
            for (const child of children) {
                nodes.push(child);
                findChildNodes(child.props.id);
            }
        }

        findChildNodes(startingNode.props.id);
    }

    return nodes;
};

export const getNodesToRender = (rootNodes: TreeState['rootNodes'], expandedIds: TreeState['expandedIds']) => {
    const nodesToRender: { id: string; node: ReactElement }[] = [];
    for (const node of rootNodes) {
        const parentId = node.props.parentId;
        if (
            typeof parentId === 'string' &&
            (parentId === ROOT_ID || (expandedIds.has(parentId) && nodesToRender.find((n) => n.id === parentId)))
        ) {
            nodesToRender.push({ id: node.props.id, node });
        }
    }

    return nodesToRender.map((n) => n.node);
};

export const extractNodeFromElement = (node: ReactElement): TreeNodeWithoutElements => ({
    id: node.props.id,
    level: node.props.level,
    parentId: node.props.parentId,
    nodes: [],
});

export const getTreeNodesWithoutElements = (
    nodes: ReactElement[] = [],
    parentId = '__ROOT__',
): TreeNodeWithoutElements[] => {
    const parsedNodes = nodes
        .filter((n) => n.props.parentId === parentId)
        .map((node, index) => ({
            ...extractNodeFromElement(node),
            nodes: getTreeNodesWithoutElements(nodes.slice(index + 1), node.props.id),
        }));

    return parsedNodes;
};
