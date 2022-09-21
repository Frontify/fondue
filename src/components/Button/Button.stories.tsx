/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, ButtonProps } from './Button';
import { IconEnum, iconsMap } from '@foundation/Icon';
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
                [IconEnum.Icon]: iconsMap[IconEnum.Icon],
                [IconEnum.DotsVertical]: iconsMap[IconEnum.DotsVertical],
                [IconEnum.ColorFan]: iconsMap[IconEnum.ColorFan],
                [IconEnum.Anchor]: iconsMap[IconEnum.Anchor],
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
const ButtonTemplateInverted: Story<ButtonProps> = (args: ButtonProps) => (
    <div className={'tw-dark'}>
        <Button {...args} />
    </div>
);

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
    style: ButtonStyle.Default,
    emphasis: ButtonEmphasis.Strong,
};

export const ButtonPresetSecondary = ButtonTemplate.bind({});
ButtonPresetSecondary.args = {
    children: 'Secondary Button',
    icon: iconsMap[IconEnum.ColorFan],
    style: ButtonStyle.Default,
    emphasis: ButtonEmphasis.Default,
};
export const ButtonPresetDanger = ButtonTemplate.bind({});
ButtonPresetDanger.args = {
    children: 'Secondary Button',
    icon: iconsMap[IconEnum.ColorFan],
    style: ButtonStyle.Danger,
    emphasis: ButtonEmphasis.Strong,
};

export const ButtonWithoutAnyDefaults = ButtonTemplate.bind({});
ButtonWithoutAnyDefaults.args = {
    children: 'Out of the Box Button',
    icon: iconsMap[IconEnum.ColorFan],
    type: ButtonType.Submit,
};

export const ButtonStylePrimary = ButtonTemplate.bind({});
ButtonStylePrimary.args = {
    children: 'Primary Button',
    icon: iconsMap[IconEnum.ColorFan],
    style: ButtonStyle.Primary,
};

export const ButtonStyleSecondary = ButtonTemplate.bind({});
ButtonStyleSecondary.args = {
    children: 'Secondary Button',
    icon: iconsMap[IconEnum.ColorFan],
    style: ButtonStyle.Secondary,
};

export const ButtonStyleInverted = ButtonTemplateInverted.bind({});
ButtonStyleInverted.args = {
    children: 'Primary Button',
    icon: iconsMap[IconEnum.ColorFan],
    style: ButtonStyle.Default,
    emphasis: ButtonEmphasis.Strong,
};
