/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps, ButtonSize, ButtonStyle } from "./Button";
import IconIcons from "@elements/Icon/Generated/IconIcons";

export default {
    title: "Elements/Button",
    component: Button,
    argTypes: {
        size: {
            options: [ButtonSize.Small, ButtonSize.Medium, ButtonSize.Large],
            control: { type: "radio" },
        },
        style: {
            options: [ButtonStyle.Primary, ButtonStyle.Secondary, ButtonStyle.Danger, ButtonStyle.Positive],
            control: { type: "select" },
        },
        inverted: {
            options: [false, true],
            defaultValue: false,
            control: { type: "boolean" },
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
};
Default.storyName = "Text Label Only";

export const withIcon = ButtonTemplate.bind({});
withIcon.args = {
    disabled: false,
    size: ButtonSize.Medium,
    style: ButtonStyle.Primary,
    solid: true,
    icon: <IconIcons />,
};
withIcon.storyName = "Icon Only";

export const withIconAndLabel = ButtonTemplate.bind({});
withIconAndLabel.args = {
    disabled: false,
    size: ButtonSize.Medium,
    style: ButtonStyle.Primary,
    solid: true,
    icon: <IconIcons />,
    children: "Button Text",
};
withIconAndLabel.storyName = "Icon and Text Label";
