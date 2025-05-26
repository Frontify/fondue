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
    args: { onClick: action('onClick') },
    render: (args) => <Badge {...args}>Text</Badge>,
};

export const WithDismiss: Story = {
    args: { dismissable: true, onDismiss: action('onDismiss') },
    render: (args) => <Badge {...args}>Text</Badge>,
};

export const WithOnClickAndDismiss: Story = {
    args: { onClick: action('onClick'), dismissable: true, onDismiss: action('onDismiss') },
    render: (args) => <Badge {...args}>Text</Badge>,
};

export const WithStatus: Story = {
    args: { status: 'positive' },
    render: (args) => <Badge {...args}>Text</Badge>,
};

export const WithCustomStatusColor: Story = {
    args: { status: { red: 40, green: 200, blue: 100, alpha: 1 } },
    render: (args) => <Badge {...args}>Text</Badge>,
};

export const WithCustomStatusString: Story = {
    args: { status: '#f14394' },
    render: (args) => <Badge {...args}>Text</Badge>,
};

export const WithIcon: Story = {
    render: (args) => (
        <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
    ),
};
