/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { FormControl } from '@components/FormControl';
import { Validation } from '@utilities/validation';
import {
    LegacyMultiSelect as LegacyMultiSelectComponent,
    LegacyMultiSelectProps,
    LegacyMultiSelectSize,
    LegacyMultiSelectType,
} from './LegacyMultiSelect';
import { TriggerEmphasis } from '@components/Trigger';

export default {
    title: 'Components/Multi Select',
    component: LegacyMultiSelectComponent,
    tags: ['autodocs'],
    args: {
        type: LegacyMultiSelectType.Default,
        size: LegacyMultiSelectSize.Medium,
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
            options: Object.keys(LegacyMultiSelectType),
            control: { type: 'select' },
        },
        emphasis: {
            options: Object.keys(TriggerEmphasis),
            control: { type: 'select' },
        },
        size: {
            options: Object.keys(LegacyMultiSelectSize),
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

const LegacyMultiSelectTemplate: StoryFn<LegacyMultiSelectProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(args.activeItemKeys);

    return (
        <LegacyMultiSelectComponent
            {...args}
            activeItemKeys={activeItemKeys}
            onSelectionChange={(keys) => setActiveItemKeys(keys)}
        />
    );
};

const LegacyMultiSelectFormControlTemplate: StoryFn<LegacyMultiSelectProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(args.activeItemKeys);

    return (
        <FormControl helper={{ text: 'Helper Text' }} label={{ children: 'Multi-Select', htmlFor: '' }}>
            <LegacyMultiSelectComponent
                {...args}
                activeItemKeys={activeItemKeys}
                onSelectionChange={(keys) => setActiveItemKeys(keys)}
            />
        </FormControl>
    );
};

const LegacyMultiSelectRightAlignedContainerTemplate: StoryFn<LegacyMultiSelectProps> = (args) => {
    const [activeItemKeys, setActiveItemKeys] = useState<(string | number)[]>(args.activeItemKeys);

    return (
        <div className="tw-absolute tw-right-0 tw-p-6 tw-w-96">
            <LegacyMultiSelectComponent
                {...args}
                activeItemKeys={activeItemKeys}
                onSelectionChange={(keys) => setActiveItemKeys(keys)}
            />
        </div>
    );
};

export const LegacyMultiSelect = LegacyMultiSelectTemplate.bind({});

export const WithPlaceholder = LegacyMultiSelectTemplate.bind({});

WithPlaceholder.args = {
    activeItemKeys: [],
    placeholder: 'Placeholder text',
};

export const WithOptionsSummarized = LegacyMultiSelectTemplate.bind({});

WithOptionsSummarized.args = {
    type: LegacyMultiSelectType.Summarized,
};

export const WithFormControl = LegacyMultiSelectFormControlTemplate.bind({});

export const WithMixedValues = LegacyMultiSelectTemplate.bind({});

WithMixedValues.args = {
    type: LegacyMultiSelectType.Summarized,
    summarizedLabel: 'Mixed values',
    indeterminateItemKeys: ['This is a long tag'],
};

export const WithRightAlignedContainer = LegacyMultiSelectRightAlignedContainerTemplate.bind({});

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

export const WithWeakTriggerEmphasis = LegacyMultiSelectTemplate.bind({});

WithWeakTriggerEmphasis.args = {
    activeItemKeys: [],
    placeholder: 'Weak emphasis placeholder text',
    emphasis: TriggerEmphasis.Weak,
};
