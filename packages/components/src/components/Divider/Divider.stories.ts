import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

type Story = StoryObj<typeof Divider>;
const meta: Meta<typeof Divider> = {
    component: Divider,
    tags: ['autodocs'],
};
export default meta;


export const Primary: Story = {
    args: {
        color: '#FF0000',
        style: "dashed",
        height: "medium"
    },
};

export const Minimal: Story = {
    args: {},
};


export const CustomColor: Story = {
    args: {
        color: '#FF0000',
    },
};

export const CustomStyle: Story = {
    args: {
        style: 'dotted',
    },
};


export const CustomHeight: Story = {
    args: {
        height: 'large',
    },
};


