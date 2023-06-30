/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';

import type { InternalTreeItemProps } from '../TreeItem';
import isEqualWith from 'lodash-es/isEqualWith';
import { getReactNodeIdsInFlatArray, getReactNodesInFlatArray, removeReactNodesFromFlatArray } from './nodes';

export const findIndexById = (nodes: ReactElement<InternalTreeItemProps>[], id: string) => {
    return nodes.findIndex((node) => node.props.id === id);
};

export const getNodeChildrenIds = (nodes: ReactElement<InternalTreeItemProps>[], id: string) => {
    return nodes.filter((node) => node.props.parentId === id).map((node) => node.props.id);
};

export const updateNodeWithNewChildren = (
    nodes: ReactElement<InternalTreeItemProps>[],
    parentId: string,
    children: ReactElement[],
) => {
    const nodeIds = getReactNodeIdsInFlatArray(nodes, parentId);
    const cleanNodes = nodeIds.length > 0 ? removeReactNodesFromFlatArray(nodes, nodeIds) : nodes;
    const parentIndex = findIndexById(cleanNodes, parentId);
    if (parentIndex === -1) {
        return nodes;
    }

    return [...cleanNodes.slice(0, parentIndex + 1), ...children, ...cleanNodes.slice(parentIndex + 1)];
};

export const getCurrentChildrenForNewNodesIfExpanded = (
    currentNodes: ReactElement[],
    expandedIds: Set<string>,
    newNodes: ReactElement[],
) => {
    const updatedTreeNode: ReactElement[] = [];
    for (const node of newNodes) {
        updatedTreeNode.push(node);

        if (!expandedIds.has(node.props.id)) {
            continue;
        }

        for (const child of getReactNodesInFlatArray(currentNodes, node.props.id)) {
            updatedTreeNode.push(child);
        }
    }

    return updatedTreeNode;
};

export const currentNodesChanged = (
    currentChildrenIds: string[],
    currentNodes: ReactElement<InternalTreeItemProps>[],
    newNodes: ReactElement<InternalTreeItemProps>[],
) => {
    for (const nodeId of currentChildrenIds) {
        const newNode = newNodes.find((n) => n.props.id === nodeId);
        const newContentComponent = newNode?.props?.contentComponent as Partial<ReactElement>;

        const currentNode = currentNodes.find((n) => n.props.id === nodeId);
        const currentContentComponent = currentNode?.props?.contentComponent as Partial<ReactElement>;

        if (
            (!currentContentComponent || !newContentComponent) &&
            !isEqualWith(currentNode?.props, newNode?.props, isEqualCustomizer)
        ) {
            return true;
        }

        if (!isEqualWith(currentContentComponent?.props, newContentComponent?.props, isEqualCustomizer)) {
            return true;
        }
    }
    return false;
};

const isEqualCustomizer = (nodeProp: unknown, othernodeProp: unknown): boolean | undefined => {
    if (typeof nodeProp === 'function' || typeof othernodeProp === 'function') {
        return true;
    }
};
