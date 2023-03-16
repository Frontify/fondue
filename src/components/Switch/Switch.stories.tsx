/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { IconExclamationMarkCircle } from '@foundation/Icon/Generated';
import { Switch, SwitchProps, SwitchSize, SwitchState } from './Switch';
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
        label: {
            placeholder: 'Switch label',
            type: { name: 'string', required: false },
            control: {
                type: 'text',
            },
        },
        on: {
            options: Object.values(SwitchState),
            control: { type: 'radio' },
        },
    },
    args: {
        on: SwitchState.On,
        disabled: false,
        hug: false,
        name: 'switch-name',
        size: SwitchSize.Small,
    },
} as Meta<SwitchProps>;

type Props = SwitchProps & { hug?: boolean };

const Default: StoryFn<Props> = (args: Props) => {
    const [on, setOn] = useState<SwitchState>(args.on || SwitchState.Off);
    useEffect(() => {
        if (args.on !== SwitchState.On && args.on !== SwitchState.Off && args.on !== SwitchState.Mixed) {
            return;
        }
        if (args.on === on) {
            return;
        }
        setOn(args.on);
    }, [args.on]);

    const toggle = () => {
        setOn(on === SwitchState.On ? SwitchState.Off : SwitchState.On);
    };

    return <Switch {...args} onChange={toggle} on={args.on} />;
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
