/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Badge } from './Badge';

type Story = StoryObj<typeof Badge>;
const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        emphasis: 'strong',
        style: 'default',
        disabled: false,
    },
};
export default meta;

export const Default: Story = {
    name: 'Badge',
    render: (args) => <Badge {...args}>Text</Badge>,
};
