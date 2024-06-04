/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Select } from './Select';
import { SelectItem } from './SelectMenu';

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
    render: (args) => (
        <Select {...args}>
            <SelectItem>Test</SelectItem>
            <SelectItem>Test2</SelectItem>
        </Select>
    ),
};
