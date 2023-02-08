/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { IconExclamationMarkCircle, IconInfo, IconQuestionMarkCircle } from '@foundation/Icon/Generated';
import {
    Checkbox as CheckboxComponent,
    CheckboxEmphasis,
    CheckboxProps,
    CheckboxSize,
    CheckboxState,
} from './Checkbox';
import { TooltipIconTriggerStyle } from '@components/TooltipIcon';

export default {
    title: 'Components/Checkbox',
    tags: ['autodocs'],
    argTypes: {
        state: {
            options: Object.values(CheckboxState),
            control: { type: 'radio' },
        },
        emphasis: {
            options: Object.values(CheckboxEmphasis),
            control: { type: 'radio' },
        },
        size: {
            options: Object.values(CheckboxSize),
            control: { type: 'radio' },
        },
        onChange: {
            table: { disable: false },
            action: 'Change',
        },
    },
    args: {
        state: CheckboxState.Unchecked,
        disabled: false,
        required: false,
        emphasis: 'Default',
        size: 'Default',
        value: "whatever-you'd-like",
        label: 'Checkbox label',
        hideLabel: false,
        'aria-label': 'Custom aria label',
        helperText: 'Note about this input',
        tooltip: {
            content: 'Lorem ipsum dolor sit amet.',
        },
    },
} as Meta<CheckboxProps>;

export const Checkbox: StoryFn<CheckboxProps> = (args: CheckboxProps) => {
    const [checked, setChecked] = useState<CheckboxState>(args.state || CheckboxState.Unchecked);
    useEffect(() => setChecked(args.state || CheckboxState.Unchecked), [args.state]);

    return (
        <CheckboxComponent
            {...args}
            state={checked}
            onChange={(isChecked) => {
                setChecked(isChecked ? CheckboxState.Checked : CheckboxState.Unchecked);
                args.onChange && args.onChange(isChecked);
            }}
        />
    );
};

export const CheckboxWithMultipleTooltips = Checkbox.bind({});

CheckboxWithMultipleTooltips.args = {
    ...Checkbox.args,
    tooltip: [
        { triggerIcon: <IconInfo />, triggerStyle: TooltipIconTriggerStyle.Danger, content: 'Tooltip 1' },
        {
            triggerIcon: <IconQuestionMarkCircle />,
            triggerStyle: TooltipIconTriggerStyle.Primary,
            content: 'Tooltip 2',
        },
        {
            triggerIcon: <IconExclamationMarkCircle filled />,
            triggerStyle: TooltipIconTriggerStyle.Warning,
            content: 'Tooltip 3',
        },
    ],
};
