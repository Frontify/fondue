/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconQuestionMarkCircle } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useId } from 'react';

import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { Tooltip } from '../Tooltip/Tooltip';

import { RadioList } from './RadioList';

type Story = StoryObj<typeof RadioList.Root>;
const meta: Meta<typeof RadioList.Root> = {
    title: 'Components/RadioList',
    component: RadioList.Root,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        disabled: false,
        readOnly: false,
        required: false,
        value: undefined,
        orientation: undefined,
        emphasis: undefined,
    },
    argTypes: {
        value: {
            type: 'string',
        },
        orientation: {
            type: 'string',
            options: [undefined, 'horizontal', 'vertical'],
            control: { type: 'select' },
        },
        emphasis: {
            type: 'string',
            options: [undefined, 'default', 'highlight'],
            control: { type: 'select' },
        },
    },
    render: (args) => {
        const id = useId();

        const idOption1 = `${id}-option-1`;
        const idOption2 = `${id}-option-2`;
        const idOption3 = `${id}-option-3`;

        return (
            <RadioList.Root {...args}>
                <RadioList.RadioButton id={idOption1} value="1" />
                <Label htmlFor={idOption1} required={args.required}>
                    Option 1
                </Label>

                <RadioList.RadioButton id={idOption2} value="2" />
                <Label htmlFor={idOption2} required={args.required}>
                    Option 2
                </Label>

                <RadioList.RadioButton id={idOption3} value="3" />
                <Label htmlFor={idOption3} required={args.required}>
                    Option 3
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <IconQuestionMarkCircle size="16" />
                        </Tooltip.Trigger>

                        <Tooltip.Content>I'm a tooltip!</Tooltip.Content>
                    </Tooltip.Root>
                </Label>
            </RadioList.Root>
        );
    },
};
export default meta;

export const Default: Story = {};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const ReadOnly: Story = {
    args: {
        readOnly: true,
    },
};

export const Required: Story = {
    args: {
        required: true,
    },
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
    },
};

export const WithEmphasisHighlight: Story = {
    args: {
        emphasis: 'highlight',
    },
};

export const WithoutLabels: Story = {
    render: (args) => {
        const id = useId();

        const idOption1 = `${id}-option-1`;
        const idOption2 = `${id}-option-2`;
        const idOption3 = `${id}-option-3`;

        return (
            <RadioList.Root {...args}>
                <RadioList.RadioButton id={idOption1} value="1" />
                <RadioList.RadioButton id={idOption2} value="2" />
                <RadioList.RadioButton id={idOption3} value="3" />
            </RadioList.Root>
        );
    },
};

export const WithCustomLayout: Story = {
    render: (args) => {
        const id = useId();

        const idOption1 = `${id}-option-1`;
        const idOption2 = `${id}-option-2`;
        const idOption3 = `${id}-option-3`;

        return (
            <RadioList.Root disabled={args.disabled} required={args.required} value={args.value} asChild>
                <Flex gap={4}>
                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption1} value="1" />
                        <Label htmlFor={idOption1} required={args.required}>
                            Option 1
                        </Label>
                    </Flex>

                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption2} value="2" />
                        <Label htmlFor={idOption2} required={args.required}>
                            Option 2
                        </Label>
                    </Flex>

                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption3} value="3" />
                        <Label htmlFor={idOption3} required={args.required}>
                            Option 3
                        </Label>
                    </Flex>
                </Flex>
            </RadioList.Root>
        );
    },
};
