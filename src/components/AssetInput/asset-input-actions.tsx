import React from 'react';
import { ActionMenuBlock, MenuItemStyle } from '..';
import { IconCrop, IconExternalLink, IconImageLibrary, IconReject, IconUploadAlternative } from '../..';

export const assetInputActions = [
    {
        id: 'block1',
        ariaLabel: 'First section',
        menuItems: [
            {
                id: '1',
                title: 'Replace with Asset',
                decorator: <IconImageLibrary />,
            },
            {
                id: '2',
                title: 'Replace with Upload',
                decorator: <IconUploadAlternative />,
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
                decorator: <IconExternalLink />,
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
                decorator: <IconReject />,
            },
        ],
    },
] as ActionMenuBlock[];
