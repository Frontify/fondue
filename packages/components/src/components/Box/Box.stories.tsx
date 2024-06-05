/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Box } from './Box';

type Story = StoryObj<typeof Box>;
const meta: Meta<typeof Box> = {
    title: 'Layout/Box',
    component: Box,
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
    args: {
        children: 'Hello World',
    },
};
