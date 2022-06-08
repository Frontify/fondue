/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from '@storybook/react';
import React from 'react';
import { IconExclamationMarkCircle, IconInfo, IconQuestionMarkCircle } from '@foundation/Icon/Generated';
import { InputLabel as InputLabelComponent, InputLabelProps } from './InputLabel';
import { TooltipIconTriggerStyle } from '@components/TooltipIcon';
import { IconSize } from '@foundation/Icon';

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

export const InputLabel: Story<InputLabelProps> = (args: InputLabelProps) => <InputLabelComponent {...args} />;

export const InputLabelWithMultipleTooltips = InputLabel.bind({});

InputLabelWithMultipleTooltips.args = {
    ...InputLabel.args,
    tooltip: [
        {
            triggerIcon: <IconInfo size={IconSize.Size16} />,
            triggerStyle: TooltipIconTriggerStyle.Danger,
            content: 'Tooltip 1',
        },
        {
            triggerIcon: <IconQuestionMarkCircle size={IconSize.Size16} />,
            triggerStyle: TooltipIconTriggerStyle.Primary,
            content: 'Tooltip 2',
        },
        {
            triggerIcon: <IconExclamationMarkCircle size={IconSize.Size16} filled />,
            triggerStyle: TooltipIconTriggerStyle.Warning,
            content: 'Tooltip 3',
        },
    ],
};
