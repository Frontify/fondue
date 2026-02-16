/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Text } from './Text';

type Story = StoryObj<typeof Text>;
const meta: Meta<typeof Text> = {
    title: 'Typography/Text',
    component: Text,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
        docs: {
            description: {
                component: [
                    'A polymorphic text element for body copy, labels, and inline text. Renders as a `span` by default but can be any inline or block text element.',
                    '',
                    '**When to use:** For body text, descriptions, captions, or any non-heading text. Choose the `as` tag for semantics (`p`, `label`, `em`) and `size`/`weight` for visual styling.',
                ].join('\n'),
            },
        },
    },
    argTypes: {
        as: {
            type: 'string',
            control: 'select',
            options: [undefined, 'a', 'abbr', 'address', 'em', 'label', 'li', 'span', 'strong', 'time', 'p'],
        },
        weight: {
            type: 'string',
            control: 'select',
            options: [undefined, 'default', 'strong', 'x-strong'],
        },
        size: {
            type: 'string',
            control: 'select',
            options: [undefined, 'x-small', 'small', 'medium', 'large'],
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
        boxColor: {
            type: 'string',
            control: 'select',
            options: [undefined, 'neutral', 'selected', 'disabled', 'positive', 'negative', 'warning'],
        },
    },
};
export default meta;

export const Default: Story = {
    args: {
        children: 'Hello World',
    },
};
