/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { FormControl } from '@components/FormControl';
import { Validation } from '@utilities/validation';
import {
    MultiSelect as MultiSelectComponent,
    MultiSelectEmphasis,
    MultiSelectProps,
    MultiSelectSize,
    MultiSelectType,
} from './MultiSelect';
import { IconPerson16 } from '@foundation/Icon';

export default {
    title: 'Components/Multi Select',
    component: MultiSelectComponent,
    args: {
        type: MultiSelectType.Default,
        emphasis: MultiSelectEmphasis.Default,
        size: MultiSelectSize.Medium,
        label: '[Label]',
        activeItemKeys: ['Short tag', 'Tag 74'],
        items: [
            {
                value: 'Checkbox label 1',
            },
            {
                value: 'Short tag',
            },
            {
                value: 'Checkbox label 2',
            },
            {
                value: 'Checkbox label 3',
            },
            {
                value: 'Tag 74',
            },
            {
                value: 'This is a long tag',
            },
        ],
    },
    argTypes: {
        type: {
            options: Object.keys(MultiSelectType),
            control: { type: 'select' },
        },
        emphasis: {
            options: Object.keys(MultiSelectEmphasis),
            control: { type: 'select' },
        },
        size: {
            options: Object.keys(MultiSelectSize),
            control: { type: 'select' },
        },
        validation: {
            options: Object.values(Validation),
            control: { type: 'select' },
        },
    },
} as Meta;

const MultiSelectTemplate: StoryFn<MultiSelectProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(args.activeItemKeys);

    return (
        <MultiSelectComponent
            {...args}
            activeItemKeys={activeItemKeys}
            onSelectionChange={(keys) => setActiveItemKeys(keys)}
        />
    );
};

const MultiSelectFormControlTemplate: StoryFn<MultiSelectProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(args.activeItemKeys);

    return (
        <FormControl helper={{ text: 'Helper Text' }} label={{ children: 'Multi-Select', htmlFor: '' }}>
            <MultiSelectComponent
                {...args}
                activeItemKeys={activeItemKeys}
                onSelectionChange={(keys) => setActiveItemKeys(keys)}
            />
        </FormControl>
    );
};

export const MultiSelect = MultiSelectTemplate.bind({});

export const WithPlaceholder = MultiSelectTemplate.bind({});

WithPlaceholder.args = {
    activeItemKeys: [],
    placeholder: 'Placeholder text',
};

export const WithDecorator = MultiSelectTemplate.bind({});

WithDecorator.args = {
    activeItemKeys: [],
    decorator: <IconPerson16 />,
};

export const WithOptionsSummarized = MultiSelectTemplate.bind({});

WithOptionsSummarized.args = {
    type: MultiSelectType.Summarized,
};

export const WithFormControl = MultiSelectFormControlTemplate.bind({});

export const WithFilter = MultiSelectTemplate.bind({});

WithFilter.args = {
    filterable: true,
    decorator: <IconPerson16 />,
    placeholder: 'Users',
    items: [
        {
            value: 'Consumption',
            isCategory: true,
        },
        {
            imgSrc: 'https://images.unsplash.com/photo-1669255034440-7d293acdd207?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
            value: 'Checkbox label 1',
        },
        {
            imgSrc: 'https://images.unsplash.com/photo-1669255034440-7d293acdd207?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
            value: 'Short tag',
        },
        {
            imgSrc: 'https://images.unsplash.com/photo-1669255034440-7d293acdd207?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
            value: 'Checkbox label 2',
        },
        {
            value: '',
            isDivider: true,
        },
        {
            imgSrc: 'https://images.unsplash.com/photo-1669255034440-7d293acdd207?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
            value: 'Checkbox label 3',
        },
        {
            imgSrc: 'https://images.unsplash.com/photo-1669255034440-7d293acdd207?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
            value: 'Tag 74',
        },
        {
            imgSrc: 'https://images.unsplash.com/photo-1669255034440-7d293acdd207?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
            value: 'This is a long tag',
        },
    ],
};

export const WithCustomMenu = MultiSelectTemplate.bind({});

WithCustomMenu.args = WithFilter.args;
