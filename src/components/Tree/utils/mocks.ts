/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeItemProps } from '../types';

export type TreeItemMock = TreeItemProps & {
    nodes?: TreeItemMock[];
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

export const treeItemsMock: TreeItemMock[] = [
    {
        id: '1',
        label: 'Design System Testing - Deep Nested Items',
        nodes: [
            {
                id: '1-1',
                label: 'Uncategorizes Pages',
                nodes: uncategorizedPagesMock,
            },
            {
                id: '1-2',
                label: 'Test Category',
                nodes: testCategoryMock,
            },
            {
                id: '1-3',
                label: 'Test Something',
            },
        ],
    },
    {
        id: '2',
        label: 'Design System Testing - Root Childless',
    },
];
