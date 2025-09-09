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
        size: 'default',
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
    args: { onDismiss: action('onDismiss') },
    render: (args) => <Badge {...args}>Text</Badge>,
};

export const WithOnClickAndDismiss: Story = {
    args: { onClick: action('onClick'), onDismiss: action('onDismiss') },
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

export const WithOnClickAndIcon: Story = {
    args: { onClick: action('onClick') },
    render: (args) => (
        <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
    ),
};

export const WithStatusAndIcon: Story = {
    args: { status: 'positive' },
    render: (args) => (
        <Badge {...args}>
            <IconColorFan size="16" /> Text
        </Badge>
    ),
};

export const BetweenElements: Story = {
    args: { status: 'positive' },
    render: (args) => (
        <>
            before{' '}
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>{' '}
            after
        </>
    ),
};

export const MultipleBadgesInRow: Story = {
    args: { status: 'positive' },
    render: (args) => (
        <div className="tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2">
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
            <Badge {...args}>
                <IconColorFan size="16" /> Text
            </Badge>
        </div>
    ),
};
