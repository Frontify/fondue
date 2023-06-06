/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { TreeItemProps } from '../types';

export type TreeItemMock = TreeItemProps & {
    id: string;
    nodes?: TreeItemMock[];
    numChildNodes?: number;
};

const uncategorizedPagesMock: TreeItemMock[] = [
    {
        id: '1-1-1',
        label: 'Home',
    },
    {
        id: '1-1-2',
        label: 'Members',
    },
    {
        id: '1-1-3',
        label: 'About us',
    },
];

const testSubCategoryMock: TreeItemMock[] = [
    {
        id: '1-2-3-1',
        label: 'SubItem 1',
    },
    {
        id: '1-2-3-2',
        label: 'SubItem 2',
    },
    {
        id: '1-2-3-3',
        label: 'SubItem 3',
    },
];

const testCategoryMock: TreeItemMock[] = [
    {
        id: '1-2-1',
        label: 'Home Category Test Category',
    },
    {
        id: '1-2-2',
        label: 'Members Category',
    },
    {
        id: '1-2-3',
        label: 'About us Category',
        nodes: testSubCategoryMock,
    },
];

const testGroupMock: TreeItemMock[] = [
    {
        id: '1-1',
        label: 'Document Category 1',
        nodes: uncategorizedPagesMock,
        type: 'document-category',
        accepts: ['document-page', 'document-page-within', 'document-category'].join(', '),
    },
    {
        id: '1-2',
        label: 'Document Category 2',
        nodes: testCategoryMock,
        type: 'document-category',
        accepts: ['document-page', 'document-page-within', 'document-category'].join(', '),
    },
    {
        id: '1-3',
        label: 'Document Page 1',
        type: 'document-page',
        accepts: 'document-page',
    },
    {
        id: '1-4',
        label: 'Document Page 2',
        type: 'document-page',
        accepts: 'document-page',
    },
    {
        id: '1-5',
        label: 'Document Page 3',
        type: 'document-page',
        accepts: 'document-page',
    },
];

export const treeItemsMock: TreeItemMock[] = [
    {
        id: '1',
        label: 'Design System Testing - Deep Nested Items',
        nodes: testGroupMock,
    },
    {
        id: '2',
        label: 'Design System Testing - Root Childless',
    },
    {
        id: '3',
        label: 'Design System Testing - Not draggable',
        draggable: false,
    },
];

const reducer = (nodes: TreeItemMock[], expandedIds: string[] = []): TreeItemMock[] => {
    const newNodes = [...nodes];

    return newNodes.map((item) => {
        const numChildNodes = item.nodes?.length ?? 0;
        const childNodes = expandedIds.includes(item.id) ? reducer(item?.nodes ?? [], expandedIds) : undefined;

        return {
            ...item,
            numChildNodes,
            nodes: childNodes,
        };
    });
};

export const useDynamicNavigationMock = (expandedIds: string[]) => {
    const [nodes, setNodes] = useState<TreeItemMock[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setNodes(reducer(treeItemsMock, expandedIds));
        }, 500);
    }, [expandedIds]);

    return [nodes, setNodes];
};

export const useNavigationWithLazyLoadedItemsMock = (id?: string, isExpanded = false, isRoot = false) => {
    const [nodes, setNodes] = useState<TreeItemMock[]>([]);

    useEffect(() => {
        setTimeout(() => {
            if (!isExpanded) {
                return setNodes([]);
            }

            if (isRoot) {
                return setNodes(reducer(treeItemsMock));
            }

            if (id === '1-lazyloaded') {
                return setNodes(reducer(testGroupMock));
            }

            if (id === '1-1-lazyloaded') {
                return setNodes(reducer(uncategorizedPagesMock));
            }

            if (id === '1-2-lazyloaded') {
                return setNodes(reducer(testCategoryMock));
            }

            if (id === '1-2-3-lazyloaded') {
                return setNodes(reducer(testSubCategoryMock));
            }
        }, 500);
    }, [id, isExpanded, isRoot]);

    return { nodes, setNodes };
};

export type TreeNodeToMove = {
    id: string;
    parentId: Nullable<string>;
    sort: number;
    parentType: string | undefined;
} | null;

const removeNode = (idToMove: string, nodesList: TreeItemMock[], removedNode?: TreeItemMock) => {
    let foundNode = removedNode;
    const newNodes: TreeItemMock[] = [];

    for (const item of nodesList) {
        if (item.id !== idToMove) {
            const removedChildren = removeNode(idToMove, item.nodes ?? [], foundNode);
            newNodes.push({
                ...item,
                nodes: removedChildren.newNodes,
            });
            foundNode = removedChildren.node;
        } else {
            foundNode = item;
        }
    }

    return { node: removedNode ?? foundNode, newNodes };
};

const insertAndSortNodes = (
    nodesList: TreeItemMock[],
    node: TreeItemMock,
    parentId: Nullable<string>,
    sort: number,
): TreeItemMock[] => {
    if (parentId === null) {
        return [...nodesList.slice(0, sort), node, ...nodesList.slice(sort)];
    }

    return nodesList.map((n) => mapNode(n, node, parentId, sort));
};

const mapNode = (nodeToMap: TreeItemMock, nodeToAdd: TreeItemMock, parentId: Nullable<string>, sort: number) => {
    if (nodeToMap.id === parentId) {
        return {
            ...nodeToMap,
            nodes: [...(nodeToMap.nodes ?? []).slice(0, sort), nodeToAdd, ...(nodeToMap.nodes ?? []).slice(sort)],
        };
    }

    return {
        ...nodeToMap,
        nodes: insertAndSortNodes(nodeToMap.nodes ?? [], nodeToAdd, parentId, sort),
    };
};

export const useMoveTreeItem = (nodeToMove: TreeNodeToMove, timeout = 0) => {
    const [nodes, setNodes] = useState<TreeItemMock[]>(treeItemsMock);

    useEffect(() => {
        if (!nodeToMove) {
            return;
        }
        setTimeout(() => {
            setNodes((cachedNodes) => {
                const { newNodes: nodesToSort, node } = removeNode(nodeToMove.id, cachedNodes);
                const newNodes = insertAndSortNodes(
                    nodesToSort,
                    node as TreeItemMock,
                    nodeToMove.parentId,
                    nodeToMove.sort,
                );
                return newNodes;
            });
        }, timeout);
    }, [nodeToMove, timeout]);

    return { nodes, setNodes };
};
