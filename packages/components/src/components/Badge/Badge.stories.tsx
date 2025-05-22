/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconColorFan } from '@frontify/fondue-icons';
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

export const BadgeWithIcon: Story = {
    name: 'Badge with Icon',
    render: (args) => (
        <Badge {...args}>
            <IconColorFan size="16" />
            Text
        </Badge>
    ),
};
