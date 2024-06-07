/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Combobox } from './Combobox';
import { Select, SelectInput } from './Select';
import { SelectItem, SelectItemGroup } from './SelectMenu';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof SelectInput> = {
    component: SelectInput,
    subcomponents: {
        // @ts-expect-error Storybook types are incorrect
        'Select.Combobox': Combobox,
        // @ts-expect-error Storybook types are incorrect
        'Select.Group': SelectItemGroup,
        // @ts-expect-error Storybook types are incorrect
        'Select.Item': SelectItem,
    },
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
    render: () => {
        return (
            <Select.Combobox
                onSelect={(item) => {
                    console.log(item);
                }}
            >
                <Select.Item>Test1</Select.Item>
                <Select.Item>Test2</Select.Item>
                <Select.Group groupId="testgroup">
                    <Select.Item>Group 1.1</Select.Item>
                    <Select.Item>Group 1.2</Select.Item>
                    <Select.Item>Group 1.3</Select.Item>
                </Select.Group>
                <Select.Group groupId="testgroup2">
                    <Select.Item>Group 2.1</Select.Item>
                    <Select.Item>Group 2.2</Select.Item>
                </Select.Group>
                <Select.Item>End1</Select.Item>
                <Select.Item>End2</Select.Item>
            </Select.Combobox>
        );
    },
};
