/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Box } from './Box';

import { DecorativeContent } from '#storybook/components/DecorativeContent';

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
    args: {
        width: '100px',
        height: '100px',
    },
};
export default meta;

export const Default: Story = {
    render: (args) => {
        return (
            <Box {...args}>
                <DecorativeContent />
            </Box>
        );
    },
};
