/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconColorFan, IconDotsHorizontal } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Tag, TagHoverContent, TagSecondaryContent } from './Tag';

type Story = StoryObj<typeof Tag>;
const meta: Meta<typeof Tag> = {
    title: 'Components/Tag',
    component: Tag,
    subcomponents: {
        'Tag.HoverContent': TagHoverContent,
        'Tag.SecondaryContent': TagSecondaryContent,
    },
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
    },
};
export default meta;

export const LabelOnly: Story = {
    render: (args) => <Tag {...args}>Text</Tag>,
};

export const WithSecondaryContent: Story = {
    render: (args) => (
        <Tag {...args}>
            Text
            <Tag.SecondaryContent>Secondary</Tag.SecondaryContent>
        </Tag>
    ),
};

export const WithOnClick: Story = {
    args: { onClick: action('onClick') },
    render: (args) => <Tag {...args}>Text</Tag>,
};

export const WithDismiss: Story = {
    args: { onDismiss: action('onDismiss') },
    render: (args) => <Tag {...args}>Text</Tag>,
};

export const WithAddable: Story = {
    args: { onAddClick: action('onAddClick') },
    render: (args) => <Tag {...args}>Text</Tag>,
};

export const WithOnClickAndDismiss: Story = {
    args: { onClick: action('onClick'), onDismiss: action('onDismiss') },
    render: (args) => <Tag {...args}>Text</Tag>,
};

export const WithIcon: Story = {
    render: (args) => (
        <Tag {...args}>
            <IconColorFan size="16" />
            Text
        </Tag>
    ),
};

export const WithIconOnBothSides: Story = {
    render: (args) => (
        <Tag {...args}>
            <IconColorFan size="16" />
            Text
            <IconColorFan size="16" />
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

export const WithHoverContent: Story = {
    args: {
        onClick: action('onClick'),
    },
    render: (args) => {
        return (
            <Tag {...args}>
                This is a tag!
                <Tag.HoverContent>
                    <div className="tw-flex tw-w-full tw-justify-center">
                        <IconDotsHorizontal />
                    </div>
                </Tag.HoverContent>
            </Tag>
        );
    },
};

export const WithSecondaryContentBefore: Story = {
    render: (args) => {
        return (
            <Tag {...args}>
                <Tag.SecondaryContent>Before</Tag.SecondaryContent>
                Main content
            </Tag>
        );
    },
};

export const WithMultipleSecondaryContent: Story = {
    render: (args) => {
        return (
            <Tag {...args}>
                <Tag.SecondaryContent>First</Tag.SecondaryContent>
                Main content
                <Tag.SecondaryContent>Second</Tag.SecondaryContent>
            </Tag>
        );
    },
};

export const WithBothSlotTypes: Story = {
    args: {
        onClick: action('onClick'),
    },
    render: (args) => {
        return (
            <Tag {...args}>
                <Tag.SecondaryContent>Prefix</Tag.SecondaryContent>
                Main content
                <Tag.HoverContent>
                    <IconDotsHorizontal />
                </Tag.HoverContent>
                <Tag.SecondaryContent>Suffix</Tag.SecondaryContent>
            </Tag>
        );
    },
};

export const MultipleTagsInRow: Story = {
    render: (args) => (
        <div className="tw-flex tw-flex-nowrap tw-border tw-border-line-mid tw-rounded-medium tw-p-2 tw-gap-2">
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
