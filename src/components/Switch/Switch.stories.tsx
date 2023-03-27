/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { MouseEvent } from 'react';
import { useArgs } from '@storybook/preview-api';
import { IconExclamationMarkCircle } from '@foundation/Icon/Generated';
import { Switch, SwitchLabelStyle, SwitchMode, SwitchProps, SwitchSize } from './Switch';
import { TooltipIconTriggerStyle } from '@components/TooltipIcon';

const SwitchSizeTypes: SwitchSize[] = ['small', 'medium'];

const SwitchModeTypes: SwitchMode[] = ['on', 'off', 'indeterminate'];

const SwitchLabelStyleTypes: SwitchLabelStyle[] = ['default', 'heading'];

export default {
    title: 'Components/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: SwitchSizeTypes,
            control: { type: 'radio' },
        },
        labelStyle: {
            options: SwitchLabelStyleTypes,
            control: { type: 'radio' },
        },
        label: {
            placeholder: 'Switch label',
            type: { name: 'string', required: false },
            control: {
                type: 'text',
            },
        },
        mode: {
            options: SwitchModeTypes,
            control: { type: 'radio', default: 'off' },
        },
        onChange: {
            table: { disable: false },
            action: 'Change',
        },
    },
    args: {
        mode: 'on',
        disabled: false,
        labelStyle: 'default',
        hug: false,
        name: 'switch-name',
        size: 'small',
    },
} as Meta<SwitchProps>;

type Props = SwitchProps & { hug?: boolean };

const Default: StoryFn<Props> = (args: Props) => {
    const [{ mode }, updateArgs] = useArgs();

    const toggle = (event: MouseEvent) => {
        updateArgs({ mode: mode === 'on' ? 'off' : 'on' });
        args.onChange && args.onChange(event);
    };

    return <Switch {...args} onChange={toggle} />;
};

export const Small: StoryFn<Props> = Default.bind({});
Small.args = { size: 'small' };

export const Medium: StoryFn<Props> = Default.bind({});
Medium.args = { size: 'medium' };

export const WithLabel: StoryFn<Props> = Default.bind({});
WithLabel.args = { label: 'Switch label' };

export const WithLabelAndTooltip: StoryFn<Props> = Default.bind({});
WithLabelAndTooltip.args = { label: 'Switch label', tooltip: { content: 'Switch tooltip' } };

export const WithLabelAndMultipleTooltips: StoryFn<Props> = Default.bind({});
WithLabelAndMultipleTooltips.args = {
    label: 'Switch label',
    tooltip: [
        { content: 'First tooltip' },
        {
            content: 'Second Tooltip',
            triggerIcon: <IconExclamationMarkCircle />,
            triggerStyle: TooltipIconTriggerStyle.Warning,
        },
    ],
};

export const HugLabel: StoryFn<Props> = Default.bind({});
HugLabel.args = { hug: true, label: 'Switch label' };
