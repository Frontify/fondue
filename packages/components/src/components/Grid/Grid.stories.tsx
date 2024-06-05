/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Grid } from './Grid';

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
    args: {},
};
export default meta;

export const Default: Story = {
    args: {
        children: 'Hello World',
    },
};
