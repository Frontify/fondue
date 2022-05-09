/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps, ButtonRounding, ButtonSize, ButtonStyle, ButtonType } from "./Button";
import { IconIcons, IconActions } from "@foundation/Icon/Generated";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Button",
    component: Button,
    args: {
        inverted: false,
        hugWidth: true,
    },
    argTypes: {
        size: {
            options: [ButtonSize.Small, ButtonSize.Medium, ButtonSize.Large],
            control: { type: "radio" },
        },
        style: {
            options: [ButtonStyle.Primary, ButtonStyle.Secondary, ButtonStyle.Danger, ButtonStyle.Positive],
            control: { type: "select" },
        },
        rounding: {
            options: [ButtonRounding.Medium, ButtonRounding.Full],
            control: { type: "select" },
        },
        type: {
            options: [ButtonType.Button, ButtonType.Submit, ButtonType.Reset],
            control: { type: "select" },
        },
        onClick: { action: "onClick" },
    },
} as Meta<ButtonProps>;

const ButtonTemplate: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

export const Default = ButtonTemplate.bind({});
Default.args = {
    children: "Button Text",
    disabled: false,
    size: ButtonSize.Medium,
    solid: true,
    style: ButtonStyle.Primary,
    type: ButtonType.Button,
};
Default.storyName = "Text Label Only";

export const withIcon = ButtonTemplate.bind({});
withIcon.args = {
    disabled: false,
    icon: <IconIcons />,
    size: ButtonSize.Medium,
    solid: true,
    style: ButtonStyle.Primary,
    type: ButtonType.Button,
};
withIcon.storyName = "Icon Only";

export const withRoundedIcon = ButtonTemplate.bind({});
withRoundedIcon.args = {
    disabled: false,
    icon: <IconActions />,
    size: ButtonSize.Medium,
    rounding: ButtonRounding.Full,
    solid: true,
    style: ButtonStyle.Secondary,
    type: ButtonType.Button,
};
withRoundedIcon.storyName = "Icon Only rounded";

export const withIconAndLabel = ButtonTemplate.bind({});
withIconAndLabel.args = {
    children: "Button Text",
    disabled: false,
    icon: <IconIcons />,
    size: ButtonSize.Medium,
    solid: true,
    style: ButtonStyle.Primary,
    type: ButtonType.Button,
};
withIconAndLabel.storyName = "Icon and Text Label";
