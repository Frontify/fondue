/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactComponent as IconCaretLeft } from "@elements/Icon/Svg/CaretLeft.svg";
import { Meta, Story } from "@storybook/react";
import { Size } from "@utilities/enum";
import Button, { ButtonProps, Style } from "./Button";

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
    size: Size.Small,
    solid: true,
    style: Style.Secondary,
};

export const withIcon = ButtonTemplate.bind({});
withIcon.args = {
    disabled: false,
    size: Size.Small,
    style: Style.Primary,
    children: (
        <>
            <IconCaretLeft />
            Ok
        </>
    ),
};
