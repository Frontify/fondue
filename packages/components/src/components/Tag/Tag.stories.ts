/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Tag } from './Tag';

type Story = StoryObj<typeof Tag>;
const meta: Meta<typeof Tag> = {
    component: Tag,
    tags: ['autodocs'],
};
export default meta;

export const Primary: Story = {
    args: {
        children: 'Tag',
    },
};

export const Sec: Story = {
    args: {
        children: 'Tag',
    },
};
