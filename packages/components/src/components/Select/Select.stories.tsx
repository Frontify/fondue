/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';

import { Select, SelectInput } from './Select';
import { SelectItem, SelectItemGroup } from './SelectMenu';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof SelectInput> = {
    component: SelectInput,
    subcomponents: {
        // @ts-expect-error Storybook types are incorrect
        // 'Select.Combobox': Combobox,
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
    args: {
        ariaLabel: 'Select an item',
    },
};
export default meta;

export const SimpleSelect: Story = {
    name: 'Select',
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Item>Test1</Select.Item>
                <Select.Item>Test2</Select.Item>
                <Select.Item>Test3</Select.Item>
            </Select>
        );
    },
};

export const Combobox: Story = {
    render: (args) => {
        return (
            <Select.Combobox {...args}>
                <Select.Item>Test1</Select.Item>
                <Select.Item>Test2</Select.Item>
                <Select.Item>Test3</Select.Item>
            </Select.Combobox>
        );
    },
};

export const WithDefaultItemValue: Story = {
    render: (args) => {
        return (
            <Select defaultItem="Test1" {...args}>
                <Select.Item>First</Select.Item>
                <Select.Item>Test1</Select.Item>
                <Select.Item>Test2</Select.Item>
                <Select.Item>Test3</Select.Item>
            </Select>
        );
    },
};

export const WithDefaultItem: Story = {
    render: (args) => {
        return (
            <Select
                defaultItem={{
                    label: 'aa',
                    value: 'aa',
                }}
                {...args}
            >
                <Select.Item>First</Select.Item>
                <Select.Item label="aa" value="aa">
                    Test1
                </Select.Item>
                <Select.Item>Test2</Select.Item>
                <Select.Item>Test3</Select.Item>
            </Select>
        );
    },
};
