/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconQuestionMarkCircle } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useId } from 'react';

import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { Text } from '../Text/Text';
import { Tooltip } from '../Tooltip/Tooltip';

import { RadioList, RadioListRoot } from './RadioList';

type Story = StoryObj<typeof RadioListRoot>;
const meta: Meta<typeof RadioListRoot> = {
    title: 'Components/RadioList',
    component: RadioListRoot,
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

export const Default: Story = {
    parameters: {
        manifest: {
            canonical: true,
        },
    },
};

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

export const WithGroupLabelAndDescription: Story = {
    render: (args) => {
        const id = useId();

        const idGroupLabel = `${id}-group-label`;
        const idGroupDescription = `${id}-group-description`;
        const idOption1 = `${id}-option-1`;
        const idOption2 = `${id}-option-2`;

        return (
            <Flex direction="column" gap={2}>
                <Text id={idGroupLabel} weight="strong" size="small">
                    Visibility
                </Text>

                {/* The root renders a `role="radiogroup"`, which `label for` cannot name, so the
                    group label and description are associated through the aria attributes. */}
                <RadioList.Root {...args} aria-labelledby={idGroupLabel} aria-describedby={idGroupDescription}>
                    <RadioList.RadioButton id={idOption1} value="1" />
                    <Label htmlFor={idOption1} required={args.required}>
                        Everyone
                    </Label>

                    <RadioList.RadioButton id={idOption2} value="2" />
                    <Label htmlFor={idOption2} required={args.required}>
                        Only me
                    </Label>
                </RadioList.Root>

                <Text id={idGroupDescription} size="small" color="weak">
                    Hint text associated with the group through `aria-describedby`.
                </Text>
            </Flex>
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
