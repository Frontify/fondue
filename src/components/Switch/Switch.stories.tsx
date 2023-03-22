/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { MouseEvent, useEffect, useState } from 'react';
import { IconExclamationMarkCircle } from '@foundation/Icon/Generated';
import { Switch, SwitchLabelStyle, SwitchProps, SwitchSize, SwitchMode } from './Switch';
import { TooltipIconTriggerStyle } from '@components/TooltipIcon';

export default {
    title: 'Components/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: Object.values(SwitchSize),
            control: { type: 'radio' },
        },
        labelStyle: {
            options: Object.values(SwitchLabelStyle),
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
            options: Object.values(SwitchMode),
            control: { type: 'radio' },
        },
        onChange: {
            table: { disable: false },
            action: 'Change',
        },
    },
    args: {
        mode: SwitchMode.On,
        disabled: false,
        labelStyle: SwitchLabelStyle.Default,
        hug: false,
        name: 'switch-name',
        size: SwitchSize.Small,
    },
} as Meta<SwitchProps>;

type Props = SwitchProps & { hug?: boolean };

const Default: StoryFn<Props> = (args: Props) => {
    const [mode, setMode] = useState<SwitchMode>(args.mode || SwitchMode.Off);
    useEffect(() => {
        if (args.mode !== SwitchMode.On && args.mode !== SwitchMode.Off && args.mode !== SwitchMode.Indeterminate) {
            return;
        }
        if (args.mode === mode) {
            return;
        }
        setMode(args.mode);
    }, [args.mode]);

    const toggle = (event: MouseEvent) => {
        setMode(mode === SwitchMode.On ? SwitchMode.Off : SwitchMode.On);
        args.onChange && args.onChange(event);
    };

    return <Switch {...args} onChange={toggle} mode={mode} />;
};

export const Small: StoryFn<Props> = Default.bind({});
Small.args = { size: SwitchSize.Small };

export const Medium: StoryFn<Props> = Default.bind({});
Medium.args = { size: SwitchSize.Medium };

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
