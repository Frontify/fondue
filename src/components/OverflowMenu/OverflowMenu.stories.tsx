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

const BUTTON_ITEMS = [
    { label: 'Button Item 1', onClick: () => void 0 },
    { label: 'Button Item 2', onClick: () => void 0 },
    { label: 'Button Item 3', onClick: () => void 0 },
];

const SPAN_ITEMS = [{ label: 'Span Item 1' }, { label: 'Span Item 2' }, { label: 'Span Item 3' }];

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

export const WithButtonItems = Template.bind({});
WithButtonItems.args = { items: [...BUTTON_ITEMS] };

export const WithSpanItems = Template.bind({});
WithSpanItems.args = { items: [...SPAN_ITEMS] };

// TODO - add stories for
// Link items with decorator
// Button items with decorator
// Non-clickable items with decorator
// Mixed items
