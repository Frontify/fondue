/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';
import { useState } from 'react';

import { FormControl } from '@components/FormControl';
import { TriggerEmphasis } from '@components/Trigger';
import { Validation } from '@utilities/validation';

import {
    FilterableMultiSelect as FilterableMultiSelectComponent,
    type FilterableMultiSelectProps,
    FilterableMultiSelectSize,
    FilterableMultiSelectType,
} from './FilterableMultiSelect';

export default {
    title: 'Components/Filterable Multi Select',
    component: FilterableMultiSelectComponent,
    tags: ['autodocs'],
    args: {
        type: FilterableMultiSelectType.Default,
        size: FilterableMultiSelectSize.Medium,
        placeholder: 'Labels',
        label: 'Labels',
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
            options: Object.keys(FilterableMultiSelectType),
            control: { type: 'select' },
        },
        emphasis: {
            options: Object.keys(TriggerEmphasis),
            control: { type: 'select' },
        },
        size: {
            options: Object.keys(FilterableMultiSelectSize),
            control: { type: 'select' },
        },
        validation: {
            options: Object.values(Validation),
            control: { type: 'select' },
        },
        disabled: {
            type: 'boolean',
        },
        flip: {
            type: 'boolean',
        },
        ariaLabel: {
            type: 'string',
        },
        summarizedLabel: {
            type: 'string',
        },
        activeItemKeys: {
            table: { disable: true },
        },
        indeterminateItemKeys: {
            table: { disable: true },
        },
    },
} as Meta;

const MultiSelectTemplate: StoryFn<FilterableMultiSelectProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(args.activeItemKeys);

    return (
        <FilterableMultiSelectComponent
            {...args}
            activeItemKeys={activeItemKeys}
            onSelectionChange={(keys) => setActiveItemKeys(keys)}
        />
    );
};

const MultiSelectFormControlTemplate: StoryFn<FilterableMultiSelectProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(args.activeItemKeys);

    return (
        <FormControl helper={{ text: 'Helper Text' }} label={{ children: 'Multi-Select', htmlFor: '' }}>
            <FilterableMultiSelectComponent
                {...args}
                activeItemKeys={activeItemKeys}
                onSelectionChange={(keys) => setActiveItemKeys(keys)}
            />
        </FormControl>
    );
};

const MultiSelectRightAlignedContainerTemplate: StoryFn<FilterableMultiSelectProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(args.activeItemKeys);

    return (
        <div className="tw-absolute tw-right-0 tw-p-6 tw-w-96">
            <FilterableMultiSelectComponent
                {...args}
                activeItemKeys={activeItemKeys}
                onSelectionChange={(keys) => setActiveItemKeys(keys)}
            />
        </div>
    );
};

export const FilterableMultiSelect = MultiSelectTemplate.bind({});

export const WithPlaceholder = MultiSelectTemplate.bind({});

WithPlaceholder.args = {
    activeItemKeys: [],
    placeholder: 'Placeholder text',
};

export const WithOptionsSummarized = MultiSelectTemplate.bind({});

WithOptionsSummarized.args = {
    type: FilterableMultiSelectType.Summarized,
};

export const WithFormControl = MultiSelectFormControlTemplate.bind({});

export const WithMixedValues = MultiSelectTemplate.bind({});

WithMixedValues.args = {
    type: FilterableMultiSelectType.Summarized,
    summarizedLabel: 'Mixed values',
    indeterminateItemKeys: ['This is a long tag'],
};

export const WithRightAlignedContainer = MultiSelectRightAlignedContainerTemplate.bind({});

WithRightAlignedContainer.args = {
    items: [
        {
            value: 'Bacon ipsum dolor amet beef tri-tip rump, porchetta meatball andouille bacon shankle pancetta',
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
    flip: true,
};

export const WithWeakTriggerEmphasis = MultiSelectTemplate.bind({});

WithWeakTriggerEmphasis.args = {
    activeItemKeys: [],
    placeholder: 'Weak emphasis placeholder text',
    emphasis: TriggerEmphasis.Weak,
};

export const WithFilterLabelDefined = MultiSelectTemplate.bind({});

WithFilterLabelDefined.args = {
    activeItemKeys: [],
    items: [
        {
            value: 'Short tag',
        },
        {
            value: 'Checkbox label 2',
        },
        {
            value: 'Checkbox label 3',
        },
    ],
    emphasis: TriggerEmphasis.Default,
    filterLabel: 'Filter items',
    emptyFilteredResultsLabel: 'No items found',
};
