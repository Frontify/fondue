/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Text } from './Text';

type Story = StoryObj<typeof Text>;
const meta: Meta<typeof Text> = {
    title: 'Typography/Text',
    component: Text,
    tags: ['autodocs'],
    parameters: {},
    args: {},
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
    },
};
export default meta;

export const Default: Story = {
    args: {
        children: 'Hello World',
    },
};
