/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { OverflowMenu, OverflowMenuProps } from './OverflowMenu';

const link = document.referrer;
const ITEMS = [
    { label: 'Item 1', link },
    { label: 'Item 2', link },
    { label: 'Item 3', link },
];

export default {
    title: 'Components/OverflowMenu',
    component: OverflowMenu,
    decorators: [
        (StoryElement) => (
            <div className="tw-h-48">
                <StoryElement />
            </div>
        ),
    ],
} as Meta<OverflowMenuProps>;

const Template: Story<OverflowMenuProps> = (args: OverflowMenuProps) => <OverflowMenu {...args} />;

export const WithLinkItems = Template.bind({});
WithLinkItems.args = { items: [...ITEMS] };

// TODO - add stories for
// Button items
// Non-clickable items
// Link items with decorator
// Button items with decorator
// Non-clickable items with decorator
// Mixed items
