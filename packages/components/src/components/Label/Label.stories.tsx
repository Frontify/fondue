/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon, IconQuestionMarkCircle } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';

import { Checkbox } from '../Checkbox/Checkbox';
import { Select } from '../Select/Select';
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
            type: 'released',
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
                <Label {...args} htmlFor="input-mandatory" />
                <STextInput id="input-mandatory" placeholder="Enter your name" />
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
                <Label {...args} htmlFor="input-text" />
                <STextInput id="input-text" placeholder="Enter your name" />
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
                <Label {...args} htmlFor="input-disabled" />
                <STextInput id="input-disabled" placeholder="Enter your name" disabled />
            </div>
        );
    },
};

export const WithSelect: Story = {
    args: {
        children: 'Hello World',
    },
    render: (args) => {
        return (
            <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} id="label-select" htmlFor="select" />
                <Select id="select" aria-labelledby="label-select" placeholder="Select...">
                    <Select.Item value="1">Option 1</Select.Item>
                    <Select.Item value="2">Option 2</Select.Item>
                </Select>
            </div>
        );
    },
};

export const WithCombobox: Story = {
    args: {
        children: 'Hello World',
    },
    render: (args) => {
        return (
            <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} id="label-combobox" htmlFor="combobox" />
                <Select.Combobox id="combobox" aria-labelledby="label-combobox" placeholder="Select...">
                    <Select.Item value="1">Option 1</Select.Item>
                    <Select.Item value="2">Option 2</Select.Item>
                </Select.Combobox>
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
                <Checkbox id="input-checkbox" aria-labelledby="label" />
                <Label {...args} id="label" htmlFor="input-checkbox" />
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
                <Label {...args} htmlFor="input-tooltip">
                    Hello World
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <IconQuestionMarkCircle size={16} />
                        </Tooltip.Trigger>
                        <Tooltip.Content>Tooltip</Tooltip.Content>
                    </Tooltip.Root>
                </Label>
                <STextInput id="input-tooltip" placeholder="Enter your name" />
            </div>
        );
    },
};
