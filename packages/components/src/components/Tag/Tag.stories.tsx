/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconColorFan } from '@frontify/fondue-icons';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

import { Tag } from './Tag';

type Story = StoryObj<typeof Tag>;
const meta: Meta<typeof Tag> = {
    title: 'Components/Tag',
    component: Tag,
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
        dismissable: false,
        disabled: false,
    },
};
export default meta;

export const LabelOnly: Story = {
    render: (args) => <Tag {...args}>Text</Tag>,
};

export const WithOnClick: Story = {
    args: { onClick: action('onClick') },
    render: (args) => <Tag {...args}>Text</Tag>,
};

export const WithDismiss: Story = {
    args: { dismissable: true, onDismiss: action('onDismiss') },
    render: (args) => <Tag {...args}>Text</Tag>,
};

export const WithOnClickAndDismiss: Story = {
    args: { onClick: action('onClick'), dismissable: true, onDismiss: action('onDismiss') },
    render: (args) => <Tag {...args}>Text</Tag>,
};

export const WithIcon: Story = {
    render: (args) => (
        <Tag {...args}>
            <IconColorFan size="16" /> Text
        </Tag>
    ),
};

export const WithOnClickAndIcon: Story = {
    args: { onClick: action('onClick') },
    render: (args) => (
        <Tag {...args}>
            <IconColorFan size="16" /> Text
        </Tag>
    ),
};

export const BetweenElements: Story = {
    render: (args) => (
        <>
            before{' '}
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>{' '}
            after
        </>
    ),
};

export const MultipleTagsInRow: Story = {
    render: (args) => (
        <div className="tw-flex tw-flex-nowrap tw-border tw-border-line tw-rounded tw-p-2 tw-gap-2">
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
            <Tag {...args}>
                <IconColorFan size="16" /> Text
            </Tag>
        </div>
    ),
};
