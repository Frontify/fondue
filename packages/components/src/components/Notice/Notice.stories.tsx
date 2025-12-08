/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCheckMark, IconExclamationMarkTriangle, IconInfo } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Button } from '../Button/Button';

import { Notice } from './Notice';

type Story = StoryObj<typeof Notice>;
const meta: Meta<typeof Notice> = {
    title: 'Components/Notice',
    component: Notice,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in-development',
        },
    },
    args: {
        variant: 'default',
        emphasis: 'default',
        size: 'medium',
    },
};
export default meta;

export const Default: Story = {
    render: (args) => <Notice {...args}>Neutral message text</Notice>,
};

export const WithIcon: Story = {
    render: (args) => (
        <Notice {...args} icon={<IconInfo size="16" />}>
            Neutral message text
        </Notice>
    ),
};

export const WithDismiss: Story = {
    args: { onDismiss: action('onDismiss') },
    render: (args) => (
        <Notice {...args} icon={<IconInfo size="16" />}>
            Neutral message text
        </Notice>
    ),
};

export const WithAction: Story = {
    render: (args) => (
        <Notice
            {...args}
            icon={<IconInfo size="16" />}
            action={
                <Button size="small" emphasis="default" onPress={action('undo')}>
                    Undo
                </Button>
            }
        >
            Neutral message text
        </Notice>
    ),
};

export const WithActionAndDismiss: Story = {
    args: { onDismiss: action('onDismiss') },
    render: (args) => (
        <Notice
            {...args}
            icon={<IconInfo size="16" />}
            action={
                <Button size="small" emphasis="default" onPress={action('undo')}>
                    Undo
                </Button>
            }
        >
            Neutral message text
        </Notice>
    ),
};

export const VariantHighlight: Story = {
    args: { variant: 'highlight' },
    render: (args) => (
        <Notice {...args} icon={<IconInfo size="16" />}>
            Highlight message text
        </Notice>
    ),
};

export const VariantPositive: Story = {
    args: { variant: 'positive' },
    render: (args) => (
        <Notice {...args} icon={<IconCheckMark size="16" />}>
            Success message text
        </Notice>
    ),
};

export const VariantDanger: Story = {
    args: { variant: 'danger' },
    render: (args) => (
        <Notice {...args} icon={<IconExclamationMarkTriangle size="16" />}>
            Error message text
        </Notice>
    ),
};

export const VariantWarning: Story = {
    args: { variant: 'warning' },
    render: (args) => (
        <Notice {...args} icon={<IconExclamationMarkTriangle size="16" />}>
            Warning message text
        </Notice>
    ),
};

export const EmphasisStrong: Story = {
    args: { emphasis: 'strong', variant: 'positive' },
    render: (args) => (
        <Notice {...args} icon={<IconCheckMark size="16" />}>
            Strong emphasis message
        </Notice>
    ),
};

export const EmphasisWeak: Story = {
    args: { emphasis: 'weak', variant: 'positive' },
    render: (args) => (
        <Notice {...args} icon={<IconCheckMark size="16" />}>
            Weak emphasis message
        </Notice>
    ),
};

export const SizeLarge: Story = {
    args: { size: 'large' },
    render: (args) => (
        <Notice
            {...args}
            icon={<IconInfo size="20" />}
            action={
                <Button size="small" emphasis="default" onPress={action('undo')}>
                    Undo
                </Button>
            }
            onDismiss={action('onDismiss')}
        >
            This is a large notice with more vertical space
        </Notice>
    ),
};

export const AllVariants: Story = {
    render: (args) => (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <Notice {...args} variant="default" icon={<IconInfo size="16" />}>
                Default variant
            </Notice>
            <Notice {...args} variant="highlight" icon={<IconInfo size="16" />}>
                Highlight variant
            </Notice>
            <Notice {...args} variant="positive" icon={<IconCheckMark size="16" />}>
                Positive variant
            </Notice>
            <Notice {...args} variant="danger" icon={<IconExclamationMarkTriangle size="16" />}>
                Danger variant
            </Notice>
            <Notice {...args} variant="warning" icon={<IconExclamationMarkTriangle size="16" />}>
                Warning variant
            </Notice>
        </div>
    ),
};

export const AllEmphasis: Story = {
    args: { variant: 'positive' },
    render: (args) => (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <Notice {...args} emphasis="strong" icon={<IconCheckMark size="16" />}>
                Strong emphasis
            </Notice>
            <Notice {...args} emphasis="default" icon={<IconCheckMark size="16" />}>
                Default emphasis
            </Notice>
            <Notice {...args} emphasis="weak" icon={<IconCheckMark size="16" />}>
                Weak emphasis
            </Notice>
        </div>
    ),
};

export const LongContent: Story = {
    render: (args) => (
        <Notice
            {...args}
            icon={<IconInfo size="16" />}
            action={
                <Button size="small" emphasis="default" onPress={action('learn-more')}>
                    Learn More
                </Button>
            }
            onDismiss={action('onDismiss')}
        >
            This is a notice with much longer content to demonstrate how the component handles text wrapping. The
            content area should expand to accommodate all the text while maintaining proper spacing between elements.
        </Notice>
    ),
};
