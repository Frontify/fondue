/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';

type Story = StoryObj<typeof Dropdown>;
const meta: Meta<typeof Dropdown> = {
    component: Dropdown,
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
    name: 'Text Label Only',
    args: {
        children: 'Hello World',
    },
};
