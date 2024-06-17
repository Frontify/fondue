/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { type ComponentProps } from 'react';

import { DecorativeContent } from '#storybook/components/DecorativeContent';

import { Box } from '../Box/Box';

import { Grid } from './Grid';

const DecorativeBox = (props: ComponentProps<typeof Box>) => (
    <Box width="100px" height="100px" {...props}>
        <DecorativeContent />
    </Box>
);

type Story = StoryObj<typeof Grid>;
const meta: Meta<typeof Grid> = {
    title: 'Layout/Grid',
    component: Grid,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        columns: '3',
        gap: '3',
        rows: 'repeat(2, 64px)',
        width: 'auto',
    },
};
export default meta;

export const Default: Story = {
    render: (args) => {
        return (
            <Grid {...args}>
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
            </Grid>
        );
    },
};
