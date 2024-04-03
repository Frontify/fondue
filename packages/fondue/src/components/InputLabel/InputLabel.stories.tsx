/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import { TooltipIconTriggerStyle } from '@components/TooltipIcon';
import IconExclamationMarkCircle from '@foundation/Icon/Generated/IconExclamationMarkCircle';
import IconInfo from '@foundation/Icon/Generated/IconInfo';
import IconQuestionMarkCircle from '@foundation/Icon/Generated/IconQuestionMarkCircle';

import { InputLabel as InputLabelComponent, type InputLabelProps } from './InputLabel';

export default {
    title: 'Components/Input Label',
    component: InputLabelComponent,
    tags: ['autodocs'],
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
