/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import { INDENTATION_WIDTH, ROOT_ID } from '../Tree';
import type { InternalTreeItemProps } from '../TreeItem';

export type ProjectionArgs = {
    nodes: ReactElement<InternalTreeItemProps>[];
    activeId: string;
    overId: string;
    dragOffset: number;
};

export type Projection = {
    depth: number;
    maxDepth: number;
    minDepth: number;
    position: number;
    type?: string;
    accepts?: string;
    parentId: Nullable<string>;
};

const getMaxDepth = ({ previousNode }: { previousNode: ReactElement }) => {
    return previousNode ? previousNode.props.level + 1 : 0;
};

const getMinDepth = ({ nextNode }: { nextNode: ReactElement }) => {
    return nextNode ? nextNode.props.level : 0;
};

const getDragDepth = (offset: number) => {
    return Math.round(offset / INDENTATION_WIDTH);
};

export const getProjection = ({ nodes, activeId, overId, dragOffset }: ProjectionArgs): Projection => {
    const overNodeIndex = nodes.findIndex(({ props }) => props.id === overId);
    const activeNodeIndex = nodes.findIndex(({ props }) => props.id === activeId);

    const activeNode = nodes[activeNodeIndex];
    const newNodes = arrayMove(nodes, activeNodeIndex, overNodeIndex);

    const previousNode = newNodes[overNodeIndex - 1];
    const nextNode = newNodes[overNodeIndex + 1];

    const dragDepth = getDragDepth(dragOffset);
    const projectedDepth = (activeNode?.props?.level ?? 0) + dragDepth;

    const maxDepth = getMaxDepth({ previousNode });

    const minDepth = getMinDepth({ nextNode });
    let depth = projectedDepth;

    if (projectedDepth >= maxDepth) {
        depth = maxDepth;
    } else if (projectedDepth < minDepth) {
        depth = minDepth;
    }

    const getParentId = () => {
        if (depth === 0 || !previousNode) {
            return ROOT_ID;
        }

        if (previousNode.props.parentId && depth === previousNode.props.level) {
            return previousNode.props.parentId ?? null;
        }

        if (previousNode.props.level !== undefined && depth > previousNode.props.level) {
            return previousNode.props.id;
        }

        const newParent = newNodes
            .slice(0, overNodeIndex)
            .reverse()
            .find((item) => item.props.level === depth)?.props.parentId;

        return newParent ?? null;
    };

    const parentId = getParentId();

    const dropIndexInParent = nodes
        .filter(({ props }) => props.parentId === parentId)
        .findIndex(({ props }) => props.id === overId);

    const getParent = (parentId: Nullable<string>) => {
        if (!parentId) {
            return null;
        }
        return nodes.find(({ props }) => props.id === parentId)?.props;
    };

    const parent = getParent(parentId);

    return {
        depth,
        maxDepth,
        minDepth,
        parentId: parentId !== ROOT_ID ? parentId : null,
        type: parent?.type,
        accepts: parent?.accepts,
        position: dropIndexInParent,
    };
};
