/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { Select, SelectProps } from './Select';
import { Box, FormField, TextInput, TextInputType } from '..';
import { Validation } from '@utilities/validation';
import { SelectGroupItem } from '@components/SelectGroupItem/SelectGroupItem';
import { SelectItem, SelectItemProps } from '@components/SelectItem/SelectItem';
import { IconClock16, IconFaceSad16, IconFocalPoint16, IconNook16 } from '@foundation/Icon';
import { useState } from 'react';

const ITEM_GROUPS_1: SelectItemProps[] = [
    { id: '1', title: 'title prop of Apple', value: 'value prop of Apple', decorator: <IconNook16 /> },
    { id: '2', value: 'value prop of Orange', decorator: <IconClock16 /> },
    { id: '3', title: 'title prop of Pear', value: 'value prop of Pear' },
    { id: '4', title: 'title prop of Kiwi (disabled)', value: 'value prop of Kiwi', disabled: true },
];

const ITEM_GROUPS_2: SelectItemProps[] = [
    { id: '5', title: 'title prop of Cabbage', value: 'value prop of Cabbage', decorator: <IconFocalPoint16 /> },
    { id: '6', value: 'value prop of Carrot' },
    { id: '7', title: 'title prop of Potato', value: 'value prop of Potato' },
    { id: '8', value: 'value prop of Squash', decorator: <IconFaceSad16 /> },
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
        filterTerm: {
            control: { type: 'string' },
            defaultValue: '',
            description: 'String value that is used to filter the list items on.',
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
        filterTerm: '',
    },
} as Meta<SelectProps>;

export const Default: StoryFn<SelectProps> = (args) => (
    <Select {...args}>
        {...ITEM_GROUPS_1.map((item) => (
            <SelectItem
                key={item.id}
                value={item.value}
                title={item.title}
                id={item.id}
                decorator={item.decorator}
                disabled={item.disabled}
            />
        ))}
    </Select>
);

export const WithTwoGroups: StoryFn<SelectProps> = (args) => (
    <Select {...args} filterTerm="ar">
        <SelectGroupItem groupTitle="Fruits" key="group-one">
            {...ITEM_GROUPS_1.map((item) => (
                <SelectItem
                    key={item.id}
                    value={item.value}
                    title={item.title}
                    id={item.id}
                    decorator={item.decorator}
                    disabled={item.disabled}
                />
            ))}
        </SelectGroupItem>
        <SelectGroupItem groupTitle="Veggies" key="group-two">
            {...ITEM_GROUPS_2.map((item) => (
                <SelectItem
                    key={item.id}
                    value={item.value}
                    title={item.title}
                    id={item.id}
                    decorator={item.decorator}
                />
            ))}
        </SelectGroupItem>
    </Select>
);

export const WithDefaultItem: StoryFn<SelectProps> = (args) => (
    <Select {...args} defaultItem={{ ...ITEM_GROUPS_1[1] }}>
        {...ITEM_GROUPS_1.map((item) => (
            <SelectItem
                key={item.id}
                value={item.value}
                title={item.title}
                id={item.id}
                decorator={item.decorator}
                disabled={item.disabled}
            />
        ))}
    </Select>
);

export const WithFormField: StoryFn<SelectProps> = (args) => (
    <FormField
        label={{ text: 'Select a Produce', required: true }}
        helperText="Select your favorite produce"
        helperTextColor={Validation.Success}
    >
        <Select {...args} filterTerm="apple">
            <SelectGroupItem groupTitle="Fruits" key="group-one">
                {...ITEM_GROUPS_1.map((item) => (
                    <SelectItem
                        key={item.id}
                        value={item.value}
                        title={item.title}
                        id={item.id}
                        decorator={item.decorator}
                        disabled={item.disabled}
                    />
                ))}
            </SelectGroupItem>
        </Select>
    </FormField>
);

export const WithFilterTerm: StoryFn<SelectProps> = (args) => {
    const [term, setTerm] = useState<string>();

    return (
        <Box>
            <TextInput type={TextInputType.Text} onChange={(value) => setTerm(value)} value={term} />
            <Select {...args} filterTerm={term}>
                {...ITEM_GROUPS_1.map((item) => (
                    <SelectItem
                        key={item.id}
                        value={item.value}
                        title={item.title}
                        id={item.id}
                        decorator={item.decorator}
                        disabled={item.disabled}
                    />
                ))}
            </Select>
        </Box>
    );
};

export const FocusOnMount = Default.bind({});
FocusOnMount.args = {
    focusOnMount: true,
};

export const OpenOnMount = Default.bind({});
OpenOnMount.args = {
    open: true,
};
