/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { Select, SelectProps } from './Select';
import { FormField } from '..';
import { Validation } from '@utilities/validation';
import { SelectGroupItem } from '@components/SelectGroupItem/SelectGroupItem';
import { SelectItem, SelectItemProps } from '@components/SelectItem/SelectItem';
import { IconClock16, IconFaceSad16, IconFocalPoint16, IconNook16 } from '@foundation/Icon';

const ITEM_GROUPS_1: SelectItemProps[] = [
    { id: '1', value: 'apple', title: 'Apple', decorator: <IconNook16 /> },
    { id: '2', value: 'Orange', decorator: <IconClock16 /> },
    { id: '3', value: 'pear', title: 'Pear' },
    { id: '4', value: 'kiwi', title: 'Kiwi (disabled)', disabled: true },
];

const ITEM_GROUPS_2: SelectItemProps[] = [
    { id: '5', value: 'cabbage', title: 'Cabbage', decorator: <IconFocalPoint16 /> },
    { id: '6', value: 'Carrot', disabled: true },
    { id: '7', value: 'potato', title: 'Potato' },
    { id: '8', value: 'Squash', decorator: <IconFaceSad16 /> },
];

const ITEM_GROUPS_3: SelectItemProps[] = [
    { id: '9', value: 'monkey', title: 'Monkey', decorator: <IconFocalPoint16 /> },
    { id: '10', value: 'fish', title: 'Fish' },
    { id: '11', value: 'dog', title: 'Dog' },
    { id: '12', value: 'horse', title: 'Horse', decorator: <IconFaceSad16 /> },
];

export default {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    argTypes: {
        listPlaceholder: {
            type: 'string',
            description: 'String value that will be initially displayed as the option group title',
            defaultValue: 'Select a option',
        },
        items: {
            type: 'string',
            description: 'Collection of item objects to render as options',
            defaultValue: undefined,
        },
        disabled: {
            control: { type: 'boolean' },
        },
        readOnly: {
            control: { type: 'boolean' },
        },
        status: {
            control: { type: 'select' },
            options: Object.values(Validation),
            defaultValue: Validation.Default,
        },
        autoOpen: {
            control: { type: 'boolean' },
            description: 'When `true` menu will open `onMouseEnter` on the toggle button',
        },
        autoClose: {
            control: { type: 'boolean' },
            description: 'When `true` menu will close `onMouseLeave` on the menu',
        },
        onChange: {
            action: 'onChange',
            type: 'function',
            description: 'Callback function to return current selected item',
            table: {
                defaultValue: { summary: undefined },
            },
        },
    },
    args: {
        label: 'Test Select Menu',
        listPlaceholder: 'Select a fruit/veggie',
        disabled: false,
        readOnly: false,
        autoOpen: false,
        autoClose: false,
    },
} as Meta<SelectProps>;

export const Default: StoryFn<SelectProps> = (args) => (
    <Select {...args}>{...ITEM_GROUPS_1.map((item) => <SelectItem {...item} key={item.id} />)}</Select>
);

export const WithMultipleGroups: StoryFn<SelectProps> = (args) => (
    <Select {...args}>
        <SelectGroupItem groupTitle="Fruits">
            {...ITEM_GROUPS_1.map((item) => <SelectItem {...item} key={item.id} />)}
        </SelectGroupItem>
        <SelectGroupItem groupTitle="Veggies">
            {...ITEM_GROUPS_2.map((item) => <SelectItem {...item} key={item.id} />)}
        </SelectGroupItem>
        <SelectGroupItem groupTitle="Animals">
            {...ITEM_GROUPS_3.map((item) => <SelectItem {...item} key={item.id} />)}
        </SelectGroupItem>
        <SelectGroupItem groupTitle="Items with children props">
            <SelectItem id={'item-with-child-1'} value="child-1">
                Title text passed as child 1
            </SelectItem>
            <SelectItem id={'item-with-child-2'} value="child-2">
                Title text passed as child 2
            </SelectItem>
            <SelectItem id={'item-with-child-3'} value="child-3">
                Title text passed as child 3
            </SelectItem>
        </SelectGroupItem>
    </Select>
);

export const WithDefaultItem: StoryFn<SelectProps> = (args) => (
    <Select {...args} defaultItem={{ ...ITEM_GROUPS_1[1] }}>
        {...ITEM_GROUPS_1.map((item) => <SelectItem {...item} key={item.id} />)}
    </Select>
);

export const WithFormField: StoryFn<SelectProps> = (args) => (
    <FormField
        label={{ text: 'Select a Produce', required: true }}
        helperText="Select your favorite produce"
        helperTextColor={Validation.Success}
    >
        <Select {...args}>
            <SelectGroupItem groupTitle="Fruits" key="group-one">
                {...ITEM_GROUPS_1.map((item) => <SelectItem {...item} key={item.id} />)}
            </SelectGroupItem>
        </Select>
    </FormField>
);

export const WithAutoOpenAndClose = Default.bind({});
WithAutoOpenAndClose.args = {
    autoOpen: true,
    autoClose: true,
};

export const OpenOnMount = Default.bind({});
OpenOnMount.args = {
    open: true,
};

export const FocusOnMount = Default.bind({});
FocusOnMount.args = {
    focusOnMount: true,
};
