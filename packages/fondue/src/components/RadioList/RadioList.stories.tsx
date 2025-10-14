/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from 'storybook/actions';
import { type Meta, type StoryFn } from '@storybook/react-vite';

import { RadioButton, RadioButtonEmphasis } from './RadioButton';
import { RadioList, RadioListDirection, type RadioListProps } from './RadioList';

export default {
    title: 'Components/RadioList',
    component: RadioList,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
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
        ariaLabel: {
            control: { type: 'text' },
        },
        name: {
            control: { type: 'text' },
        },
        onChange: action('change'),
    },
} as Meta<RadioListProps>;

const DefaultTemplate: StoryFn<RadioListProps> = (args: RadioListProps) => {
    return (
        <RadioList name={args.name} direction={args.direction} defaultValue={args.defaultValue}>
            <RadioButton value="Rib Eye" />
            <RadioButton value="T-Bone" />
            <RadioButton value="NY Strip" />
        </RadioList>
    );
};

export const Default = DefaultTemplate.bind({});

const WeakEmphasisRadioButtons: StoryFn<RadioListProps> = (args: RadioListProps) => {
    return (
        <RadioList name="radio-list-1" direction={args.direction} defaultValue="Rib Eye">
            <RadioButton value="Rib Eye" emphasis={RadioButtonEmphasis.Weak} />
            <RadioButton value="T-Bone" emphasis={RadioButtonEmphasis.Weak} />
            <RadioButton value="NY Strip" emphasis={RadioButtonEmphasis.Weak} />
        </RadioList>
    );
};
export const WithWeakEmphasisRadioButtons = WeakEmphasisRadioButtons.bind({});
WithWeakEmphasisRadioButtons.storyName = 'Weak emphasis radio buttons';

const DisabledRadioButton: StoryFn<RadioListProps> = (args: RadioListProps) => {
    return (
        <RadioList name="radio-list-2" direction={args.direction} defaultValue="T-Bone">
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
        <RadioList name="radio-list-3" direction={args.direction} defaultValue="Rib Eye">
            <RadioButton value="Rib Eye" helperText="Best steak ever" />
            <RadioButton value="T-Bone" />
            <RadioButton value="NY Strip" />
        </RadioList>
    );
};
export const WithHelperTextRadioButton = HelperTextRadioButton.bind({});
WithHelperTextRadioButton.storyName = 'With helper text';

const TooltipRadioButton: StoryFn<RadioListProps> = (args: RadioListProps) => {
    return (
        <RadioList name="radio-list-4" direction={args.direction} defaultValue="Rib Eye">
            <RadioButton value="Rib Eye" tooltip="Might choose this one" />
            <RadioButton value="T-Bone" tooltip="Or this one" />
            <RadioButton value="NY Strip" tooltip="Or maybe this one" />
        </RadioList>
    );
};
export const WithTooltipRadioButton = TooltipRadioButton.bind({});
WithTooltipRadioButton.storyName = 'With tooltips';
