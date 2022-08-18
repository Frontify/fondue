/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from './Button';
import { IconEnum, iconsMap } from '@foundation/Icon';
import { ButtonEmphasis, ButtonRounding, ButtonSize, ButtonStyle, ButtonType, Solid } from './ButtonTypes';
import { ButtonPreset } from '@components/Button/ButtonPreset';

const defaultArgs = {
    type: ButtonType.Button,
    style: ButtonStyle.Default,
    size: ButtonSize.Medium,
    rounding: ButtonRounding.Medium,
    solid: Solid.filled,
    hideLabel: false,
    disabled: false,
    hugWidth: true,
    children: 'Button Text',
};

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        size: {
            options: Object.values(ButtonSize),
            control: { type: 'radio' },
        },
        style: {
            options: Object.values(ButtonStyle),
            control: { type: 'radio' },
        },
        solid: {
            options: Object.values(Solid),
            control: { type: 'radio' },
        },
        emphasis: {
            options: Object.values(ButtonEmphasis),
            control: { type: 'radio' },
        },
        icon: {
            options: [IconEnum.Icon, IconEnum.DotsVertical, IconEnum.ColorFan, IconEnum.Settings],
            mapping: {
                [IconEnum.Icon]: iconsMap[IconEnum.Icon],
                [IconEnum.DotsVertical]: iconsMap[IconEnum.DotsVertical],
                [IconEnum.ColorFan]: iconsMap[IconEnum.ColorFan],
                [IconEnum.Settings]: iconsMap[IconEnum.Settings],
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

const ButtonTemplate: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

export const Default = ButtonTemplate.bind({});
Default.args = { ...defaultArgs };
Default.storyName = 'Text Label Only';

export const WithIcon = ButtonTemplate.bind({});
WithIcon.args = { ...defaultArgs, hideLabel: true, icon: iconsMap[IconEnum.Icon] };
WithIcon.storyName = 'Icon Only';

export const WithRoundedIcon = ButtonTemplate.bind({});
WithRoundedIcon.args = {
    ...defaultArgs,
    rounding: ButtonRounding.Full,
    icon: iconsMap[IconEnum.Icon],
    hideLabel: true,
};
WithRoundedIcon.storyName = 'Icon Only rounded';

export const WithIconAndLabel = ButtonTemplate.bind({});
WithIconAndLabel.args = {
    ...defaultArgs,
    icon: iconsMap[IconEnum.ColorFan],
};
WithIconAndLabel.storyName = 'Icon and Text Label';

export const ButtonPresetPrimary = ButtonTemplate.bind({});
ButtonPresetPrimary.args = {
    children: 'Primary Button',
    icon: iconsMap[IconEnum.ColorFan],
    ...ButtonPreset.primary,
};

export const ButtonPresetSecondary = ButtonTemplate.bind({});
ButtonPresetSecondary.args = {
    children: 'Secondary Button',
    icon: iconsMap[IconEnum.ColorFan],
    ...ButtonPreset.secondary,
};
