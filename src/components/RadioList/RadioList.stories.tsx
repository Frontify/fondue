/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { RadioButton, RadioButtonEmphasis } from './RadioButton';
import { RadioList, RadioListDirection, RadioListProps } from './RadioList';

export default {
    title: 'Components/RadioList',
    component: RadioList,
    tags: ['autodocs'],
    argTypes: {
        direction: {
            options: [RadioListDirection.Horizontal, RadioListDirection.Vertical],
            control: { type: 'radio' },
        },
        defaultValue: {
            options: ['Rib Eye', 'T-Bone', 'NY Strip'],
            control: { type: 'select' },
            defaultValue: 'Rib Eye',
        },
        onChange: action('change'),
    },
} as Meta<RadioListProps>;

const DefaultTemplate: StoryFn<RadioListProps> = (args: RadioListProps) => {
    return (
        <RadioList direction={args.direction} defaultValue="Rib Eye">
            <RadioButton value="Rib Eye" />
            <RadioButton value="T-Bone" />
            <RadioButton value="NY Strip" />
        </RadioList>
    );
};

export const Default = DefaultTemplate.bind({});

const WeakEmphasisRadioButtons: StoryFn<RadioListProps> = (args: RadioListProps) => {
    return (
        <RadioList direction={args.direction} defaultValue="Rib Eye">
            <RadioButton value="Rib Eye" emphasis={RadioButtonEmphasis.Weak} />
            <RadioButton value="T-Bone" emphasis={RadioButtonEmphasis.Weak} />
            <RadioButton value="NY Strip" />
        </RadioList>
    );
};
export const WithWeakEmphasisRadioButtons = WeakEmphasisRadioButtons.bind({});
WithWeakEmphasisRadioButtons.storyName = 'Weak emphasis radio buttons';

const DisabledRadioButton: StoryFn<RadioListProps> = (args: RadioListProps) => {
    return (
        <RadioList direction={args.direction} defaultValue="T-Bone">
            <RadioButton value="Rib Eye" disabled />
            <RadioButton value="T-Bone" />
            <RadioButton value="NY Strip" />
        </RadioList>
    );
};
export const WithDisabledRadioButton = DisabledRadioButton.bind({});
WithDisabledRadioButton.storyName = 'Disabled radio button';

const HelperTextRadioButton: StoryFn<RadioListProps> = (args: RadioListProps) => {
    return (
        <RadioList direction={args.direction} defaultValue="Rib Eye">
            <RadioButton value="Rib Eye" helperText="Best steak ever" />
            <RadioButton value="T-Bone" />
            <RadioButton value="NY Strip" />
        </RadioList>
    );
};
export const WithHelperTextRadioButton = HelperTextRadioButton.bind({});
WithHelperTextRadioButton.storyName = 'With helper text';
