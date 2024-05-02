/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Divider } from './Divider';

type Story = StoryObj<typeof Divider>;
const meta: Meta<typeof Divider> = {
    component: Divider,
    tags: ['autodocs'],
    args: {
        color: 'default',
        style: 'solid',
        padding: 'medium',
        direction: 'horizontal',
    },
    parameters: {
        status: {
            type: 'released',
        },
    },
};
export default meta;

export const Primary: Story = {
    args: {},
};

export const CustomColor: Story = {
    args: {
        color: 'strong',
    },
};

export const CustomStyle: Story = {
    args: {
        style: 'dashed',
    },
};

export const CustomHeight: Story = {
    args: {
        padding: 'large',
    },
};

export const Vertical: Story = {
    args: {
        direction: 'vertical',
    },
};
