/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';

import { Checkbox } from '../Checkbox/Checkbox';
import { TextInput } from '../TextInput/TextInput';
import { Tooltip } from '../Tooltip/Tooltip';

import { Label, LabelComponent } from './Label';

type Story = StoryObj<typeof LabelComponent>;
const meta: Meta<typeof LabelComponent> = {
    title: 'Components/Label',
    component: LabelComponent,
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
            <div className="tw-flex tw-gap-1.5">
                <Checkbox id="input" aria-labelledby="label" />
                <Label {...args} id="label" htmlFor="input" />
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
            <div className="tw-flex tw-flex-col tw-gap-1.5">
                <Label {...args} htmlFor="input">
                    Hello World
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <IconIcon size={16} />
                        </Tooltip.Trigger>
                        <Tooltip.Content>Tooltip</Tooltip.Content>
                    </Tooltip.Root>
                </Label>
                <STextInput id="input" placeholder="Enter your name" />
            </div>
        );
    },
};
