/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ActionMenuBlock, MenuItemStyle } from '..';
import { IconArrowCircleUp, IconArrowOutExternal, IconCrop, IconCross, IconImageStack } from '@foundation/Icon';

export const assetInputActions = [
    {
        id: 'block1',
        ariaLabel: 'First section',
        menuItems: [
            {
                id: '1',
                title: 'Replace with Asset',
                decorator: <IconImageStack />,
            },
            {
                id: '2',
                title: 'Replace with Upload',
                decorator: <IconArrowCircleUp />,
            },
        ],
    },
    {
        id: 'block2',
        ariaLabel: 'Second section',
        menuItems: [
            {
                id: '10',
                title: 'Crop / Resize',
                decorator: <IconCrop />,
            },
            {
                id: '11',
                title: 'Small warning',
                decorator: <IconArrowOutExternal />,
            },
        ],
    },
    {
        id: 'block3',
        ariaLabel: 'Third section',
        menuItems: [
            {
                id: '20',
                title: 'Remove',
                style: MenuItemStyle.Danger,
                decorator: <IconCross />,
            },
        ],
    },
] as ActionMenuBlock[];
