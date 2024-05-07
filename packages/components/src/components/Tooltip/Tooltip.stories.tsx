/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

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
    args: {
        enterDelay: 700,
    },
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
