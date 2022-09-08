import { MenuItemContentSize } from '@components/MenuItem';
import { IconJohanna } from '@foundation/Icon';
import React from 'react';
import { TreeFlatListItem, TreeNodeItem } from '@components/Tree';
import { DraggableItem } from '@utilities/dnd';
import { Badge } from '../../..';
import { Button, ButtonSize } from '@components/Button';

export const mockActionMenuBlocks = [
    {
        id: 'dropdownBlock',
        ariaLabel: 'Dropdown block',
        menuItems: [
            {
                id: 'dropdown',
                size: MenuItemContentSize.Small,
                title: 'Dropdown',
                onClick: () => console.log('dropdown'),
            },
        ],
    },
    {
        id: 'actionsBlock',
        ariaLabel: 'Item Actions',
        menuItems: [
            {
                id: 'rename',
                size: MenuItemContentSize.Small,
                title: 'Rename',
                onClick: () => console.log('rename'),
            },
            {
                id: 'duplicate',
                size: MenuItemContentSize.Small,
                title: 'Duplicate',
                onClick: () => console.log('duplicate'),
            },
            {
                id: 'unpublish',
                size: MenuItemContentSize.Small,
                title: 'Unpublish',
                onClick: () => console.log('unpublish'),
            },
        ],
    },
    {
        id: 'deleteBlock',
        ariaLabel: 'Delete Block',
        menuItems: [
            {
                id: 'delete',
                size: MenuItemContentSize.Small,
                title: 'Delete',
                onClick: () => console.log('delete'),
            },
        ],
    },
];

const uncategorizedPagesNodes = [
    {
        id: '1-1-1',
        parentId: '1-1',
        sort: 1,
        name: 'Home',
        label: 'Page',
        value: 'https://weare.frontify.com/page/1',
        icon: <IconJohanna />,
    },
    {
        id: '1-1-2',
        parentId: '1-1',
        name: 'Members',
        label: 'Page',
        value: 'https://weare.frontify.com/page/2',
        icon: <IconJohanna />,
        sort: null,
    },
    {
        id: '1-1-3',
        parentId: '1-1',
        name: 'About us',
        label: 'Page',
        value: 'https://weare.frontify.com/page/3',
        icon: <IconJohanna />,
        sort: null,
        editable: true,
    },
];

const testCategoryNodes = [
    {
        id: '1-2-1',
        parentId: '1-2',
        name: 'Home Category',
        label: 'Home Page',
        value: 'https://weare.frontify.com/page/4',
        icon: <IconJohanna />,
        sort: null,
        badge: <Badge icon={<IconJohanna />}></Badge>,
        editable: true,
    },
    {
        id: '1-2-2',
        parentId: '1-2',
        name: 'Members Category',
        label: 'Members Page',
        value: 'https://weare.frontify.com/page/5',
        icon: <IconJohanna />,
        sort: null,
    },
    {
        id: '1-2-3',
        parentId: '1-2',
        name: 'About us Category',
        label: 'About Us Page',
        value: 'https://weare.frontify.com/page/6',
        icon: <IconJohanna />,
        sort: null,
        badge: <Badge>Hello, I am a badge</Badge>,
    },
];

type mockNodeType = () => DraggableItem<TreeFlatListItem>[];

export const mockNodesFlat: mockNodeType = () => [
    {
        id: '1',
        name: 'Design System Testing',
        label: 'Document',
        value: 'https://weare.frontify.com/document/1',
        icon: <IconJohanna></IconJohanna>,
        actions: [<Button key={'Design System Testing'} size={ButtonSize.Small} icon={<IconJohanna></IconJohanna>} />],
        parentId: null,
        sort: 1,
        editable: true,
    },
    {
        id: '1-1',
        name: 'Uncategorizes Pages',
        icon: <IconJohanna />,
        actions: [
            <Button key={'Design System Testing Uncategorizes Pages'} size={ButtonSize.Small} icon={<IconJohanna />} />,
        ],
        parentId: '1',
        sort: 1,
    },
    ...uncategorizedPagesNodes,
    {
        id: '1-2',
        parentId: '1',
        name: 'Test Category',
        label: 'Document',
        icon: <IconJohanna />,
        actions: [
            <Button
                key={'Design System Testing Uncategorizes Pages Test'}
                size={ButtonSize.Small}
                icon={<IconJohanna />}
            />,
        ],
        value: 'https://weare.frontify.com/document/923#/test',
        sort: null,
        badge: <IconJohanna />,
    },
    ...testCategoryNodes,
    {
        id: '1-3',
        name: 'Category Without Subitems',
        icon: <IconJohanna />,
        actions: [
            <Button
                key={'Design System Testing Uncategorizes Pages Test Subitems'}
                size={ButtonSize.Small}
                icon={<IconJohanna />}
            />,
        ],
        parentId: '1',
        value: 'https://weare.frontify.com/document/923#/test',
        sort: null,
    },
];

export const mockNodesTree: DraggableItem<TreeNodeItem>[] = [
    {
        id: '1',
        name: 'Design System Testing',
        label: 'Document',
        value: 'https://weare.frontify.com/document/1',
        icon: <IconJohanna />,
        parentId: null,
        sort: 1,
        nodes: [
            {
                id: '1-1',
                name: 'Uncategorizes Pages',
                icon: <IconJohanna />,
                parentId: '1',
                sort: 1,
                nodes: [...uncategorizedPagesNodes],
            },
            {
                id: '1-2',
                parentId: '1',
                name: 'Test Category',
                label: 'Document',
                icon: <IconJohanna />,
                value: 'https://weare.frontify.com/document/923#/test',
                sort: null,
                nodes: [...testCategoryNodes],
            },
        ],
    },
];
