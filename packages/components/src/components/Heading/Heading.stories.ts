/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Heading } from './Heading';

type Story = StoryObj<typeof Heading>;
const meta: Meta<typeof Heading> = {
    title: 'Typography/Heading',
    component: Heading,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'beta',
        },
    },
    args: {},
    argTypes: {
        as: {
            type: 'string',
            control: 'select',
            options: [undefined, 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
        color: {
            type: 'string',
            control: 'select',
            options: [
                undefined,
                'default',
                'weak',
                'x-weak',
                'disabled',
                'negative',
                'positive',
                'warning',
                'interactive',
            ],
        },
        size: {
            type: 'string',
            control: 'select',
            options: [undefined, 'medium', 'large', 'x-large', 'xx-large'],
        },
        weight: {
            type: 'string',
            control: 'select',
            options: [undefined, 'default', 'strong'],
        },
        'data-test-id': {
            type: 'string',
            control: 'text',
        },
    },
};
export default meta;

export const Default: Story = {
    args: {
        children: 'Hello World',
    },
};
