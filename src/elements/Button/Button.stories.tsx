/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactComponent as IconCaretLeft } from "@elements/Icon/Svg/CaretLeft.svg";
import { Meta, Story } from "@storybook/react";
import { Size, Style, Theme } from "@utilities/enum";
import Button, { ButtonProps } from "./Button";

export default {
    title: "Elements/Button",
    component: Button,
    args: {
        disabled: false,
        size: Size.Small,
        style: Style.Primary,
        theme: Theme.Light,
    },
    argTypes: {
        size: {
            options: [Size.Small, Size.Large],
            control: { type: "radio" },
        },
        style: {
            options: Object.keys(Style),
            control: { type: "radio" },
        },
        theme: {
            options: Object.keys(Theme),
            control: { type: "radio" },
        },
        onClick: { action: "onClick" },
    },
} as Meta;

const ButtonTemplate: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = ButtonTemplate.bind({});
Default.args = {
    children: "Button",
};

export const withIcon = ButtonTemplate.bind({});
withIcon.args = {
    children: (
        <>
            <IconCaretLeft />
            Ok
        </>
    ),
};
