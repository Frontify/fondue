/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Select } from './Select';
import { SelectItem } from './SelectMenu';
import { SelectWrapper } from './SelectWrapper';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof SelectWrapper> = {
    component: Select,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        isSearchable: true,
    },
};
export default meta;

export const Default: Story = {
    name: 'Text Label Only',
    render: (args) => (
        <SelectWrapper {...args}>
            <SelectItem>Test</SelectItem>
            <SelectItem value="bla2" label="test2">
                Test2
            </SelectItem>
        </SelectWrapper>
    ),
};
