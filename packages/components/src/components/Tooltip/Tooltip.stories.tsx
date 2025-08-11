/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon, IconInfo, IconPen } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { Switch } from '../Switch/Switch';
import { TextInput } from '../TextInput/TextInput';

import { Tooltip, TooltipContent, TooltipRoot, TooltipTrigger } from './Tooltip';

type Story = StoryObj<typeof TooltipRoot>;
const meta: Meta<typeof TooltipRoot> = {
    component: TooltipRoot,
    title: 'Components/Tooltip',
    subcomponents: {
        'Tooltip.Content': TooltipContent,
        'Tooltip.Trigger': TooltipTrigger,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    render: ({ ...args }) => {
        return (
            <Tooltip.Root {...args}>
                <Tooltip.Trigger>
                    <p>Hover over me!</p>
                </Tooltip.Trigger>
                <Tooltip.Content>I am a tooltip!</Tooltip.Content>
            </Tooltip.Root>
        );
    },
};
export default meta;

export const Default: Story = {
    args: {},
};

export const NoDelay: Story = {
    args: {
        enterDelay: 0,
    },
};

export const LongDelay: Story = {
    args: {
        enterDelay: 2000,
    },
};

export const ControlledComponent: Story = {
    decorators: [
        (Story) => {
            return (
                <div className="tw-flex tw-gap-4">
                    <Story />
                </div>
            );
        },
    ],
    render: () => {
        const [isTooltipOpen, setIsTooltipOpen] = useState(false);
        return (
            <>
                <Tooltip.Root open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                    <Tooltip.Trigger>
                        <Button>Hover over me!</Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                </Tooltip.Root>
                <Button onPress={() => setIsTooltipOpen(true)}>Open Tooltip</Button>
                <Button onPress={() => setIsTooltipOpen(false)}>Close Tooltip</Button>
            </>
        );
    },
};

export const WithSwitch: Story = {
    render: () => (
        <Flex direction="row" gap="4px" align="flex-start">
            <Switch id="switch" aria-label="Hover me!" />
            <Label htmlFor="switch">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <IconInfo size={16} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>I am a tooltip!</Tooltip.Content>
                </Tooltip.Root>
            </Label>
        </Flex>
    ),
};

export const WithTextInput: Story = {
    render: () => (
        <TextInput.Root>
            <TextInput.Slot name="left">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <IconPen size={16} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>I have a pen</Tooltip.Content>
                </Tooltip.Root>
            </TextInput.Slot>
            <TextInput.Slot name="right">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <IconIcon size={16} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>I am an icon with a tooltip</Tooltip.Content>
                </Tooltip.Root>
            </TextInput.Slot>
        </TextInput.Root>
    ),
};

export const WithButton: Story = {
    render: () => (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <Button>Hover me!</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Root>
    ),
};
