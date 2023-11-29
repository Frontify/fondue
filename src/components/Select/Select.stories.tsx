/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { Select, SelectProps } from './Select';
import { Box } from '..';
import { Validation } from '@utilities/validation';
import { SelectGroupItems } from '@components/SelectGroupItems/SelectGroupItems';
import { SelectItem } from '@components/SelectItem/SelectItem';
import { IconNook16 } from '@foundation/Icon';

const ITEM_GROUPS_1 = [
    { id: '1', title: 'title prop of Test 1', value: 'value prop of Test 1', decoration: <IconNook16 /> },
    { id: '2', value: 'value prop of Test 2' },
    { id: '3', title: 'title prop of Test 3', value: 'value prop of Test 3' },
    { id: '4', title: 'title prop of Test 4', value: 'value prop of Test 4' },
];

const ITEM_GROUPS_2 = [
    { id: '5', title: 'title prop of Test 5', value: 'value prop of Test 5' },
    { id: '6', value: 'value prop of Test 6' },
    { id: '7', title: 'title prop of Test 7', value: 'value prop of Test 7' },
    { id: '8', title: 'title prop of Test 8', value: 'value prop of Test 8' },
];

export default {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    argTypes: {
        label: { type: 'string' },
        hiddenLabel: {
            control: { type: 'boolean' },
            defaultValue: false,
        },
        listGroupTitle: {
            type: 'string',
            description: 'String value that will be initially displayed as the option group title',
            defaultValue: 'Select a option',
        },
        items: {
            type: 'string',
            description: 'Collection of item objects to render as options',
            defaultValue: undefined,
        },
        status: {
            control: { type: 'select' },
            options: Object.values(Validation),
            defaultValue: Validation.Default,
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
        listGroupTitle: 'Select a option',
    },
} as Meta<SelectProps>;

const Template: StoryFn<SelectProps> = (args) => (
    <Box className="tw-min-h-[200px]">
        <Select {...args}>
            <SelectGroupItems>
                {...ITEM_GROUPS_1.map((item, index) => (
                    <SelectItem key={item.id} value={item.value} title={item.title} id={item.id} index={index} />
                ))}
            </SelectGroupItems>
            <SelectGroupItems>
                {...ITEM_GROUPS_2.map((item, index) => (
                    <SelectItem key={item.id} value={item.value} title={item.title} id={item.id} index={index + 4} />
                ))}
            </SelectGroupItems>
        </Select>
    </Box>
);

export const Default = Template.bind({});
