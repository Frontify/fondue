/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';

import { Tooltip } from './Tooltip';

type Story = StoryObj<typeof Tooltip.Content>;
const meta: Meta<typeof Tooltip.Content> = {
    component: Tooltip.Content,
    title: 'Components/Tooltip/TooltipContent',
    subcomponents: {},
    tags: ['autodocs'],
    args: {
        children:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    decorators: [
        (Story, context) => (
            <div className={context.parameters.addMargin ? 'tw-ml-40' : ''}>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <Button>Hover over me!</Button>
                    </Tooltip.Trigger>
                    <Story />
                </Tooltip.Root>
            </div>
        ),
    ],
};
export default meta;

export const Default: Story = {
    args: {},
};

export const Compact: Story = {
    args: {
        padding: 'compact',
    },
};

export const Top: Story = {
    args: {
        side: 'top',
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

export const LeftWithoutColision: Story = {
    args: {
        side: 'left',
    },
    parameters: {
        addMargin: true,
    },
};

export const LeftWithColision: Story = {
    args: {
        side: 'left',
    },
};

export const WithMaxWidth: Story = {
    args: {
        maxWidth: '400px',
    },
};

export const WithIgnoredColision: Story = {
    args: {
        side: 'left',
        ignoreCollisions: true,
    },
};

export const WithCustomClass: Story = {
    args: {
        className: 'tw-rounded-2xl tw-p-5',
    },
};
