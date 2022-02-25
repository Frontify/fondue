/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps, ButtonRounding, ButtonSize, ButtonStyle, ButtonType } from "./Button";
import { ButtonEmphasis } from ".";
import { IconEnum, iconsMap } from "@foundation/Icon";

// eslint-disable-next-line import/no-default-export
const defaultArgs = {
    children: "Button Text",
    size: ButtonSize.Medium,
    style: ButtonStyle.Default,
    icon: iconsMap[IconEnum.Icons],
    emphasis: ButtonEmphasis.Default,
    disabled: false,
    hideLabel: false,
    hugWidth: true,
    rounding: ButtonRounding.Medium,
    inverted: false,
    type: ButtonType.Button,
};

export default {
    title: "Components/Button",
    component: Button,
    argTypes: {
        size: {
            options: [ButtonSize.Small, ButtonSize.Medium, ButtonSize.Large],
            control: { type: "radio" },
        },
        style: {
            options: [
                ButtonStyle.Default,
                ButtonStyle.Positive,
                ButtonStyle.Negative,
                ButtonStyle.Danger,
                ButtonStyle.Primary,
                ButtonStyle.Secondary,
            ],
            control: { type: "radio" },
        },
        icon: {
            options: [IconEnum.Icons, IconEnum.DotsVertical],
            mapping: {
                [IconEnum.Icons]: iconsMap[IconEnum.Icons],
                [IconEnum.Icons]: iconsMap[IconEnum.DotsVertical],
            },
            control: { type: "radio" },
        },
        emphasis: {
            options: [ButtonEmphasis.Default, ButtonEmphasis.Weak, ButtonEmphasis.Strong],
            control: { type: "radio" },
        },
        rounding: {
            options: [ButtonRounding.Medium, ButtonRounding.Full],
            control: { type: "radio" },
        },
        type: {
            options: [ButtonType.Button, ButtonType.Submit, ButtonType.Reset],
            control: { type: "radio" },
        },
        onClick: { action: "onClick" },
    },
} as Meta;

const ButtonTemplate: Story<ButtonProps> = (args: ButtonProps) => (
    <div className={args.inverted ? "tw-bg-box-neutral-strong" : ""}>
        <Button {...args} />
    </div>
);

export const Default = ButtonTemplate.bind({});
Default.args = {
    children: "Button Text",
    size: ButtonSize.Medium,
    style: ButtonStyle.Default,
    icon: iconsMap[IconEnum.Icons],
    emphasis: ButtonEmphasis.Default,
    disabled: false,
    hideLabel: false,
    hugWidth: true,
    rounding: ButtonRounding.Medium,
    inverted: false,
    type: ButtonType.Button,
};
Default.storyName = "Text Label Only";

export const withIcon = ButtonTemplate.bind({});
withIcon.args = { ...defaultArgs, hideLabel: true, icon: iconsMap[IconEnum.Icons] };
withIcon.storyName = "Icon Only";

export const withRoundedIcon = ButtonTemplate.bind({});
withRoundedIcon.args = {
    ...defaultArgs,
    rounding: ButtonRounding.Full,
    icon: iconsMap[IconEnum.Icons],
    hideLabel: true,
};
withRoundedIcon.storyName = "Icon Only rounded";

export const withIconAndLabel = ButtonTemplate.bind({});
withIconAndLabel.args = {
    ...defaultArgs,
    rounding: ButtonRounding.Full,
    icon: iconsMap[IconEnum.Icons],
    hideLabel: true,
};
withIconAndLabel.storyName = "Icon and Text Label";
