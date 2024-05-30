/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Select } from './Select';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof Select> = {
    component: Select,
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
        items: [
            {
                label: 'aaaa 1',
                value: '1',
            },
            {
                label: 'bbbb 2',
                value: '2',
            },
            {
                label: 'cccc 3',
                value: '3',
            },
        ],
    },
    render: (args) => (
        <>
            <Select {...args} />
            <Select {...args} isSearchable />
        </>
    ),
};
