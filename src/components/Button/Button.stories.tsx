/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Button, ButtonProps } from './Button';
import { IconAnchor16, IconColorFan16, IconDotsVertical16, IconEnum, IconIcon16 } from '@foundation/Icon';
import { ButtonEmphasis, ButtonRounding, ButtonSize, ButtonStyle, ButtonType } from './ButtonTypes';

const defaultArgs = {
    type: ButtonType.Button,
    style: ButtonStyle.Default,
    size: ButtonSize.Medium,
    rounding: ButtonRounding.Medium,
    hideLabel: false,
    disabled: false,
    hugWidth: true,
    children: 'Button Text',
};

export default {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: Object.values(ButtonSize),
            control: { type: 'radio' },
        },
        style: {
            options: Object.values(ButtonStyle),
            control: { type: 'radio' },
        },
        emphasis: {
            options: Object.values(ButtonEmphasis),
            control: { type: 'radio' },
        },
        icon: {
            options: [IconEnum.Icon, IconEnum.DotsVertical, IconEnum.ColorFan, IconEnum.Anchor],
            mapping: {
                [IconEnum.Icon]: <IconIcon16 />,
                [IconEnum.DotsVertical]: <IconDotsVertical16 />,
                [IconEnum.ColorFan]: <IconColorFan16 />,
                [IconEnum.Anchor]: <IconAnchor16 />,
            },
            control: { type: 'select' },
        },
        rounding: {
            options: Object.values(ButtonRounding),
            control: { type: 'radio' },
        },
        type: {
            options: Object.values(ButtonType),
            control: { type: 'radio' },
        },
        onClick: { action: 'onClick' },
    },
} as Meta;

const ButtonTemplate: StoryFn<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

export const Default = ButtonTemplate.bind({});
Default.args = { ...defaultArgs };
Default.storyName = 'Text Label Only';

export const WithIcon = ButtonTemplate.bind({});
WithIcon.args = { ...defaultArgs, hideLabel: true, icon: <IconIcon16 /> };
WithIcon.storyName = 'Icon Only';

export const WithRoundedIcon = ButtonTemplate.bind({});
WithRoundedIcon.args = {
    ...defaultArgs,
    rounding: ButtonRounding.Full,
    icon: <IconIcon16 />,
    hideLabel: true,
};
WithRoundedIcon.storyName = 'Icon Only rounded';

export const WithIconAndLabel = ButtonTemplate.bind({});
WithIconAndLabel.args = {
    ...defaultArgs,
    icon: <IconColorFan16 />,
};
WithIconAndLabel.storyName = 'Icon and Text Label';
