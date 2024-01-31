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
    previousNode: Nullable<{ id: string; depth: number; accepts?: string }>;
};

const getNodeDepth = (node: ReactElement) => {
    return node ? node.props.level : 0;
};

const getDragDepth = (offset: number) => {
    return Math.round(offset / INDENTATION_WIDTH);
};

const getNodeDepthConstraint = (node: ReactElement) => {
    return (node?.props.levelConstraint ?? null) !== null ? node.props.levelConstraint : false;
};

const calculateMaxDepth = (previousNode: ReactElement, nextNode: ReactElement) => {
    const previousNodeDepth = getNodeDepth(previousNode);

    if (previousNode?.props.accepts) {
        const nextNodeDepth = getNodeDepth(nextNode);
        return previousNodeDepth >= nextNodeDepth ? previousNodeDepth + 1 : nextNodeDepth;
    } else {
        return previousNodeDepth;
    }
};

const calculateMinDepth = (previousNode: ReactElement, nextNode: ReactElement) => {
    const nextNodeDepth = getNodeDepth(nextNode);

    if (previousNode?.props.accepts) {
        return nextNodeDepth;
    } else {
        return Math.min(getNodeDepth(previousNode), nextNodeDepth);
    }
};

export const getProjection = ({ nodes, activeId, overId, dragOffset }: ProjectionArgs): Projection => {
    const overNodeIndex = nodes.findIndex(({ props }) => props.id === overId);
    const activeNodeIndex = nodes.findIndex(({ props }) => props.id === activeId);

    const activeNode = nodes[activeNodeIndex];
    const newNodes = arrayMove(nodes, activeNodeIndex, overNodeIndex);

    const previousNode = newNodes[overNodeIndex - 1];
    const nextNode = newNodes[overNodeIndex + 1];

    const activeNodeDepthConstraint = getNodeDepthConstraint(activeNode);
    const dragDepth = getDragDepth(dragOffset);
    const projectedDepth = (activeNode?.props?.level ?? 0) + dragDepth;

    const maxDepth =
        activeNodeDepthConstraint !== false ? activeNodeDepthConstraint : calculateMaxDepth(previousNode, nextNode);
    const minDepth =
        activeNodeDepthConstraint !== false ? activeNodeDepthConstraint : calculateMinDepth(previousNode, nextNode);

    let depth = projectedDepth || getNodeDepth(nextNode);
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
            return previousNode.props.accepts
                ? previousNode.props.id
                : previousNode.props.parentId ?? previousNode.props.id;
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
     *   - try to figure the position by the parent from the next element
     *   - Or go to the first (going down) or last position (going up)
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
            const nextNodeNodesInParent = nextNode.props.parentId
                ? newNodes.filter(({ props }) => props.parentId === nextNode.props.parentId)
                : [];
            const nextNodePosition = nextNodeNodesInParent.findIndex(({ props }) => props.id === nextNode.props.id);
            if (nextNodePosition >= 0) {
                dropIndexInParent = nextNodePosition + (activeNodeIndex < overNodeIndex ? -1 : 0);
            } else {
                dropIndexInParent = activeNodeIndex < overNodeIndex ? nodesInParent.length : -1;
            }
        } else if (activeNodeIndex >= overNodeIndex) {
            dropIndexInParent = nodesInParent.length;
        }
    }

    dropIndexInParent = dropIndexInParent + correctionDueDragDirection;
    const parentDepth = parent?.level ?? 0;

    return {
        depth,
        maxDepth,
        minDepth,
        parentId: parentId ?? null,
        type: parent?.type,
        accepts: parent?.accepts,
        position: dropIndexInParent >= 0 ? dropIndexInParent : 0,
        isWithinParent: parentDepth ? depth > parentDepth : false,
        previousNode: previousNode
            ? {
                  id: previousNode.props.id,
                  depth: getNodeDepth(previousNode),
                  accepts: previousNode.props.accepts,
              }
            : null,
    };
};
