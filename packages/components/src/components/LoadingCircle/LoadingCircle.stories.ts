/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

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
        docs: {
            description: {
                component: [
                    'An animated circular spinner indicating that a process is in progress. Supports size variants and completion/error states.',
                    '',
                    '**When to use:** For indeterminate loading states — data fetching, form submission, or background processing. For determinate progress use `<LoadingBar>`.',
                ].join('\n'),
            },
        },
    },
};

export default meta;

export const Default: Story = {};
