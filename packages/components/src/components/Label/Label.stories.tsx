/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';

import { Checkbox } from '../Checkbox/Checkbox';
import { TextInput } from '../TextInput/TextInput';

import { Label } from './Label';

type Story = StoryObj<typeof Label>;
const meta: Meta<typeof Label> = {
    title: 'Components/Label',
    component: Label,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        children: 'Label',
    },
};
export default meta;

export const Mandatory: Story = {
    args: {
        required: true,
    },
    render: (args) => {
        // Used to get the correct component name in the Storybook of the `TextInput` (instead of `TextInput.Root`)
        const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
        STextInput.displayName = 'TextInput';

        return (
            <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input" />
                <STextInput id="input" placeholder="Enter your name" />
            </div>
        );
    },
};

export const WithTextInput: Story = {
    args: {
        children: 'Hello World',
    },
    render: (args) => {
        // Used to get the correct component name in the Storybook of the `TextInput` (instead of `TextInput.Root`)
        const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
        STextInput.displayName = 'TextInput';

        return (
            <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input" />
                <STextInput id="input" placeholder="Enter your name" />
            </div>
        );
    },
};

export const WithDisabledInput: Story = {
    args: {
        children: 'Hello World',
    },
    render: (args) => {
        // Used to get the correct component name in the Storybook of the `TextInput` (instead of `TextInput.Root`)
        const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
        STextInput.displayName = 'TextInput';

        return (
            <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input" />
                <STextInput id="input" placeholder="Enter your name" disabled />
            </div>
        );
    },
};

export const WithCheckbox: Story = {
    args: {
        children: 'Hello World',
    },
    render: (args) => {
        // Used to get the correct component name in the Storybook of the `TextInput` (instead of `TextInput.Root`)
        const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
        STextInput.displayName = 'TextInput';

        return (
            <div className="tw-flex tw-gap-2">
                <Checkbox id="input" />
                <Label {...args} htmlFor="input" />
            </div>
        );
    },
};

export const WithTooltip: Story = {
    args: {
        required: true,
    },
    render: (args) => {
        // Used to get the correct component name in the Storybook of the `TextInput` (instead of `TextInput.Root`)
        const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
        STextInput.displayName = 'TextInput';

        return (
            <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input">
                    Hello World
                    <IconIcon size={16} /> {/* TODO: Update with Tooltip when refactored */}
                </Label>
                <STextInput id="input" placeholder="Enter your name" />
            </div>
        );
    },
};
