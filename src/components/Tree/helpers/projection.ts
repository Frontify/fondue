/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';

import { INDENTATION_WIDTH } from '../Tree';

export type ProjectionArgs = {
    nodes: ReactElement[];
    activeId: UniqueIdentifier;
    overId: UniqueIdentifier;
    dragOffset: number;
};

export type Projection = {
    depth: number;
    maxDepth: number;
    minDepth: number;
    parentId: Nullable<UniqueIdentifier>;
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
    const newNode = arrayMove(nodes, activeNodeIndex, overNodeIndex);

    const previousNode = newNode[overNodeIndex - 1];
    const nextNode = newNode[overNodeIndex + 1];

    const dragDepth = getDragDepth(dragOffset);
    const projectedDepth = activeNode?.props?.level + dragDepth;

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
            return null;
        }

        if (depth === previousNode.props.level) {
            return previousNode.props.parentId;
        }

        if (depth > previousNode.props.level) {
            return previousNode.props.id;
        }

        const newParent = newNode
            .slice(0, overNodeIndex)
            .reverse()
            .find((item) => item.props.level === depth)?.props.parentId;

        return newParent ?? null;
    };

    return { depth, maxDepth, minDepth, parentId: getParentId() };
};
