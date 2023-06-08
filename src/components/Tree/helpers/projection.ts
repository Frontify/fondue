/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import { INDENTATION_WIDTH, ROOT_ID } from '../helpers';
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
    isWithinParent: boolean | undefined;
};

const getNodeDepth = (node: ReactElement) => {
    return node ? node.props.level : 0;
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

    const previousNodeDepth = getNodeDepth(previousNode);
    const nextNodeDepth = getNodeDepth(nextNode);
    const maxDepth = Math.max(previousNodeDepth, nextNodeDepth) + 1;
    const minDepth = Math.min(previousNodeDepth, nextNodeDepth);

    let depth = projectedDepth || nextNodeDepth;
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

    const getParent = (parentId: Nullable<string>) => {
        if (!parentId) {
            return null;
        }
        return nodes.find(({ props }) => props.id === parentId)?.props;
    };

    const parentId = getParentId();
    const parent = getParent(parentId);

    // whether we are moving down there is a +1 offset, unless we are in the same parent
    const correctionDueDragDirection =
        activeNodeIndex < overNodeIndex && activeNode.props.parentId !== parentId ? 1 : 0;

    const nodesInParent = newNodes.filter(({ props }) => props.parentId === parentId);

    /**
     * To get the position the item is dropped within its parent (first match wins):
     * - Get the index of the active item among the parent nodes
     * - Use the 'over' item to get the position
     * - If the over element is the parent matched set it to the top
     * - If the item is going out:
     *   - and up in the tree it goes to the bottom position
     *   - if going down, to the first
     * - if we move the item in or same depth and up it goes to the last position
     */
    let dropIndexInParent = nodesInParent.findIndex(({ props }) => props.id === activeId);
    if (dropIndexInParent < 0) {
        const overNextIndex = nodesInParent.findIndex(({ props }) => props.id === overId);
        if (overNextIndex >= 0) {
            dropIndexInParent = overNextIndex;
        } else if (parentId === overId) {
            dropIndexInParent = -1;
        } else if (dragDepth < 0) {
            dropIndexInParent = activeNodeIndex < overNodeIndex ? nodesInParent.length : -1;
        } else if (activeNodeIndex >= overNodeIndex) {
            dropIndexInParent = nodesInParent.length;
        }
    }

    dropIndexInParent = dropIndexInParent + correctionDueDragDirection;

    return {
        depth,
        maxDepth,
        minDepth,
        parentId: parentId !== ROOT_ID ? parentId : null,
        type: parent?.type,
        accepts: parent?.accepts,
        position: dropIndexInParent >= 0 ? dropIndexInParent : 0,
        isWithinParent: parent?.level ? depth > parent.level : false,
    };
};
