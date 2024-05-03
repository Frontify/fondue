/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

type Story = StoryObj<typeof Tooltip.Root>;
const meta: Meta<typeof Tooltip.Root> = {
    component: Tooltip.Root,
    subcomponents: {
        // @ts-expect-error Storybook types are incorrect
        'Tooltip.Content': Tooltip.Content,
        // @ts-expect-error Storybook types are incorrect
        'Tooltip.Trigger': Tooltip.Trigger,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {},
};
export default meta;

export const Default: Story = {
    render: (args) => (
        <div className="tw-my-44">
            <Tooltip.Root {...args}>
                <Tooltip.Trigger>
                    <button>Storybook Trigger</button>
                </Tooltip.Trigger>
                <Tooltip.Content side="top">fzk</Tooltip.Content>
            </Tooltip.Root>
        </div>
    ),
};
