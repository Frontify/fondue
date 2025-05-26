/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconColorFan } from '@frontify/fondue-icons';
import { action } from '@storybook/addon-actions';
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
        variant: 'default',
        dismissable: false,
        disabled: false,
        status: undefined,
    },
};
export default meta;

export const LabelOnly: Story = {
    render: (args) => <Badge {...args}>Text</Badge>,
};

export const WithOnClick: Story = {
    render: (args) => (
        <Badge {...args} onClick={action('onClick')}>
            Text
        </Badge>
    ),
};

export const BadgeWithIcon: Story = {
    render: (args) => (
        <Badge {...args}>
            <IconColorFan size="16" />
            Text
        </Badge>
    ),
};
