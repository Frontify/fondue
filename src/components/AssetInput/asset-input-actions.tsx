import React from 'react';
import { ActionMenuBlock, MenuItemStyle } from '..';
import { IconJohanna } from '@foundation/Icon';

export const assetInputActions = [
    {
        id: 'block1',
        ariaLabel: 'First section',
        menuItems: [
            {
                id: '1',
                title: 'Replace with Asset',
                decorator: <IconJohanna />,
            },
            {
                id: '2',
                title: 'Replace with Upload',
                decorator: <IconJohanna />,
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
                decorator: <IconJohanna />,
            },
            {
                id: '11',
                title: 'Small warning',
                decorator: <IconJohanna />,
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
                decorator: <IconJohanna />,
            },
        ],
    },
] as ActionMenuBlock[];
