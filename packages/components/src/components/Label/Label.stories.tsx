/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconQuestionMarkCircle, IconMinus, IconPlus } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';

import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';
import { Select } from '../Select';
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
    parameters: {
        manifest: {
            canonical: true,
        },
    },
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

export const Strong: Story = {
    args: {
        children: 'Strong Label',
        variant: 'strong',
    },
    render: (args) => {
        // Used to get the correct component name in the Storybook of the `TextInput` (instead of `TextInput.Root`)
        const STextInput = (props: ComponentProps<typeof TextInput>) => <TextInput {...props} />;
        STextInput.displayName = 'TextInput';

        return (
            <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input-strong" />
                <STextInput id="input-strong" placeholder="Enter your name" />
            </div>
        );
    },
};

export const WithInputAndDisabledButtons: Story = {
    args: {
        children: 'Number Input',
    },
    render: (args) => {
        return (
            <div className="tw-flex tw-flex-col tw-gap-2">
                <Label {...args} htmlFor="input-with-buttons" />
                <TextInput.Root id="input-with-buttons" type="text" defaultValue="50">
                    <TextInput.Slot name="right" className="!tw-p-0">
                        <Button aspect="square" emphasis="weak" size="small" disabled aria-label="Decrease value">
                            <IconMinus size={16} />
                        </Button>
                    </TextInput.Slot>
                    <TextInput.Slot name="right" className="!tw-pl-0 !tw-pr-1">
                        <Button aspect="square" emphasis="weak" size="small" aria-label="Increase value">
                            <IconPlus size={16} />
                        </Button>
                    </TextInput.Slot>
                </TextInput.Root>
                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                    The decrement button is disabled, but the label remains active because TextInput.Slot automatically
                    prevents disabled children from affecting the label
                </p>
            </div>
        );
    },
};

export const WithManualIgnoreDisabled: Story = {
    args: {
        children: 'Custom Component',
    },
    render: (args) => {
        return (
            <div className="tw-flex tw-flex-col tw-gap-4">
                <div>
                    <Label {...args} htmlFor="custom-component" />
                    <div className="tw-flex tw-gap-2 tw-mt-2">
                        <TextInput
                            id="custom-component"
                            type="text"
                            defaultValue="Custom value"
                            className="tw-flex-1"
                        />
                        <div data-label-ignore-disabled="true" className="tw-flex tw-gap-1">
                            <Button emphasis="weak" size="small" disabled aria-label="Action 1">
                                Action 1
                            </Button>
                            <Button emphasis="weak" size="small" disabled aria-label="Action 2">
                                Action 2
                            </Button>
                        </div>
                    </div>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                        The action buttons are disabled but don't affect the label because their container has{' '}
                        <code>data-label-ignore-disabled=&quot;true&quot;</code>
                    </p>
                </div>

                <div>
                    <Label htmlFor="without-ignore" variant="strong">
                        Without Ignore Attribute
                    </Label>
                    <div className="tw-flex tw-gap-2 tw-mt-2">
                        <TextInput id="without-ignore" type="text" defaultValue="Custom value" className="tw-flex-1" />
                        <div className="tw-flex tw-gap-1">
                            <Button emphasis="weak" size="small" disabled aria-label="Action 1">
                                Action 1
                            </Button>
                            <Button emphasis="weak" size="small" disabled aria-label="Action 2">
                                Action 2
                            </Button>
                        </div>
                    </div>
                    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                        Without the attribute, the label becomes disabled when there are disabled buttons nearby
                    </p>
                </div>
            </div>
        );
    },
};
