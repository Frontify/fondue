/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactComponent as Icons } from "@elements/Icon/Svg/Icons.svg";
import { Meta, Story } from "@storybook/react";
import Button, { ButtonProps, Size, Style } from "./Button";

export default {
    title: "Elements/Button",
    component: Button,
    argTypes: {
        size: {
            options: [Size.Small, Size.Medium, Size.Large],
            control: { type: "radio" },
        },
        style: {
            options: [Style.Primary, Style.Secondary, Style.Danger, Style.Positive],
            control: { type: "select" },
        },
        onClick: { action: "onClick" },
    },
} as Meta<ButtonProps>;

const ButtonTemplate: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = ButtonTemplate.bind({});
Default.args = {
    children: "Button Text",
    disabled: false,
    size: Size.Medium,
    solid: true,
    style: Style.Primary,
};

Default.storyName = "Text Label Only";

export const withIcon = ButtonTemplate.bind({});

withIcon.args = {
    disabled: false,
    size: Size.Medium,
    style: Style.Primary,
    icon: <Icons />,
};

withIcon.storyName = "Icon Only";

export const withIconAndLabel = ButtonTemplate.bind({});

withIconAndLabel.args = {
    disabled: false,
    size: Size.Medium,
    style: Style.Primary,
    icon: <Icons />,
    children: "Button Text",
};

withIconAndLabel.storyName = "Icon and Text Label";
