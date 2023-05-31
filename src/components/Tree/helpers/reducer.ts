/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';

import type { InternalTreeItemProps } from '../TreeItem';
import isEqual from 'lodash-es/isEqual';

export const findIndexById = (nodes: ReactElement<InternalTreeItemProps>[], id: string) => {
    return nodes.findIndex((node) => node.props.id === id);
};

export const getNodeChildrenIds = (nodes: ReactElement<InternalTreeItemProps>[], id: string) => {
    return nodes.filter((node) => node.props.parentId === id).map((node) => node.props.id);
};

export const updateNodeWithNewChildren = (
    nodes: ReactElement<InternalTreeItemProps>[],
    parentIndex: number,
    children: ReactElement[],
) => {
    const offsetIndex = findLastIndexByParentId(nodes, nodes[parentIndex].props.id) + 1;
    const offset = offsetIndex > 0 ? offsetIndex : parentIndex + 1;
    return [...nodes.slice(0, parentIndex + 1), ...children, ...nodes.slice(offset)];
};

export const currentNodesChanged = (
    currentChildrenIds: string[],
    currentNodes: ReactElement<InternalTreeItemProps>[],
    newNodes: ReactElement<InternalTreeItemProps>[],
) => {
    for (const nodeId of currentChildrenIds) {
        const newNode = newNodes.find((n) => n.props.id === nodeId);
        const currentNode = currentNodes.find((n) => n.props.id === nodeId);
        if (!isEqual(currentNode?.props?.contentComponent?.props, newNode?.props?.contentComponent?.props)) {
            return true;
        }
    }
    return false;
};

const findLastIndexByParentId = (nodes: ReactElement<InternalTreeItemProps>[], parentId: string) => {
    return nodes.findLastIndex((node) => node.props.parentId === parentId);
};
