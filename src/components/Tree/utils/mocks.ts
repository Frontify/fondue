/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TreeItemProps } from '../types';

export type TreeItemMock = TreeItemProps & {
    nodes?: TreeItemMock[];
};

const uncategorizedPagesMock: TreeItemMock[] = [
    {
        id: '1-1-1',
        label: 'Home',
        type: 'level-2-item',
        accepts: 'level-2-item',
    },
    {
        id: '1-1-2',
        label: 'Members',
        type: 'level-2-item',
        accepts: 'level-2-item',
    },
    {
        id: '1-1-3',
        label: 'About us',
        type: 'level-2-item',
        accepts: 'level-2-item',
    },
];

const testSubCategoryMock: TreeItemMock[] = [
    {
        id: '1-2-3-1',
        label: 'SubItem 1',
        type: 'level-3-item',
        accepts: 'level-3-item',
    },
    {
        id: '1-2-3-2',
        label: 'SubItem 2',
        type: 'level-3-item',
        accepts: 'level-3-item',
    },
    {
        id: '1-2-3-3',
        label: 'SubItem 3',
        type: 'level-3-item',
        accepts: 'level-3-item',
    },
];

const testCategoryMock: TreeItemMock[] = [
    {
        id: '1-2-1',
        label: 'Home Category Test Category',
        type: 'level-2-item',
        accepts: 'level-2-item',
    },
    {
        id: '1-2-2',
        label: 'Members Category',
        type: 'level-2-item',
        accepts: 'level-2-item',
    },
    {
        id: '1-2-3',
        label: 'About us Category',
        type: 'level-2-item',
        accepts: 'level-2-item',
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
                label: 'Document Category 1',
                nodes: uncategorizedPagesMock,
                type: 'level-1-item',
                accepts: 'level-1-item',
            },
            {
                id: '1-2',
                label: 'Document Category 2',
                nodes: testCategoryMock,
                type: 'level-1-item',
                accepts: 'level-1-item',
            },
            {
                id: '1-3',
                label: 'Document Page 1',
                type: 'level-1-item',
                accepts: 'level-1-item',
            },
            {
                id: '1-4',
                label: 'Document Page 2',
                type: 'level-1-item',
                accepts: ['level-0-item', 'level-1-item'].join(', '),
            },
            {
                id: '1-5',
                label: 'Document Page 3',
                type: 'level-1-item',
                accepts: 'level-1-item',
            },
        ],
        type: 'level-0-item',
        accepts: ['level-0-item', 'level-1-item-within'].join(', '),
    },
    {
        id: '2',
        label: 'Design System Testing - Root Childless',
        type: 'level-0-item',
        accepts: ['level-0-item', 'level-1-item', 'level-1-item-within'].join(', '),
    },
    {
        id: '3',
        label: 'Design System Testing - Not draggable',
        type: 'level-0-item',
        accepts: ['level-0-item', 'level-1-item-within'].join(', '),
        draggable: false,
    },
];
