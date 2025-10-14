/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { LoadingBar } from './LoadingBar';

type Story = StoryObj<typeof LoadingBar>;
const meta: Meta<typeof LoadingBar> = {
    title: 'Components/Loading Bar',
    component: LoadingBar,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        value: 42,
        max: 100,
        rounded: true,
        'aria-label': 'Fondue Loading Bar',
    },
};

export default meta;

export const WithDefinedValue: Story = {};

export const Indeterminate: Story = {
    args: {
        value: null,
    },
};
