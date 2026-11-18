/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDocumentText, IconImage, IconPlay, IconQuestionMarkCircle } from '@frontify/fondue-icons';
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
        variant: {
            type: 'string',
            options: [undefined, 'default', 'pill'],
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
    render: (args) => (
        <RadioList.Root {...args} aria-label="Pick an option">
            <RadioList.RadioButton id="option-1" value="1" />
            <Label htmlFor="option-1">Option 1</Label>

            <RadioList.RadioButton id="option-2" value="2" />
            <Label htmlFor="option-2">Option 2</Label>

            <RadioList.RadioButton id="option-3" value="3" />
            <Label htmlFor="option-3">Option 3</Label>
        </RadioList.Root>
    ),
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

const SIZES = [
    'A4',
    'A5',
    'Letter',
    'Instagram Post',
    'Instagram Story',
    'Facebook Cover',
    'LinkedIn Banner',
    'Business Card',
    'Poster 50×70',
    'Flyer DL',
];

export const Pill: Story = {
    args: {
        variant: 'pill',
        value: '2',
    },
    render: (args) => (
        <RadioList.Root {...args} aria-label="Pick an option">
            <RadioList.RadioButton value="1">Option 1</RadioList.RadioButton>
            <RadioList.RadioButton value="2">Option 2</RadioList.RadioButton>
            <RadioList.RadioButton value="3">Option 3</RadioList.RadioButton>
        </RadioList.Root>
    ),
};

export const PillUncontrolled: Story = {
    args: {
        variant: 'pill',
    },
    render: ({ value: _value, ...args }) => (
        <RadioList.Root {...args} aria-label="Pick an option">
            <RadioList.RadioButton value="1">Option 1</RadioList.RadioButton>
            <RadioList.RadioButton value="2">Option 2</RadioList.RadioButton>
            <RadioList.RadioButton value="3">Option 3</RadioList.RadioButton>
        </RadioList.Root>
    ),
};

export const PillWithIcons: Story = {
    args: {
        variant: 'pill',
        value: 'print',
    },
    render: (args) => (
        <RadioList.Root {...args} aria-label="Template type">
            <RadioList.RadioButton value="print">
                <IconDocumentText size={16} />
                Print
            </RadioList.RadioButton>
            <RadioList.RadioButton value="digital">
                <IconImage size={16} />
                Digital
            </RadioList.RadioButton>
            <RadioList.RadioButton value="video">
                <IconPlay size={16} />
                Video
            </RadioList.RadioButton>
        </RadioList.Root>
    ),
};

export const PillWithCounts: Story = {
    args: {
        variant: 'pill',
        value: 'a4',
    },
    render: (args) => (
        <RadioList.Root {...args} aria-label="Page size">
            <RadioList.RadioButton value="a4">
                A4
                <RadioList.Count>12</RadioList.Count>
            </RadioList.RadioButton>
            <RadioList.RadioButton value="a5">
                A5
                <RadioList.Count>3</RadioList.Count>
            </RadioList.RadioButton>
            <RadioList.RadioButton value="letter">
                Letter
                <RadioList.Count>7</RadioList.Count>
            </RadioList.RadioButton>
            <RadioList.RadioButton value="legal" disabled>
                Legal
                <RadioList.Count>0</RadioList.Count>
            </RadioList.RadioButton>
        </RadioList.Root>
    ),
};

export const PillWithDisabledItem: Story = {
    args: {
        variant: 'pill',
        value: '1',
    },
    render: (args) => (
        <RadioList.Root {...args} aria-label="Pick an option">
            <RadioList.RadioButton value="1">Option 1</RadioList.RadioButton>
            <RadioList.RadioButton value="2" disabled>
                Option 2
            </RadioList.RadioButton>
            <RadioList.RadioButton value="3">Option 3</RadioList.RadioButton>
        </RadioList.Root>
    ),
};

export const PillDisabled: Story = {
    args: {
        variant: 'pill',
        value: '2',
        disabled: true,
    },
    render: Pill.render,
};

export const PillWithEmphasisHighlight: Story = {
    args: {
        variant: 'pill',
        value: '2',
        emphasis: 'highlight',
    },
    render: Pill.render,
};

export const PillVertical: Story = {
    args: {
        variant: 'pill',
        value: '2',
        orientation: 'vertical',
    },
    render: Pill.render,
};

export const PillWithTooltip: Story = {
    args: {
        variant: 'pill',
        value: '1',
    },
    render: (args) => (
        <RadioList.Root {...args} aria-label="Page size">
            <RadioList.RadioButton value="1">A4</RadioList.RadioButton>
            <Tooltip.Root enterDelay={0}>
                <Tooltip.Trigger asChild>
                    <span style={{ display: 'inline-flex' }}>
                        <RadioList.RadioButton value="2" disabled>
                            Letter
                        </RadioList.RadioButton>
                    </span>
                </Tooltip.Trigger>
                <Tooltip.Content padding="compact">No template page uses this size</Tooltip.Content>
            </Tooltip.Root>
            <RadioList.RadioButton value="3">A5</RadioList.RadioButton>
        </RadioList.Root>
    ),
};

export const PillWrapping: Story = {
    args: {
        variant: 'pill',
        value: SIZES[3],
    },
    render: (args) => (
        <div style={{ maxWidth: 320, resize: 'horizontal', overflow: 'auto', padding: 8, border: '1px dashed' }}>
            <RadioList.Root {...args} aria-label="Page size">
                {SIZES.map((size, index) => (
                    <RadioList.RadioButton key={size} value={size}>
                        {size}
                        <RadioList.Count>{index + 1}</RadioList.Count>
                    </RadioList.RadioButton>
                ))}
            </RadioList.Root>
        </div>
    ),
};

export const PillWithGroupLabel: Story = {
    args: {
        variant: 'pill',
    },
    render: (args) => {
        const id = useId();
        const idGroupLabel = `${id}-group-label`;

        return (
            <Flex direction="column" gap={2}>
                <Text id={idGroupLabel} weight="strong" size="small">
                    Template type
                </Text>
                <RadioList.Root {...args} aria-labelledby={idGroupLabel}>
                    <RadioList.RadioButton value="print">Print</RadioList.RadioButton>
                    <RadioList.RadioButton value="digital">Digital</RadioList.RadioButton>
                </RadioList.Root>
            </Flex>
        );
    },
};
