/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';

import { DecorativeContent } from '#storybook/components/DecorativeContent';

import { Box } from '../Box/Box';

import { Grid } from './Grid';

const DecorativeBox = (props: ComponentProps<typeof Box>) => (
    <Box width="100px" height="100px" {...props}>
        <DecorativeContent />
    </Box>
);
DecorativeBox.displayName = 'DecorativeBox';

type Story = StoryObj<typeof Grid>;
const meta: Meta<typeof Grid> = {
    title: 'Layout/Grid',
    component: Grid,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        columns: 'repeat(3, 1fr)',
        gap: 4,
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

export const GridWithFixedColumnsAndRows: Story = {
    render: (args) => {
        return (
            <Grid {...args}>
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
            </Grid>
        );
    },
    args: {
        columns: 3,
    },
};

export const ResponsiveGrid: Story = {
    render: (args) => {
        return (
            <Grid {...args}>
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
                <DecorativeBox />
            </Grid>
        );
    },
    args: {
        columns: {
            base: 'repeat(1, 1fr)',
            xs: 'repeat(4, 1fr)',
            sm: 'repeat(5, 1fr)',
            md: 'repeat(6, 1fr)',
            '2xl': 'repeat(8, 1fr)',
        },
    },
};
