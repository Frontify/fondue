/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Divider } from './Divider';

type Story = StoryObj<typeof Divider>;
const meta: Meta<typeof Divider> = {
    title: 'Components/Divider',
    component: Divider,
    tags: ['autodocs'],
    args: {
        color: 'default',
        variant: 'solid',
        padding: 'medium',
        direction: 'horizontal',
    },
    parameters: {
        status: {
            type: 'released',
        },
    },
    decorators: [
        (Story) => (
            <div className="tw-h-8">
                <Story />
            </div>
        ),
    ],
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
        variant: 'dashed',
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
