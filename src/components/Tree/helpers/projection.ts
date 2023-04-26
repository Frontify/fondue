/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import { INDENTATION_WIDTH } from '../Tree';

export type ProjectionArgs = {
    nodes: ReactElement[];
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
    const projectedDepth = activeNode?.props?.level + dragDepth;

    const maxDepth = getMaxDepth({ previousNode });

    const minDepth = getMinDepth({ nextNode });
    let depth = projectedDepth;

    if (projectedDepth >= maxDepth) {
        depth = maxDepth;
    } else if (projectedDepth < minDepth) {
        depth = minDepth;
    }

    const getParent = () => {
        if (depth === 0 || !previousNode) {
            return null;
        }

        if (depth === previousNode.props.level) {
            return previousNode.props.parentId;
        }

        if (depth > previousNode.props.level) {
            return previousNode.props.id;
        }

        const newParent = newNodes
            .slice(0, overNodeIndex)
            .reverse()
            .find((item) => item.props.level === depth);

        return newParent ?? null;
    };

    const parent = getParent();

    return {
        depth,
        maxDepth,
        minDepth,
        parentId: parent?.parentId,
        type: parent?.type,
        accepts: parent?.accepts,
        position: overNodeIndex,
    };
};
