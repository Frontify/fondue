/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ActionMenuBlock } from '@components/ActionMenu/ActionMenu';
import { MenuItemStyle } from '@components/MenuItem/types';
import IconArrowCircleUp from '@foundation/Icon/Generated/IconArrowCircleUp';
import IconArrowOutExternal from '@foundation/Icon/Generated/IconArrowOutExternal';
import IconCrop from '@foundation/Icon/Generated/IconCrop';
import IconCross from '@foundation/Icon/Generated/IconCross';
import IconImageStack from '@foundation/Icon/Generated/IconImageStack';

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
