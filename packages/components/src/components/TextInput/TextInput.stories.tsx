/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';

import { Button } from '../Button/Button';

import { TextInput } from './TextInput';

type Story = StoryObj<typeof TextInput>;
const meta: Meta<typeof TextInput> = {
    title: 'Components/Text Input',
    component: TextInput,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        placeholder: 'Placeholder',
        defaultValue: 'Hello from Frontify',
    },
    render: (args) => {
        // Used to get the correct component in the Storybook for the simple cases (`TextInput` instead of `TextInput.Root`)
        const Component = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
        Component.displayName = 'TextInput';
        return <Component {...args} />;
    },
};
export default meta;

export const Text: Story = {};

export const Password: Story = {
    args: {
        type: 'password',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot>
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const WithLeftItem: Story = {
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot side="left">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const WithRightItem: Story = {
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot side="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const WithLeftAndRightItem: Story = {
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot side="left">
                <IconIcon size={16} />
            </TextInput.Slot>
            <TextInput.Slot side="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const WithButtons: Story = {
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot side="right">
                <Button aspect="square" rounding="full" emphasis="weak" size="small">
                    <IconIcon size={16} />
                </Button>
                <Button aspect="square" rounding="full" emphasis="weak" size="small">
                    <IconIcon size={16} />
                </Button>
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const Success: Story = {
    args: {
        status: 'success',
    },
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot side="left">
                <IconIcon size={16} />
            </TextInput.Slot>
            <TextInput.Slot side="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const Errored: Story = {
    args: {
        status: 'error',
    },
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot side="left">
                <IconIcon size={16} />
            </TextInput.Slot>
            <TextInput.Slot side="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const Loading: Story = {
    args: {
        status: 'loading',
    },
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot side="left">
                <IconIcon size={16} />
            </TextInput.Slot>
            <TextInput.Slot side="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};
