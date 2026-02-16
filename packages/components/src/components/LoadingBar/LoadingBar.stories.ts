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
        docs: {
            description: {
                component: [
                    'A horizontal progress bar showing completion progress as a filled track. Supports determinate (known percentage) and indeterminate (unknown duration) modes.',
                    '',
                    '**When to use:** When progress can be measured — file uploads, multi-step processes, or quota usage. For unknown durations, consider `<LoadingCircle>` instead.',
                ].join('\n'),
            },
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
