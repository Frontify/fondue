/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
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

export const DefaultItem: Story = {
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

export const ItemGroups: Story = {
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Item>Test1</Select.Item>
                <Select.Item>Test2</Select.Item>
                <Select.Group groupId="Group 1">
                    <Select.Item>Test3</Select.Item>
                    <Select.Item>Test4</Select.Item>
                    <Select.Item>Test5</Select.Item>
                </Select.Group>
                <Select.Item>Test6</Select.Item>
            </Select>
        );
    },
};

export const SeparateValue: Story = {
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Item value="CH">Switzerland</Select.Item>
                <Select.Item value="DE">Germany</Select.Item>
                <Select.Item value="FR">France</Select.Item>
            </Select>
        );
    },
};

export const CustomItem: Story = {
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Item value="ch">
                    <div className="tw-flex tw-items-center tw-gap-4">
                        <img src="https://flagsapi.com/CH/flat/16.png" alt="Switzerland" />
                        <p>Switzerland</p>
                    </div>
                </Select.Item>
                <Select.Item value="icon">
                    <div className="tw-flex tw-items-center tw-gap-4">
                        <p>With a Component</p>
                        <IconIcon width={16} />
                    </div>
                </Select.Item>
                <Select.Item value="basic">Basic</Select.Item>
            </Select>
        );
    },
};
