/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { FormControl } from '@components/FormControl';
import { MultiSelect as MultiSelectComponent, MultiSelectProps, MultiSelectSize, MultiSelectType } from './MultiSelect';
import { Validation } from '@utilities/validation';

export default {
    title: 'Components/Multi Select',
    component: MultiSelectComponent,
    args: {
        type: MultiSelectType.Default,
        size: MultiSelectSize.Medium,
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

const MultiSelectTemplate: Story<MultiSelectProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(args.activeItemKeys);

    return (
        <MultiSelectComponent
            {...args}
            activeItemKeys={activeItemKeys}
            onSelectionChange={(keys) => setActiveItemKeys(keys)}
        />
    );
};

const MultiSelectFormControlTemplate: Story<MultiSelectProps> = (args) => {
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

export const WithOptionsSummarized = MultiSelectTemplate.bind({});

WithOptionsSummarized.args = {
    type: MultiSelectType.Summarized,
};

export const WithFormControl = MultiSelectFormControlTemplate.bind({});
