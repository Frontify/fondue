/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconIcon } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Flex } from '#/components/Flex/Flex.tsx';

import { Button } from '../Button/Button';

import { SelectCombobox } from './Combobox';
import { Select, SelectInput } from './Select';
import { SelectItem, SelectItemGroup } from './SelectItem';
import { SelectSlot } from './SelectSlot';

type Story = StoryObj<typeof meta>;
const meta: Meta<typeof SelectInput> = {
    title: 'Components/Select',
    component: SelectInput,
    subcomponents: {
        'Select.Combobox': SelectCombobox,
        'Select.Slot': SelectSlot,
        'Select.Group': SelectItemGroup,
        'Select.Item': SelectItem,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        'aria-label': 'Select an item',
        placeholder: 'Select an item',
    },
};
export default meta;

export const SimpleSelect: Story = {
    name: 'Select',
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select>
        );
    },
};

export const Combobox: Story = {
    args: {
        placeholder: 'Select an item',
    },
    render: (args) => {
        return (
            <Select.Combobox {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select.Combobox>
        );
    },
};

export const ComboboxWithAsyncItems: StoryObj<typeof Select.Combobox> = {
    args: {
        placeholder: 'Select an item',
        getAsyncItems: async (filterText: string) => {
            const items = [
                {
                    value: 'test1',
                    label: 'Test 1 - Custom Content',
                    content: (
                        <Flex gap={4} align="center">
                            <img src="https://flagsapi.com/CH/flat/16.png" alt="Switzerland" />
                            <p>Switzerland</p>
                        </Flex>
                    ),
                },
                {
                    value: 'test2',
                    label: 'Test 2',
                    content: (
                        <Flex gap={4} align="center">
                            <p>With a Component</p>
                            <IconIcon size={16} />
                        </Flex>
                    ),
                },
                {
                    value: 'test3',
                    label: 'Test 3',
                    content: (
                        <Flex gap={4} align="center">
                            Test 3<IconIcon />
                        </Flex>
                    ),
                },
                { value: 'aaaa', label: 'AAAA' },
                { value: 'bbbb', label: 'BBBB' },
                { value: 'cccc', label: 'CCCC' },
            ];

            const filteredItems = items.filter((item) => item.label.toLowerCase().includes(filterText.toLowerCase()));

            await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

            return filteredItems;
        },
    },
    render: (args) => {
        return <Select.Combobox {...args}></Select.Combobox>;
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>
        );
    },
};

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Select an item',
    },
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>
        );
    },
};

export const WithDecorator: Story = {
    args: {
        placeholder: 'Select an item',
    },
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Slot name="left">
                    <IconIcon size={16} />
                </Select.Slot>
                <Select.Slot name="right">
                    <IconIcon size={16} />
                </Select.Slot>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>
        );
    },
};

export const Clearable: Story = {
    args: {
        placeholder: 'Select an item',
    },
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Slot name="right">
                    <IconIcon size={16} />
                </Select.Slot>
                <Select.Slot name="clear" />
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>
        );
    },
};

export const CustomClearElement: Story = {
    args: {
        placeholder: 'Select an item',
    },
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Slot name="clear">
                    <Button size="small" emphasis="strong" onPress={() => {}}>
                        Clear
                    </Button>
                </Select.Slot>
                <Select.Slot name="left">
                    <IconIcon size={16} />
                </Select.Slot>
                <Select.Slot name="right">
                    <IconIcon size={16} />
                </Select.Slot>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>
        );
    },
};

export const DefaultItem: Story = {
    args: {
        defaultValue: 'test1',
    },
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Slot>
            </Select>
        );
    },
};

export const ItemGroups: Story = {
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Group groupId="Group 1">
                        <Select.Item value="test3">Test3</Select.Item>
                        <Select.Item value="test4">Test4</Select.Item>
                        <Select.Item value="test5">Test5</Select.Item>
                    </Select.Group>
                    <Select.Item value="test6">Test6</Select.Item>
                </Select.Slot>
            </Select>
        );
    },
};

export const ItemGroupsWithHeaders: Story = {
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Group groupId="Group 1" heading="Group 1">
                        <Select.Item value="test3">Test3</Select.Item>
                        <Select.Item value="test4">Test4</Select.Item>
                        <Select.Item value="test5">Test5</Select.Item>
                    </Select.Group>
                    <Select.Group groupId="Group 2" heading="Group 2">
                        <Select.Item value="test6">Test6</Select.Item>
                        <Select.Item value="test7">Test7</Select.Item>
                        <Select.Item value="test8">Test8</Select.Item>
                    </Select.Group>
                    <Select.Item value="test9">Test9</Select.Item>
                </Select.Slot>
            </Select>
        );
    },
};

export const OnlyItemGroups: Story = {
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Group groupId="Group 1">
                        <Select.Item value="test1">Test1</Select.Item>
                        <Select.Item value="test2">Test2</Select.Item>
                    </Select.Group>
                    <Select.Group groupId="Group 2">
                        <Select.Item value="test3">Test3</Select.Item>
                        <Select.Item value="test4">Test4</Select.Item>
                        <Select.Item value="test5">Test5</Select.Item>
                    </Select.Group>
                </Select.Slot>
            </Select>
        );
    },
};

export const CustomItem: Story = {
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Slot name="menu">
                    <Select.Item value="ch" label="Switzerland">
                        <div className="tw-flex tw-items-center tw-gap-4">
                            <img src="https://flagsapi.com/CH/flat/16.png" alt="Switzerland" />
                            <p>Switzerland</p>
                        </div>
                    </Select.Item>
                    <Select.Item value="icon" label="Component">
                        <div className="tw-flex tw-items-center tw-gap-4">
                            <p>With a Component</p>
                            <IconIcon size={16} />
                        </div>
                    </Select.Item>
                    <Select.Item value="basic" label="Basic">
                        Basic
                    </Select.Item>
                </Select.Slot>
            </Select>
        );
    },
};

export const CustomItemIncludingSelectField: Story = {
    render: (args) => {
        return (
            <Select {...args} showStringValue={false}>
                <Select.Slot name="menu">
                    <Select.Item value="ch" label="Switzerland">
                        <div className="tw-flex tw-items-center tw-gap-4">
                            <img src="https://flagsapi.com/CH/flat/16.png" alt="Switzerland" />
                            <p>Switzerland</p>
                        </div>
                    </Select.Item>
                    <Select.Item value="icon" label="Component">
                        <div className="tw-flex tw-items-center tw-gap-4">
                            <p>With a Component</p>
                            <IconIcon size={16} />
                        </div>
                    </Select.Item>
                    <Select.Item value="basic" label="Basic">
                        Basic
                    </Select.Item>
                </Select.Slot>
            </Select>
        );
    },
};

export const ExternallyControlled: Story = {
    decorators: [
        (Story) => {
            return (
                <div className="tw-flex tw-gap-4">
                    <Story />
                </div>
            );
        },
    ],
    render: (args) => {
        const [activeItem, setActiveItem] = useState<string | null>();
        return (
            <>
                <Select
                    onSelect={(selectedItem) => {
                        setActiveItem(() => selectedItem);
                    }}
                    value={activeItem}
                    {...args}
                >
                    <Select.Slot name="menu">
                        <Select.Item value="test1">Test1</Select.Item>
                        <Select.Item value="test2">Test2</Select.Item>
                        <Select.Item value="test3">Test3</Select.Item>
                    </Select.Slot>
                </Select>
                <Button onPress={() => setActiveItem('test1')}>Set Test1</Button>
            </>
        );
    },
};

export const OverflowingText: Story = {
    args: {
        placeholder: 'Select an item',
    },
    render: (args) => {
        return (
            <div style={{ display: 'flex', gap: 8, maxWidth: 600 }}>
                <Select {...args}>
                    <Select.Item value="test1">
                        Test1 - This is a very long text to see how it overflows This is a very long text to see how it
                        overflows This is a very long text to see how it overflows y long text to see how it overflows
                        This is a very long text to see how it overflows This is a very long text to see how it
                        overflows y long text to see how it overflows This is a very long text to see how it overflows
                        This is a very long text to see how it overflows
                    </Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select>
                <Select.Combobox {...args}>
                    <Select.Item value="test1">Test1 - This is a very long text to see how it overflows</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Combobox>
                <Select.Combobox {...args}>
                    <Select.Item value="test1">Test1 - This is a very long text to see how it overflows</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                </Select.Combobox>
            </div>
        );
    },
};

export const ListOverflow: Story = {
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '300px',
                        height: '272px',
                    },
                },
            },
            defaultViewport: 'mobile',
        },
    },
    render: (args) => {
        return (
            <>
                <Select {...args}>
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                    <Select.Item value="test4">Test4</Select.Item>
                    <Select.Item value="test5">Test5</Select.Item>
                    <Select.Item value="test6">Test6</Select.Item>
                    <Select.Item value="test7">Test7</Select.Item>
                </Select>
                <Select {...args}>
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                    <Select.Item value="test4">Test4</Select.Item>
                    <Select.Item value="test5">Test5</Select.Item>
                    <Select.Item value="test6">Test6</Select.Item>
                    <Select.Item value="test7">Test7</Select.Item>
                </Select>
                <Select {...args}>
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                    <Select.Item value="test4">Test4</Select.Item>
                    <Select.Item value="test5">Test5</Select.Item>
                    <Select.Item value="test6">Test6</Select.Item>
                    <Select.Item value="test7">Test7</Select.Item>
                </Select>
                <Select {...args}>
                    <Select.Item value="test1">Test1</Select.Item>
                    <Select.Item value="test2">Test2</Select.Item>
                    <Select.Item value="test3">Test3</Select.Item>
                    <Select.Item value="test4">Test4</Select.Item>
                    <Select.Item value="test5">Test5</Select.Item>
                    <Select.Item value="test6">Test6</Select.Item>
                    <Select.Item value="test7">Test7</Select.Item>
                </Select>
            </>
        );
    },
};

export const Success: Story = {
    args: {
        status: 'success',
    },
    render: (args) => {
        return (
            <Select {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select>
        );
    },
};

export const Errored: Story = {
    args: {
        status: 'error',
    },
    render: (args) => {
        return (
            <Select.Combobox {...args}>
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select.Combobox>
        );
    },
};

export const OnEscapeKeyDown: Story = {
    args: {
        placeholder: 'Select an item',
    },
    render: (args) => {
        return (
            <Select
                {...args}
                onEscapeKeyDown={() => {
                    alert('Escape key was pressed!');
                }}
            >
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select>
        );
    },
};

export const ComboboxOnEscapeKeyDown: Story = {
    args: {
        placeholder: 'Select an item',
    },
    render: (args) => {
        return (
            <Select.Combobox
                {...args}
                onEscapeKeyDown={() => {
                    alert('Escape key was pressed!');
                }}
            >
                <Select.Item value="test1">Test1</Select.Item>
                <Select.Item value="test2">Test2</Select.Item>
                <Select.Item value="test3">Test3</Select.Item>
            </Select.Combobox>
        );
    },
};
