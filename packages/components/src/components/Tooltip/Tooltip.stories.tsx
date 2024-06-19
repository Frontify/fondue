/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button/Button';

import { Tooltip, TooltipContent, TooltipRoot, TooltipTrigger } from './Tooltip';

type Story = StoryObj<typeof TooltipRoot>;
const meta: Meta<typeof TooltipRoot> = {
    component: TooltipRoot,
    title: 'Components/Tooltip',
    subcomponents: {
        // @ts-expect-error - Storybook has the wrong type for TooltipContent
        'Tooltip.Content': TooltipContent,
        // @ts-expect-error - Storybook has the wrong type for TooltipContent
        'Tooltip.Trigger': TooltipTrigger,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    render: ({ ...args }) => {
        return (
            <Tooltip.Root {...args}>
                <Tooltip.Trigger>
                    <Button>Hover over me!</Button>
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
