/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { Select, SelectProps } from './Select';
import { Box } from '..';
import { Validation } from '@utilities/validation';

const BASIC_ITEMS = [
    { id: '1', title: 'Test 1', value: 'I am the value of test 1' },
    { id: '2', title: 'Test 2', value: 'I am the value of test 2' },
    { id: '3', title: 'Test 3', value: 'I am the value of test 3' },
    { id: '4', title: 'Test 4', value: 'I am the value of test 4' },
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
        items: [...BASIC_ITEMS],
    },
} as Meta<SelectProps>;

const Template: StoryFn<SelectProps> = (args) => (
    <Box className="tw-min-h-[200px]">
        <Select {...args} />
    </Box>
);

export const Default = Template.bind({});
