/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Button } from '../Button/Button';

import { Tooltip, TooltipContent } from './Tooltip';

type Story = StoryObj<typeof TooltipContent>;
const meta: Meta<typeof TooltipContent> = {
    component: TooltipContent,
    title: 'Components/Tooltip/Content',
    tags: ['autodocs'],
    args: {
        padding: 'spacious',
        side: 'top',
        maxWidth: '200px',
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    parameters: {
        status: {
            type: 'released',
        },
    },

    render: ({ ...args }) => {
        return (
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <Button>Hover over me!</Button>
                </Tooltip.Trigger>
                <Tooltip.Content {...args} />
            </Tooltip.Root>
        );
    },
};
export default meta;

export const LongText: Story = {
    args: {},
};

export const Compact: Story = {
    args: {
        padding: 'compact',
    },
};

export const TopWithCollision: Story = {
    args: {
        side: 'top',
    },
};

export const TopWithoutCollision: Story = {
    args: {
        side: 'top',
    },
    render: ({ ...args }) => {
        return (
            <div className="tw-mt-64">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button>Hover over me!</Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content {...args} />
                </Tooltip.Root>
            </div>
        );
    },
};

export const LeftWithCollision: Story = {
    args: {
        side: 'left',
    },
};

export const LeftWithoutCollision: Story = {
    args: {
        side: 'left',
    },
    render: ({ ...args }) => {
        return (
            <div className="tw-ml-64">
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button>Hover over me!</Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content {...args} />
                </Tooltip.Root>
            </div>
        );
    },
};

export const Bottom: Story = {
    args: {
        side: 'bottom',
    },
};

export const Right: Story = {
    args: {
        side: 'right',
    },
};

export const WithMaxWidth: Story = {
    args: {
        maxWidth: '400px',
    },
};
