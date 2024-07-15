/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Switch } from './Switch';

type Story = StoryObj<typeof Switch>;
const meta: Meta<typeof Switch> = {
    component: Switch,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        label: 'Switch',
    },
};
export default meta;

export const Default: Story = {
    args: {
        label: 'Switch',
    },
};
