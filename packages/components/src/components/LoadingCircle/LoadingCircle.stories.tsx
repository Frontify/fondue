/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { LoadingCircle } from './LoadingCircle';

type Story = StoryObj<typeof LoadingCircle>;
const meta: Meta<typeof LoadingCircle> = {
    title: 'Components/Loading Circle',
    component: LoadingCircle,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
};

export default meta;

export const Default: Story = {};
