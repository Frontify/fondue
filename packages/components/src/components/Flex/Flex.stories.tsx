/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Flex } from './Flex';

type Story = StoryObj<typeof Flex>;
const meta: Meta<typeof Flex> = {
    title: 'Layout/Flex',
    component: Flex,
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
