/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Section } from './Section';

type Story = StoryObj<typeof Section>;
const meta: Meta<typeof Section> = {
    title: 'Layout/Section',
    component: Section,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
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
