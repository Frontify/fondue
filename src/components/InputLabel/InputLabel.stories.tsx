/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { IconExclamationMarkCircle, IconInfo, IconQuestionMarkCircle } from '@foundation/Icon/Generated';
import { InputLabel as InputLabelComponent, InputLabelProps } from './InputLabel';
import { TooltipIconTriggerStyle } from '@components/TooltipIcon';

export default {
    title: 'Components/Input Label',
    component: InputLabelComponent,
    args: {
        children: 'Input Label',
        disabled: false,
        required: false,
        tooltip: {
            content: 'Lorem ipsum dolor sit amet.',
        },
    },
} as Meta;

export const InputLabel: StoryFn<InputLabelProps> = (args: InputLabelProps) => <InputLabelComponent {...args} />;

export const InputLabelWithMultipleTooltips = InputLabel.bind({});

InputLabelWithMultipleTooltips.args = {
    ...InputLabel.args,
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
