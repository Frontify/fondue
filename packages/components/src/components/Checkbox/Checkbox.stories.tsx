/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconQuestionMarkCircle } from '@frontify/fondue-icons';
import { action } from 'storybook/actions';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type FormEvent, useState, useId } from 'react';

import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { Tooltip } from '../Tooltip/Tooltip';

import { Checkbox, CheckboxComponent } from './Checkbox';

type Story = StoryObj<typeof CheckboxComponent>;
const meta: Meta<typeof CheckboxComponent> = {
    title: 'Components/Checkbox',
    component: CheckboxComponent,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        disabled: false,
        required: false,
        readOnly: false,
        onChange: action('onChange'),
        onBlur: action('onBlur'),
        onFocus: action('onFocus'),
    },
    render: (args) => {
        const [value, setValue] = useState(args.value);
        const id = useId();
        const checkboxId = `checkbox-${id}`;
        const labelId = `label-${id}`;

        const handleToggle = (event: FormEvent) => {
            action('onChange')(event);
            setValue((prevIsChecked) => (prevIsChecked === 'indeterminate' ? true : !prevIsChecked));
        };

        return (
            <Flex gap={2} align="center">
                <Checkbox {...args} id={checkboxId} aria-labelledby={labelId} value={value} onChange={handleToggle} />
                <Label id={labelId} htmlFor={checkboxId} required={args.required}>
                    Checkbox
                </Label>
            </Flex>
        );
    },
};
export default meta;

export const Default: Story = {};

export const Indeterminate: Story = {
    args: {
        value: 'indeterminate',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const Required: Story = {
    args: {
        required: true,
    },
};

export const ReadOnly: Story = {
    args: {
        readOnly: true,
        value: true,
    },
};

export const WithTooltip: Story = {
    render: (args) => {
        const [value, setValue] = useState(args.value);
        const id = useId();
        const checkboxId = `checkbox-${id}`;
        const labelId = `label-${id}`;

        const handleToggle = (event: FormEvent) => {
            action('onChange')(event);
            setValue((prevIsChecked) => (prevIsChecked === 'indeterminate' ? true : !prevIsChecked));
        };

        return (
            <Flex gap={2}>
                <Checkbox {...args} id={checkboxId} aria-labelledby={labelId} value={value} onChange={handleToggle} />
                <Label id={labelId} htmlFor={checkboxId} required={args.required}>
                    Checkbox
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <IconQuestionMarkCircle size="16" />
                        </Tooltip.Trigger>

                        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                    </Tooltip.Root>
                </Label>
            </Flex>
        );
    },
};

export const WithoutLabel: Story = {
    render: (args) => {
        const [value, setValue] = useState(args.value);

        const handleToggle = (event: FormEvent) => {
            action('onChange')(event);
            setValue((prevIsChecked) => (prevIsChecked === 'indeterminate' ? true : !prevIsChecked));
        };

        return (
            <div className="tw-flex tw-gap-2 tw-items-center">
                <Checkbox {...args} id="checkbox" aria-labelledby="label" value={value} onChange={handleToggle} />
            </div>
        );
    },
};

export const Checklist: Story = {
    render: (args) => {
        return (
            <Flex gap="1rem" direction="column">
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox-1" aria-labelledby="label-1" value onChange={() => undefined} />
                    <Label id="label-1" htmlFor="checkbox-1">
                        Checkbox 1
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox
                        {...args}
                        id="checkbox-2"
                        aria-labelledby="label-2"
                        value={false}
                        onChange={() => undefined}
                    />
                    <Label id="label-2" htmlFor="checkbox-2">
                        Checkbox 2
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox
                        {...args}
                        id="checkbox-3"
                        aria-labelledby="label-3"
                        value="indeterminate"
                        onChange={() => undefined}
                    />
                    <Label id="label-3" htmlFor="checkbox-3">
                        Checkbox 3
                    </Label>
                </Flex>
            </Flex>
        );
    },
};
