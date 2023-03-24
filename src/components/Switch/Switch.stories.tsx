/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React, { MouseEvent, useEffect, useState } from 'react';
import { IconExclamationMarkCircle } from '@foundation/Icon/Generated';
import { Switch, SwitchMode, SwitchProps } from './Switch';
import { TooltipIconTriggerStyle } from '@components/TooltipIcon';

const SwitchModeTypes = ['On', 'Off', 'Indeterminate'];
const SwitchLabelStyleTypes = ['Default', 'Heading'];
const SwitchSizeTypes = ['Small', 'Medium'];

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
            control: { type: 'radio' },
        },
        onChange: {
            table: { disable: false },
            action: 'Change',
        },
    },
    args: {
        mode: 'On',
        disabled: false,
        labelStyle: 'Default',
        hug: false,
        name: 'switch-name',
        size: 'Small',
    },
} as Meta<SwitchProps>;

type Props = SwitchProps & { hug?: boolean };

const Default: StoryFn<Props> = (args: Props) => {
    const [mode, setMode] = useState<SwitchMode>(args.mode || 'Off');
    useEffect(() => {
        if (args.mode !== 'On' && args.mode !== 'Off' && args.mode !== 'Indeterminate') {
            return;
        }

        setMode(args.mode);
    }, [args.mode]);

    const toggle = (event: MouseEvent) => {
        setMode(mode === 'On' ? 'Off' : 'On');
        args.onChange && args.onChange(event);
    };

    return <Switch {...args} onChange={toggle} mode={mode} />;
};

export const Small: StoryFn<Props> = Default.bind({});
Small.args = { size: 'Small' };

export const Medium: StoryFn<Props> = Default.bind({});
Medium.args = { size: 'Medium' };

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
