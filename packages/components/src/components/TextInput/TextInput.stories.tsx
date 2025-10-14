/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon, IconPen } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';
import { action } from 'storybook/actions';

import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';

import { TextFieldRoot, TextFieldSlot, TextInput } from './TextInput';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof TextFieldRoot> = {
    title: 'Components/Text Input',
    component: TextFieldRoot,
    subcomponents: {
        'TextInput.Slot': TextFieldSlot,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        placeholder: 'Placeholder',
        defaultValue: 'Hello from Frontify',
        onChange: action('onChange'),
        onBlur: action('onBlur'),
        onFocus: action('onFocus'),
    },
    render: (args) => {
        // Used to get the correct component in the Storybook for the simple cases (`TextInput` instead of `TextInput.Root`)
        // More complex cases are using the Story `render` function
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
        <>
            <TextInput {...args} />
            <TextInput.Root {...args}>
                <TextInput.Slot>
                    <IconIcon size={16} />
                </TextInput.Slot>
                <TextInput.Slot name="right">
                    <Button aspect="square" rounding="full" emphasis="weak" size="small" disabled>
                        <IconIcon size={16} />
                    </Button>
                </TextInput.Slot>
            </TextInput.Root>
        </>
    ),
    decorators: [
        (Story) => (
            <div className="tw-flex tw-flex-col tw-gap-4">
                <Story />
            </div>
        ),
    ],
};

export const Readonly: Story = {
    args: {
        readOnly: true,
    },
    render: (args) => (
        <>
            <TextInput {...args} />

            <TextInput.Root {...args}>
                <TextInput.Slot>
                    <IconIcon size={16} />
                </TextInput.Slot>
                <TextInput.Slot name="right">
                    {!args.readOnly ? (
                        <Button aspect="square" rounding="full" emphasis="weak" size="small" disabled>
                            <IconIcon size={16} />
                        </Button>
                    ) : null}
                </TextInput.Slot>
            </TextInput.Root>
        </>
    ),
    decorators: [
        (Story) => (
            <div className="tw-flex tw-flex-col tw-gap-4">
                <Story />
            </div>
        ),
    ],
};

export const WithLeftItem: Story = {
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot name="left">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const WithRightItem: Story = {
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot name="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const WithLeftAndRightItem: Story = {
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot name="left">
                <IconPen size={16} />
            </TextInput.Slot>
            <TextInput.Slot name="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const WithButtons: Story = {
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot name="right">
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

export const WithLabel: Story = {
    render: (args) => (
        <div className="tw-flex tw-flex-col tw-gap-2">
            <Label htmlFor="text-input">Label</Label>

            <TextInput.Root {...args} id="text-input">
                <TextInput.Slot name="left">
                    <IconPen size={16} />
                </TextInput.Slot>
                <TextInput.Slot name="right">
                    <IconIcon size={16} />
                </TextInput.Slot>
            </TextInput.Root>
        </div>
    ),
};

export const Success: Story = {
    args: {
        status: 'success',
    },
    render: (args) => (
        <Flex gap={2} direction="column">
            <TextInput {...args} />
            <TextInput.Root {...args}>
                <TextInput.Slot name="left">
                    <IconPen size={16} />
                </TextInput.Slot>
                <TextInput.Slot name="right">
                    <IconIcon size={16} />
                </TextInput.Slot>
            </TextInput.Root>
        </Flex>
    ),
};

export const Errored: Story = {
    args: {
        status: 'error',
    },
    render: (args) => (
        <Flex gap={2} direction="column">
            <TextInput {...args} />
            <TextInput.Root {...args}>
                <TextInput.Slot name="left">
                    <IconPen size={16} />
                </TextInput.Slot>
                <TextInput.Slot name="right">
                    <IconIcon size={16} />
                </TextInput.Slot>
            </TextInput.Root>
        </Flex>
    ),
};

export const Loading: Story = {
    args: {
        status: 'loading',
    },
    render: (args) => (
        <TextInput.Root {...args}>
            <TextInput.Slot name="left">
                <IconPen size={16} />
            </TextInput.Slot>
            <TextInput.Slot name="right">
                <IconIcon size={16} />
            </TextInput.Slot>
        </TextInput.Root>
    ),
};
