/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { DecorativeContent } from '#storybook/components/DecorativeContent';

import { Box } from './Box';

type Story = StoryObj<typeof Box>;
const meta: Meta<typeof Box> = {
    title: 'Layout/Box',
    component: Box,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
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
