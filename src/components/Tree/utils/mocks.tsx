/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, ReactNode } from 'react';
import { IconDocument16, IconFaceExtraHappy16, IconFolder16, IconPlus, IconPlus16, IconProps } from '@foundation/Icon';

import { Badge, BadgeProps } from '@components/Badge';
import { Button, ButtonSize } from '@components/Button';
import { MenuItemContentSize } from '@components/MenuItem';
import { DraggableItem } from '@utilities/dnd';

type TreeFlatListItem = {
    icon?: ReactElement<IconProps>;
    label: string;
    value?: string;
    actions?: ReactNode[];
    badge?: ReactElement<IconProps> | ReactElement<BadgeProps>;
    tooltipContent?: ReactNode;
    editable?: boolean;
    forceCaret?: boolean;
};

export type TreeNodeItem = TreeFlatListItem & {
    nodes?: DraggableItem<TreeNodeItem>[];
};

export const actionMenuBlocksMock = [
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
        sort: 1,
        label: 'Home',
        value: 'https://weare.frontify.com/page/1',
        icon: <IconDocument16 />,
    },
    {
        id: '1-1-2',
        label: 'Members',
        value: 'https://weare.frontify.com/page/2',
        icon: <IconDocument16 />,
        sort: 2,
    },
    {
        id: '1-1-3',
        label: 'About us',
        value: 'https://weare.frontify.com/page/3',
        icon: <IconDocument16 />,
        sort: 3,
        editable: true,
    },
];

const testSubCategoryNodes = [
    {
        id: '1-2-3-1',
        label: 'SubItem 1',
        value: 'https://weare.frontify.com/page/4',
        icon: <IconDocument16 />,
        sort: 1,
        badge: <Badge icon={<IconFaceExtraHappy16 />}></Badge>,
        editable: true,
    },
    {
        id: '1-2-3-2',
        label: 'SubItem 2',
        value: 'https://weare.frontify.com/page/5',
        icon: <IconDocument16 />,
        sort: 2,
    },
    {
        id: '1-2-3-3',
        label: 'SubItem 3',
        value: 'https://weare.frontify.com/page/6',
        icon: <IconDocument16 />,
        sort: 3,
        badge: <Badge>Hello, I am a badge</Badge>,
        tooltipContent: 'Hello, I am tooltip content',
        actions: [<Button key="About Us Page Test" size={ButtonSize.Small} icon={<IconPlus16 />} />],
    },
];

const testCategoryNodes = [
    {
        id: '1-2-1',
        label: 'Home Category Test Category',
        value: 'https://weare.frontify.com/page/4',
        icon: <IconDocument16 />,
        sort: 1,
        badge: <Badge icon={<IconFaceExtraHappy16 />}></Badge>,
        editable: true,
    },
    {
        id: '1-2-2',
        label: 'Members Category',
        value: 'https://weare.frontify.com/page/5',
        icon: <IconDocument16 />,
        sort: 2,
    },
    {
        id: '1-2-3',
        label: 'About us Category',
        value: 'https://weare.frontify.com/page/6',
        icon: <IconDocument16 />,
        sort: 3,
        badge: <Badge>Hello, I am a badge</Badge>,
        tooltipContent: 'Hello, I am tooltip content',
        actions: [<Button key="About Us Page Test" size={ButtonSize.Small} icon={<IconPlus16 />} />],
        nodes: testSubCategoryNodes,
    },
];

type nodeMockType = () => DraggableItem<TreeFlatListItem>[];

export const nodesFlatMock: nodeMockType = () => [
    {
        id: '1',
        label: 'Design System Testing',
        value: 'https://weare.frontify.com/document/1',
        icon: <IconFolder16 />,
        actions: [<Button key="Design System Testing" size={ButtonSize.Small} icon={<IconPlus16 />} />],
        sort: 1,
        editable: true,
    },
    {
        id: '1-1',
        label: 'Uncategorizes Pages',
        icon: <IconFolder16 />,
        actions: [
            <Button key="Design System Testing Uncategorizes Pages" size={ButtonSize.Small} icon={<IconPlus16 />} />,
        ],
        sort: 2,
    },
    ...uncategorizedPagesNodes,
    {
        id: '1-2',
        label: 'Test Category',
        icon: <IconFolder16 />,
        actions: [
            <Button
                key="Design System Testing Uncategorizes Pages Test"
                size={ButtonSize.Small}
                icon={<IconPlus16 />}
            />,
        ],
        value: 'https://weare.frontify.com/document/923#/test',
        sort: 4,
        badge: <IconFaceExtraHappy16 />,
    },
    ...testCategoryNodes,
    {
        id: '1-3',
        label: 'Category Without Subitems',
        icon: <IconFolder16 />,
        actions: [
            <Button
                key="Design System Testing Uncategorizes Pages Test Subitems"
                size={ButtonSize.Small}
                icon={<IconPlus16 />}
            />,
        ],
        value: 'https://weare.frontify.com/document/923#/test',
        sort: 5,
    },
];

export const treeNodesMock: DraggableItem<TreeNodeItem>[] = [
    {
        id: '1',
        label: 'Design System Testing - Deep Nested Items',
        value: 'https://weare.frontify.com/document/1',
        icon: <IconFolder16 />,
        sort: 1,
        actions: [<Button key="Design System Testing" size={ButtonSize.Small} icon={<IconPlus />} />],
        nodes: [
            {
                id: '1-1',
                label: 'Uncategorizes Pages',
                icon: <IconFolder16 />,
                sort: 1,
                actions: [
                    <Button
                        key="Design System Testing Uncategorizes Pages"
                        size={ButtonSize.Small}
                        icon={<IconPlus />}
                    />,
                ],
                nodes: [...uncategorizedPagesNodes],
            },
            {
                id: '1-2',
                label: 'Test Category',
                icon: <IconFolder16 />,
                value: 'https://weare.frontify.com/document/923#/test',
                sort: 2,
                actions: [
                    <Button
                        key="Design System Testing Uncategorizes Pages Test"
                        size={ButtonSize.Small}
                        icon={<IconPlus />}
                    />,
                ],
                nodes: [...testCategoryNodes],
            },
        ],
    },
    {
        id: '2',
        label: 'Design System Testing - Root Childless',
        value: 'https://weare.frontify.com/document/1',
        icon: <IconFolder16 />,
        sort: 2,
    },
];
