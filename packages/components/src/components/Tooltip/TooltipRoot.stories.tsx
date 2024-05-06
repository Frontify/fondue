/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';

import { Tooltip } from './Tooltip';

type Story = StoryObj<typeof Tooltip.Root>;
const meta: Meta<typeof Tooltip.Root> = {
    component: Tooltip.Root,
    title: 'Components/Tooltip/TooltipRoot',
    subcomponents: {},
    tags: ['autodocs'],
    args: {
        enterDelay: 700,
    },
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
};
export default meta;

export const Default: Story = {
    render: (args) => (
        <Tooltip.Root {...args}>
            <Tooltip.Trigger>
                <Button>Hover over me!</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Root>
    ),
};

export const NoDelay: Story = {
    args: {
        enterDelay: 0,
    },
    render: (args) => (
        <Tooltip.Root {...args}>
            <Tooltip.Trigger>
                <Button>Hover over me!</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Root>
    ),
};

export const LongDelay: Story = {
    args: {
        enterDelay: 2000,
    },
    render: (args) => (
        <Tooltip.Root {...args}>
            <Tooltip.Trigger>
                <Button>Hover over me!</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Root>
    ),
};
