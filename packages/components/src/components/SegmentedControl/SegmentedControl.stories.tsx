/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Label } from '../Label/Label';
import { Text } from '../Text/Text';
import { Tooltip } from '../Tooltip/Tooltip';

import { SegmentedControl, SegmentedControlItem, SegmentedControlRoot } from './SegmentedControl';

type Story = StoryObj<typeof SegmentedControlRoot>;
const meta: Meta<typeof SegmentedControlRoot> = {
    title: 'Components/Segmented Control',
    component: SegmentedControlRoot,
    subcomponents: {
        'SegmentedControl.Item': SegmentedControlItem,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        defaultValue: 'first',
        disabled: false,
        onValueChange: action('onValueChange'),
    },
    decorators: (Story) => (
        <div className="tw-w-64">
            <Story />
        </div>
    ),
};
export default meta;

export const TextOnly: Story = {
    parameters: {
        manifest: {
            canonical: true,
        },
    },
    render: (args) => (
        <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
    ),
};

export const WithTooltip: Story = {
    render: (args) => (
        <SegmentedControl.Root {...args}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <SegmentedControl.Item value="first">First</SegmentedControl.Item>
                </Tooltip.Trigger>
                <Tooltip.Content>First one</Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
                </Tooltip.Trigger>
                <Tooltip.Content>Second one</Tooltip.Content>
            </Tooltip.Root>

            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
                </Tooltip.Trigger>
                <Tooltip.Content>Third one</Tooltip.Content>
            </Tooltip.Root>
        </SegmentedControl.Root>
    ),
};

export const IconOnly: Story = {
    render: (args) => (
        <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first" iconOnly>
                <IconIcon size={16} />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second" iconOnly>
                <IconIcon size={16} />
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third" iconOnly>
                <IconIcon size={16} />
            </SegmentedControl.Item>
        </SegmentedControl.Root>
    ),
};

export const IconAndText: Story = {
    render: (args) => (
        <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">
                <IconIcon size={16} />
                First
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={16} />
                Second
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={16} />
                Third
            </SegmentedControl.Item>
        </SegmentedControl.Root>
    ),
    decorators: (Story) => (
        <div className="tw-w-80">
            <Story />
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => (
        <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">
                <IconIcon size={16} />
                First
            </SegmentedControl.Item>
            <SegmentedControl.Item value="second">
                <IconIcon size={16} />
                Second
            </SegmentedControl.Item>
            <SegmentedControl.Item value="third">
                <IconIcon size={16} />
                Third
            </SegmentedControl.Item>
        </SegmentedControl.Root>
    ),
    decorators: (Story) => (
        <div className="tw-w-80">
            <Story />
        </div>
    ),
};

export const WithLabel: Story = {
    render: (args) => {
        return (
            <div className="tw-flex tw-flex-col tw-gap-2">
                <Label htmlFor="segmented-control" id="segmented-control-label">
                    Segmented Control
                </Label>

                {/* The root renders a `role="radiogroup"`, which `label for` cannot name, so point
                    `aria-labelledby` at the label to give the group an accessible name. */}
                <SegmentedControl.Root {...args} id="segmented-control" aria-labelledby="segmented-control-label">
                    <SegmentedControl.Item value="first">First</SegmentedControl.Item>
                    <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
                    <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
                </SegmentedControl.Root>
            </div>
        );
    },
};

export const WithLabelAndDescription: Story = {
    render: (args) => {
        return (
            <div className="tw-flex tw-flex-col tw-gap-2">
                <Label htmlFor="segmented-control-described" id="segmented-control-described-label">
                    Segmented Control
                </Label>

                <SegmentedControl.Root
                    {...args}
                    id="segmented-control-described"
                    aria-labelledby="segmented-control-described-label"
                    aria-describedby="segmented-control-described-hint"
                >
                    <SegmentedControl.Item value="first">First</SegmentedControl.Item>
                    <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
                    <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
                </SegmentedControl.Root>

                <Text id="segmented-control-described-hint" size="small" color="weak">
                    Hint text associated with the group through `aria-describedby`.
                </Text>
            </div>
        );
    },
    decorators: (Story) => (
        <div className="tw-w-80">
            <Story />
        </div>
    ),
};

export const FullWidth: Story = {
    render: (args) => (
        <SegmentedControl.Root {...args} hugWidth={false}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
    ),
    decorators: (Story) => (
        <div className="tw-w-96">
            <Story />
        </div>
    ),
};

export const ContainerTooSmall: Story = {
    render: (args) => (
        <SegmentedControl.Root {...args}>
            <SegmentedControl.Item value="first">First</SegmentedControl.Item>
            <SegmentedControl.Item value="second">Second</SegmentedControl.Item>
            <SegmentedControl.Item value="third">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
    ),
    decorators: (Story) => (
        <div className="tw-w-40">
            <Story />
        </div>
    ),
};
